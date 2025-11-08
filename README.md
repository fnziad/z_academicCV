# Academic CV - Fahad Nadim Ziad

This repository contains my academic CV in LaTeX format.

## 📄 Files

- `cv_latex/FahadNadimZiad_cv.tex` - Main CV source file
- `cv_latex/FahadNadimZiad_cv.pdf` - Compiled PDF

## 🔄 How to Update

1. Edit `cv_latex/FahadNadimZiad_cv.tex`
2. Compile locally: `cd cv_latex && /Library/TeX/texbin/pdflatex FahadNadimZiad_cv.tex`
3. Commit both `.tex` and `.pdf` files
4. Push to GitHub - your portfolio will automatically serve the latest version

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
const cvUrl =
  "https://github.com/fnziad/z_academicCV/raw/main/cv_latex/FahadNadimZiad_cv.pdf";
```

### Option 3: GitHub Pages

Enable GitHub Pages for this repo and access via:

```
https://fnziad.github.io/z_academicCV/cv_latex/FahadNadimZiad_cv.pdf
```



## 📅 Last Updated

The CV footer shows the last update date. Remember to update it when making changes.

---

**Portfolio Website:** https://ziaaad.vercel.app/  
**GitHub:** https://github.com/fnziad  
**LinkedIn:** https://www.linkedin.com/in/fahadnadimziad
