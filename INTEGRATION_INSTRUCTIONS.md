# CV Integration Instructions for Portfolio

## 📄 CV Location & Access

The academic CV is hosted in a GitHub repository:

**Repository:** https://github.com/fnziad/z_academicCV

**Direct PDF Link:**
```
https://github.com/fnziad/z_academicCV/raw/main/cv_latex/FahadNadimZiad_cv.pdf
```

## 🔄 How It Works

1. CV is maintained as a LaTeX file (`FahadNadimZiad_cv.tex`)
2. PDF is compiled locally and committed to the repository
3. The PDF is accessible via the raw GitHub link above
4. Your portfolio fetches the PDF directly from GitHub

## 🌐 Integration with Portfolio (https://ziaaad.vercel.app/)

### Option 1: Direct Download Link (Recommended)
Add a download button/link that points directly to the GitHub raw URL:

```jsx
// React/Next.js example
<a
  href="https://github.com/fnziad/z_academicCV/raw/main/cv_latex/FahadNadimZiad_cv.pdf"
  target="_blank"
  rel="noopener noreferrer"
  download="FahadNadimZiad_CV.pdf"
  className="cv-download-button"
>
  Download CV
</a>
```

```html
<!-- Plain HTML -->
<a
  href="https://github.com/fnziad/z_academicCV/raw/main/cv_latex/FahadNadimZiad_cv.pdf"
  download="FahadNadimZiad_CV.pdf"
>
  <button>Download CV</button>
</a>
```

### Option 2: Embed PDF Viewer
Display the CV inline using an iframe:

```jsx
// React/Next.js example
<iframe
  src="https://github.com/fnziad/z_academicCV/raw/main/cv_latex/FahadNadimZiad_cv.pdf"
  width="100%"
  height="800px"
  title="Fahad Nadim Ziad - CV"
  style={{ border: "none" }}
/>
```

### Option 3: Fetch During Build (Next.js)
If you want to host it on your Vercel deployment:

```javascript
// In your API route or build script
export async function getStaticProps() {
  const cvUrl = "https://github.com/fnziad/z_academicCV/raw/main/cv_latex/FahadNadimZiad_cv.pdf";
  
  const response = await fetch(cvUrl);
  const buffer = await response.arrayBuffer();
  
  // Save to public folder or serve directly
  return {
    props: { cvUrl }
  };
}
```

## 📋 Suggested UI Placements

1. **Header/Navigation:** "CV" or "Resume" link
2. **About Section:** Download button with icon
3. **Footer:** Quick access link
4. **Dedicated CV Page:** Full viewer + download option

## 🎨 UI Component Example

```jsx
// Modern download button component
const CVDownloadButton = () => {
  return (
    <a
      href="https://github.com/fnziad/z_academicCV/raw/main/cv_latex/FahadNadimZiad_cv.pdf"
      download="FahadNadimZiad_CV.pdf"
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download CV
    </a>
  );
};
```

## ✅ Benefits

- **Simple & Reliable:** Direct link from GitHub
- **No Manual Uploads:** Owner updates CV and PDF in git
- **Version Control:** Full history of CV changes
- **Fast Loading:** Served from GitHub's CDN

## 📝 CV Details

- Includes portfolio website link (https://ziaaad.vercel.app/)
- Last updated: November 9, 2025
- File size: ~181KB
- Format: Professional academic CV (2 pages)
- Skills include: Python, ML/AI, CI/CD, DevOps, and more

## 🔗 Related Links

- **Portfolio:** https://ziaaad.vercel.app/
- **CV Repository:** https://github.com/fnziad/z_academicCV
- **GitHub:** https://github.com/fnziad
- **LinkedIn:** https://www.linkedin.com/in/fahadnadimziad

---

## ✅ Summary for Portfolio Copilot

**What you need to do:**

Simply add a link/button to download or view the CV using this URL:
```
https://github.com/fnziad/z_academicCV/raw/main/cv_latex/FahadNadimZiad_cv.pdf
```

The PDF is kept up-to-date by the CV owner manually. Your portfolio just needs to link to it.

**No additional setup needed** - just use the URL above in your download button or PDF viewer.

---

**Last Updated:** November 9, 2025  
**Maintained By:** Fahad Nadim Ziad
