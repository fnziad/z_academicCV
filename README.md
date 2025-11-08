# Academic CV - Fahad Nadim Ziad

This repository contains my academic CV in LaTeX format with automatic PDF compilation via GitHub Actions.

## 📄 Files

- `cv_latex/FahadNadimZiad_cv.tex` - Main CV source file
- `cv_latex/FahadNadimZiad_cv.pdf` - Compiled PDF (auto-updated)

## 🔄 Automatic Updates

Whenever you push changes to the `.tex` file, GitHub Actions will:
1. Automatically compile it to PDF
2. Commit the updated PDF back to the repository
3. Make it available for your portfolio website

## 🌐 Integration with Portfolio Website

### Option 1: Direct Link to GitHub (Recommended)
Add this link to your portfolio at https://ziaaad.vercel.app/:

```
https://github.com/fnziad/z_academicCV/raw/main/cv_latex/FahadNadimZiad_cv.pdf
```

This will always serve the latest version of your CV.

### Option 2: Fetch and Host on Vercel
In your portfolio repository, add a script to fetch the CV during build:

```javascript
// In your portfolio's build script or API route
const cvUrl = 'https://github.com/fnziad/z_academicCV/raw/main/cv_latex/FahadNadimZiad_cv.pdf';
```

### Option 3: GitHub Pages
Enable GitHub Pages for this repo and access via:
```
https://fnziad.github.io/z_academicCV/cv_latex/FahadNadimZiad_cv.pdf
```

## 📝 How to Update Your CV

1. Edit `cv_latex/FahadNadimZiad_cv.tex`
2. Commit and push:
   ```bash
   git add cv_latex/FahadNadimZiad_cv.tex
   git commit -m "Update CV: [describe changes]"
   git push
   ```
3. GitHub Actions will automatically compile and update the PDF
4. Your portfolio will show the latest version (may take 1-2 minutes)

## 🏗️ Local Compilation

If you want to compile locally:

```bash
cd cv_latex
/Library/TeX/texbin/pdflatex FahadNadimZiad_cv.tex
```

## 📅 Last Updated

The CV footer shows the last update date. Remember to update it when making changes.

---

**Portfolio Website:** https://ziaaad.vercel.app/  
**GitHub:** https://github.com/fnziad  
**LinkedIn:** https://www.linkedin.com/in/fahadnadimziad
