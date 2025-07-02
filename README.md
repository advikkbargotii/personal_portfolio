# Professional Portfolio Website

A modern, responsive portfolio website designed to impress recruiters in Software Engineering and AI/ML fields.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, scroll animations, and typing animations
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Optimized CSS and JavaScript for quick load times

## Customization Guide

### 1. Personal Information

Update the following sections in `index.html`:

**Hero Section (Lines 50-68):**
- Replace "Your Name" with your actual name
- Update the subtitle and description
- Add your social media links (GitHub, LinkedIn, Email)

**About Section (Lines 87-95):**
- Write your personal story and background
- Update the statistics (projects, experience, technologies)

**Contact Section (Lines 300-308):**
- Replace with your actual contact information
- Update email, phone, and location

### 2. Skills and Technologies

**Skills Section (Lines 125-168):**
- Update programming languages based on your expertise
- Modify AI/ML frameworks you're familiar with
- Add/remove web development technologies
- Update tools and technologies you use

### 3. Projects

**Projects Section (Lines 177-248):**
For each project, update:
- Project title and description
- Technology tags
- GitHub repository links
- Live demo links
- Project images (add to the same folder)

### 4. Experience and Education

**Experience Section (Lines 258-284):**
- Add your work experience
- Include internships and research positions
- Update education details
- Modify dates and descriptions

### 5. Images

Add the following images to your portfolio folder:
- `profile-photo.jpg` - Your professional headshot (350x350px recommended)
- `about-photo.jpg` - Another professional photo (300x400px recommended)
- `project1.jpg`, `project2.jpg`, `project3.jpg` - Screenshots of your projects

### 6. Colors and Styling

To customize the color scheme, edit `styles.css`:

**Primary Colors:**
- `#2563eb` - Main blue color
- `#ffd700` - Accent gold color
- `#1f2937` - Dark text color

**Background Colors:**
- `#f8fafc` - Light gray background
- `#ffffff` - White background

## Deployment Options

### 1. GitHub Pages (Free)

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to repository Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

### 2. Netlify (Free)

1. Create a Netlify account
2. Drag and drop your portfolio folder to Netlify
3. Your site will be deployed automatically
4. Optional: Connect to GitHub for automatic updates

### 3. Vercel (Free)

1. Create a Vercel account
2. Import your GitHub repository
3. Deploy with one click
4. Automatic deployments on every commit

### 4. Custom Domain

To use a custom domain:
1. Purchase a domain from a registrar
2. Update DNS settings to point to your hosting provider
3. Configure SSL certificate (usually automatic)

## File Structure

```
professional-portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── README.md           # This file
├── profile-photo.jpg   # Your main photo
├── about-photo.jpg     # About section photo
├── project1.jpg        # Project screenshots
├── project2.jpg
└── project3.jpg
```

## Performance Optimization

### Images
- Optimize images using tools like TinyPNG or ImageOptim
- Use WebP format for better compression
- Ensure images are properly sized for their containers

### Loading Speed
- Minimize HTTP requests
- Use CDN for external libraries (already implemented)
- Enable gzip compression on your server

## SEO Tips

1. **Meta Tags**: Update the title tag and add meta description
2. **Alt Text**: Add descriptive alt text to all images
3. **Schema Markup**: Consider adding structured data for better search results
4. **Content**: Ensure all text is meaningful and keyword-rich

## Additional Features to Consider

### Analytics
Add Google Analytics to track visitors:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Blog Section
Consider adding a blog section to showcase your thoughts on technology and your learning journey.

### Resume Download
Add a link to download your resume:
```html
<a href="your-resume.pdf" download class="btn btn-primary">Download Resume</a>
```

## Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths and ensure images are in the correct folder
2. **Contact form not working**: The current form is frontend-only. For a working form, integrate with services like Formspree or Netlify Forms
3. **Mobile menu not working**: Ensure JavaScript is enabled and check for console errors

### Browser Compatibility

This portfolio is tested on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For questions or issues:
1. Check the troubleshooting section above
2. Review the code comments for guidance
3. Consider hiring a developer for advanced customizations

## License

This portfolio template is free to use for personal and commercial projects. Attribution is appreciated but not required.

---

**Good luck with your job search! 🚀**
