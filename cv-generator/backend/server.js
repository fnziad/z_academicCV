const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Ensure temp directories exist
const tempDir = path.join(__dirname, 'temp');
const outputDir = path.join(__dirname, 'output');
fs.ensureDirSync(tempDir);
fs.ensureDirSync(outputDir);

// CV Template processor
class CVTemplateProcessor {
  constructor(templatePath) {
    this.templatePath = templatePath;
    this.template = fs.readFileSync(templatePath, 'utf8');
  }

  processTemplate(userData) {
    let processedTemplate = this.template;
    
    // Replace basic information
    processedTemplate = processedTemplate.replace(
      /\\textbf{\\Large Fahad Nadim Ziad}/g,
      `\\textbf{\\Large ${userData.personalInfo.fullName}}`
    );
    
    processedTemplate = processedTemplate.replace(
      /Dhaka, Bangladesh/g,
      `${userData.personalInfo.location}`
    );
    
    processedTemplate = processedTemplate.replace(
      /\+8801676212004/g,
      userData.personalInfo.phone
    );
    
    processedTemplate = processedTemplate.replace(
      /f\.n\.ziad@gmail\.com/g,
      userData.personalInfo.email
    );
    
    processedTemplate = processedTemplate.replace(
      /linkedin\.com\/in\/fahadnadimziad/g,
      userData.personalInfo.linkedin
    );
    
    processedTemplate = processedTemplate.replace(
      /github\.com\/fnziad/g,
      userData.personalInfo.github
    );

    // Replace education section
    if (userData.education && userData.education.length > 0) {
      let educationSection = '';
      userData.education.forEach(edu => {
        educationSection += `\\textbf{${edu.institution}} \\hfill ${edu.location} \\\\\n`;
        educationSection += `\\textit{${edu.degree}} \\hfill \\textit{${edu.duration}} \\\\\n`;
        if (edu.gpa) educationSection += `${edu.gpa}\n`;
        educationSection += `\\vspace{6pt}\n\n`;
      });
      
      // Replace the education content between the section header and next section
      const eduRegex = /(\\section\*{Education}|\\textbf{Education})(.*?)(\\section\*{[^}]+}|\\vspace{12pt})/s;
      processedTemplate = processedTemplate.replace(eduRegex, `$1\n${educationSection}$3`);
    }

    // Replace experience/projects section
    if (userData.experience && userData.experience.length > 0) {
      let experienceSection = '';
      userData.experience.forEach(exp => {
        experienceSection += `\\textbf{${exp.title}} \\textbar{} \\textit{${exp.role}} \\hfill \\textit{${exp.duration}}\n`;
        experienceSection += `\\begin{project}\n`;
        exp.points.forEach(point => {
          experienceSection += `    \\item ${point}\n`;
        });
        experienceSection += `\\end{project}\n\\vspace{4pt}\n\n`;
      });
      
      // Replace research/projects section
      const expRegex = /(\\section\*{Research & Projects|Research \\& Development Experience})(.*?)(\\section\*{[^}]+})/s;
      processedTemplate = processedTemplate.replace(expRegex, `$1\n${experienceSection}$3`);
    }

    // Replace skills section
    if (userData.skills) {
      let skillsSection = '\\begin{itemize}\n';
      Object.keys(userData.skills).forEach(category => {
        if (userData.skills[category]) {
          skillsSection += `    \\item \\textbf{${category}:} ${userData.skills[category]}\n`;
        }
      });
      skillsSection += '\\end{itemize}';
      
      const skillsRegex = /(\\section\*{Technical Skills})(.*?)(\\section\*{[^}]+}|\\end{document})/s;
      processedTemplate = processedTemplate.replace(skillsRegex, `$1\n${skillsSection}\n\n$3`);
    }

    return processedTemplate;
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CV Generator API is running' });
});

app.post('/api/generate-cv', async (req, res) => {
  const sessionId = uuidv4();
  
  try {
    const userData = req.body;
    
    // Load template
    const templatePath = path.join(__dirname, 'templates', 'cv-template.tex');
    
    // Create template if it doesn't exist (using your cv.tex)
    if (!fs.existsSync(templatePath)) {
      fs.ensureDirSync(path.dirname(templatePath));
      // Copy your cv.tex as template
      const originalTemplate = path.join(__dirname, '../../cv.tex');
      if (fs.existsSync(originalTemplate)) {
        fs.copyFileSync(originalTemplate, templatePath);
      } else {
        return res.status(500).json({ error: 'CV template not found' });
      }
    }
    
    const processor = new CVTemplateProcessor(templatePath);
    const processedTex = processor.processTemplate(userData);
    
    // Save processed .tex file
    const texPath = path.join(tempDir, `cv-${sessionId}.tex`);
    fs.writeFileSync(texPath, processedTex);
    
    // Generate PDF using pdflatex
    const outputPath = path.join(outputDir, `cv-${sessionId}.pdf`);
    
    const pdflatex = spawn('pdflatex', [
      '-interaction=nonstopmode',
      '-output-directory=' + outputDir,
      '-jobname=' + `cv-${sessionId}`,
      texPath
    ]);

    let stderr = '';
    pdflatex.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    pdflatex.on('close', (code) => {
      if (code === 0 && fs.existsSync(outputPath)) {
        res.json({
          success: true,
          sessionId: sessionId,
          pdfUrl: `/api/download-pdf/${sessionId}`,
          texUrl: `/api/download-tex/${sessionId}`
        });
      } else {
        console.error('PDF generation failed:', stderr);
        res.status(500).json({ 
          error: 'PDF generation failed', 
          details: stderr,
          message: 'Make sure pdflatex is installed on your system'
        });
      }
    });

  } catch (error) {
    console.error('Error generating CV:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.get('/api/download-pdf/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  const pdfPath = path.join(outputDir, `cv-${sessionId}.pdf`);
  
  if (!fs.existsSync(pdfPath)) {
    return res.status(404).json({ error: 'PDF not found' });
  }
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="cv-${sessionId}.pdf"`);
  res.sendFile(pdfPath);
});

app.get('/api/download-tex/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  const texPath = path.join(tempDir, `cv-${sessionId}.tex`);
  
  if (!fs.existsSync(texPath)) {
    return res.status(404).json({ error: 'TeX file not found' });
  }
  
  res.setHeader('Content-Type', 'application/x-tex');
  res.setHeader('Content-Disposition', `attachment; filename="cv-${sessionId}.tex"`);
  res.sendFile(texPath);
});

app.get('/api/preview-pdf/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  const pdfPath = path.join(outputDir, `cv-${sessionId}.pdf`);
  
  if (!fs.existsSync(pdfPath)) {
    return res.status(404).json({ error: 'PDF not found' });
  }
  
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(pdfPath);
});

// Cleanup old files periodically
setInterval(() => {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  [tempDir, outputDir].forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (now - stats.mtime.getTime() > maxAge) {
          fs.removeSync(filePath);
          console.log(`Cleaned up old file: ${file}`);
        }
      });
    }
  });
}, 60 * 60 * 1000); // Run cleanup every hour

app.listen(PORT, () => {
  console.log(`CV Generator API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
