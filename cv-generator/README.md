# CV Generator 📄

A modern web application that allows users to generate professional CVs using LaTeX templates. Built with React (TypeScript) frontend and Node.js backend with real-time PDF preview and one-click downloads.

## Features ✨

- **Interactive Form Interface**: Comprehensive form that mirrors CV template structure
- **Real-time Preview**: Live PDF preview that updates as you type
- **One-Click Downloads**: Download both PDF and LaTeX (.tex) source files
- **Professional Templates**: Based on your optimized LaTeX CV template
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Docker Support**: Easy deployment with Docker and Docker Compose

## Tech Stack 🛠️

### Frontend
- **React 19** with TypeScript
- **Modern CSS** with responsive design
- **Axios** for API communication

### Backend
- **Node.js** with Express
- **LaTeX Processing** with pdflatex
- **File Management** with automatic cleanup
- **Rate Limiting** and security features

### Deployment
- **Docker** and Docker Compose
- **Health Checks** and auto-restart
- **Volume Management** for persistent data

## Quick Start 🚀

### Option 1: Automated Setup (Recommended)
```bash
# Clone or navigate to the project directory
cd cv-generator

# Run the setup script
./setup.sh

# Start development servers
npm run dev
```

### Option 2: Manual Setup
1. **Install dependencies**:
   ```bash
   npm install
   cd backend && npm install && cd ..
   cd frontend && npm install && cd ..
   ```

2. **Install LaTeX** (required for PDF generation):
   - **macOS**: `brew install --cask mactex-no-gui`
   - **Ubuntu/Debian**: `sudo apt-get install texlive-latex-base texlive-latex-extra texlive-fonts-recommended texlive-fonts-extra`

3. **Start development servers**:
   ```bash
   npm run dev
   ```

### Option 3: Docker (Production)
```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

## Usage 📋

1. **Open the application** at `http://localhost:3000` (development) or `http://localhost:5001` (Docker)

2. **Fill in your information**:
   - Personal Information (name, contact details, links)
   - Education (degrees, institutions, GPAs)
   - Experience & Projects (roles, descriptions, achievements)
   - Technical Skills (programming, tools, academic)
   - Research Interests and Languages

3. **Generate your CV**:
   - Click "Generate CV" to process your information
   - View the real-time preview on the right panel
   - Download PDF or LaTeX source files

4. **Customize as needed**:
   - Edit any field and regenerate
   - Add/remove education or experience entries
   - Modify skills categories

## API Endpoints 🔗

- `GET /api/health` - Health check
- `POST /api/generate-cv` - Generate CV from user data
- `GET /api/preview-pdf/:sessionId` - Preview generated PDF
- `GET /api/download-pdf/:sessionId` - Download PDF
- `GET /api/download-tex/:sessionId` - Download LaTeX source

## Project Structure 📁

```
cv-generator/
├── backend/
│   ├── server.js              # Main server file
│   ├── templates/             # LaTeX templates
│   ├── temp/                  # Temporary .tex files
│   ├── output/                # Generated PDFs
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Main React component
│   │   ├── types/CVTypes.ts  # TypeScript interfaces
│   │   └── App.css           # Styling
│   └── package.json
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker Compose setup
├── setup.sh                  # Automated setup script
└── README.md
```

## Development 👨‍💻

### Available Scripts
```bash
npm run dev          # Start both frontend and backend
npm run server       # Start only backend (port 5001)
npm run client       # Start only frontend (port 3000)
npm run build        # Build frontend for production
npm run install-deps # Install all dependencies
```

### Key Components

#### Frontend (React + TypeScript)
- **App.tsx**: Main application with form interface and state management
- **CVTypes.ts**: TypeScript interfaces for type safety
- **App.css**: Modern responsive styling

#### Backend (Node.js + Express)
- **CVTemplateProcessor**: Processes LaTeX templates with user data
- **PDF Generation**: Uses pdflatex to compile LaTeX to PDF
- **File Management**: Automatic cleanup of temporary files
- **Security**: Rate limiting and input validation

## Customization 🎨

### Adding New Template Sections
1. Update `CVTypes.ts` with new interface fields
2. Add form fields in `App.tsx`
3. Update the `CVTemplateProcessor` class in `server.js`
4. Modify the LaTeX template as needed

### Styling Changes
- Edit `App.css` for frontend styling
- Modify CSS variables for consistent theming
- Responsive breakpoints are already configured

### Template Modifications
- Edit `backend/templates/cv-template.tex`
- The processor will automatically replace placeholders with user data

## Deployment 🚀

### Docker Deployment
```bash
# Build and deploy
docker-compose up --build -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

### Manual Deployment
1. Build frontend: `cd frontend && npm run build`
2. Copy build files to backend static directory
3. Start backend: `cd backend && npm start`

## Requirements 📋

- **Node.js** 18+ 
- **LaTeX** distribution (TeX Live, MiKTeX, or MacTeX)
- **Docker** (optional, for containerized deployment)
- **Modern web browser** with JavaScript enabled

## Troubleshooting 🔧

### Common Issues

1. **"pdflatex not found"**
   - Install LaTeX: `brew install --cask mactex-no-gui` (macOS) or `sudo apt-get install texlive-latex-extra` (Linux)
   - Restart terminal and try again

2. **"Cannot connect to backend"**
   - Ensure backend is running on port 5001
   - Check if another process is using the port

3. **PDF generation fails**
   - Check LaTeX installation
   - Review backend logs for specific errors
   - Ensure all required LaTeX packages are installed

4. **Real-time preview not working**
   - Check browser console for errors
   - Ensure CORS is properly configured
   - Verify iframe content security policy

### Support
For issues or feature requests, check the console logs and ensure all dependencies are properly installed.

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License 📄

MIT License - feel free to use this project for personal or commercial purposes.

---

Built with ❤️ by Fahad Nadim Ziad
