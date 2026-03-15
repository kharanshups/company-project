# Marine Engineering & Shipbuilding Corporate Website

A modern, responsive corporate website for a marine engineering and shipbuilding company. Built with HTML5, CSS3, and JavaScript with optional Node.js/Express backend for form handling.

## 📋 Project Overview

This is a complete, production-ready website featuring:

- **7 Main Pages**: Home, About, Divisions, Media, Partners, Careers, and Contact
- **Modern Design**: Navy blue, steel grey, and ocean blue color palette
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Interactive Features**: Lightbox gallery, smooth scrolling, form validation
- **Professional Layout**: Corporate, industrial, maritime-themed design
- **SEO Optimized**: Semantic HTML5 structure
- **Backend Integration**: Optional Node.js/Express for form handling

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js 14+ (optional, for backend)
- npm or yarn (optional, for backend)

### Installation

1. **Clone the repository**
   ```bash
   cd marine-engineering-website
   ```

2. **Static Site Only** (No backend)
   - Open `index.html` in your browser, or
   - Use a local server:
     ```bash
     python3 -m http.server 8000
     # or with Python 2
     python -m SimpleHTTPServer 8000
     ```
   - Visit `http://localhost:8000`

3. **With Backend (Node.js/Express)**
   ```bash
   # Install dependencies
   npm install

   # Create .env file
   cp .env.example .env
   # Edit .env with your email credentials

   # Start the server
   npm start
   # Development mode with auto-restart
   npm run dev
   ```
   - Visit `http://localhost:3000`

## 📁 Project Structure

```
marine-engineering-website/
├── css/
│   └── styles.css                 # Main stylesheet (2000+ lines)
├── js/
│   └── main.js                    # JavaScript utilities (400+ lines)
├── images/                        # Image assets directory
├── videos/                        # Video assets directory
├── uploads/                       # Server-side file uploads (created by Node.js)
├── index.html                     # Home page
├── about.html                     # About us page
├── divisions.html                 # Divisions page
├── media.html                     # Media/Blog/Gallery page
├── partners.html                  # Partners page
├── careers.html                   # Careers/Jobs page
├── contact.html                   # Contact page
├── package.json                   # Node.js dependencies
├── server.js                      # Express server (optional)
├── .env.example                   # Environment variables template
└── README.md                      # This file
```

## 🎨 Design System

### Color Palette
- **Primary Navy**: #001f3f (Header, main backgrounds)
- **Primary Steel Grey**: #2c3e50 (Alternate backgrounds)
- **Primary Ocean Blue**: #0073e6 (Links, accents)
- **Accent Light Blue**: #00a8e8 (Hover states, highlights)
- **Neutral White**: #ffffff (Text backgrounds)
- **Neutral Light Grey**: #f5f6fa (Section backgrounds)

### Typography
- **Heading Font**: Arial, sans-serif
- **Body Font**: Segoe UI, Tahoma, Geneva, Verdana
- **Font Sizes**: Responsive scaling from mobile to desktop
- **Font Weights**: Light (300), Normal (400), Semibold (600), Bold (700)

### Spacing
- Consistent spacing system using CSS variables
- Responsive padding and margins
- Mobile-first approach with breakpoints at 768px and 1024px

### Components
- Navbar (sticky, responsive)
- Hero sections with overlays
- Cards (with hover animations)
- Buttons (primary, secondary, small, large)
- Forms with validation
- Gallery with lightbox
- Footer with multiple sections

## 📄 Pages & Features

### 1. Home (index.html)
- Hero section with video background
- Company introduction
- Divisions overview
- Certifications preview
- Featured projects
- Latest news cards
- Photo gallery
- Call-to-action

### 2. About (about.html)
- Company history timeline
- Core values section
- Leadership team grid (6 members with credentials)
- Certifications & accreditations
- Company statistics
- Professional team photos and bios

### 3. Divisions (divisions.html)
- Marine Engineering division details
- Ship Building division details
- Ship Repair & Modernization division
- Case studies and project examples
- Division comparison
- Technical descriptions

### 4. Media (media.html)
- Featured news article
- Recent news grid
- Photo gallery with lightbox
- Video gallery with embedded YouTube videos
- Newsletter subscription form
- Blog-style layout

### 5. Partners (partners.html)
- RacMet partnership highlight
- Partnership video embed
- Key partners grid
- Partnership programs
- Partnership inquiry form

### 6. Careers (careers.html)
- Career benefits highlights
- 6 current job openings
- University internship program
- Graduate trainee program
- Job application form
- Resume upload functionality

### 7. Contact (contact.html)
- 3 contact methods (email, phone, hours)
- 4 office locations in India (Mumbai, Kolkata, Cochin, Delhi)
- Embedded Google Map
- Contact inquiry form
- Department directory

## 🔧 Features

### Frontend Features
- **Responsive Navigation**: Mobile menu toggle at 768px breakpoint
- **Smooth Scrolling**: CSS smooth scroll behavior
- **Lightbox Gallery**: Click images to view full-screen with navigation
- **Form Validation**: Client-side validation for all forms
- **Animations**: Fade-in, slide-in, hover effects
- **Lazy Loading**: Images with data-src attribute support
- **Mobile Optimized**: Touch-friendly buttons and spacing

### JavaScript Features (main.js)
- Navbar scroll detection and styling
- Asset lightbox with keyboard navigation
- Form validation with custom error messages
- Smooth scroll link handling
- Scroll animations with IntersectionObserver
- Parallax effects
- Utility functions (phone formatting, clipboard copy)
- Responsive menu toggle

### Backend Features (server.js - Optional)
- Express.js server
- Form submission handling
- Email notifications via Nodemailer
- File upload support (resume/CV)
- Input validation with express-validator
- Error handling
- CORS support
- Health check endpoint

## 📮 Form Submissions

### Without Backend
Forms are HTML forms that can be connected to any backend service (Formspree, Netlify Forms, etc.)

### With Backend (Node.js)

1. **Contact Inquiry Form**
   - Endpoint: `POST /api/submit-inquiry`
   - Sends email to: `COMPANY_EMAIL`
   - Confirmation email to user

2. **Career Application**
   - Endpoint: `POST /api/submit-application`
   - Supports file upload (resume/CV)
   - Sends to: `CAREERS_EMAIL`
   - Confirmation email to applicant

3. **Partnership Inquiry**
   - Endpoint: `POST /api/submit-partnership`
   - Sends to: `PARTNERSHIPS_EMAIL`
   - Confirmation email to inquirer

4. **Newsletter Subscription**
   - Endpoint: `POST /api/subscribe-newsletter`
   - Confirmation email sent

## 🔌 Backend Configuration

### Setting Up Email (Gmail Example)

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Create `.env` file:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   COMPANY_EMAIL=info@marineengineering.com
   CAREERS_EMAIL=careers@marineengineering.com
   PARTNERSHIPS_EMAIL=partnerships@marineengineering.com
   ```

### Using Other Email Services

Update `server.js` with your email service configuration:
```javascript
const transporter = nodemailer.createTransport({
  service: 'your-service', // e.g., 'outlook', 'yahoo'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

## 🎯 Customization

### Change Company Name
1. `index.html` - Update logo text
2. All HTML files - Update footer and header
3. `css/styles.css` - Update color scheme if needed

### Change Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --primary-navy: #your-color;
  --primary-ocean-blue: #your-color;
  /* ... more variables ... */
}
```

### Add New Pages
1. Create new HTML file (e.g., `services.html`)
2. Copy header/nav/footer from existing page
3. Add to navigation menu in all pages
4. Style with existing CSS classes

### Add Team Members
1. Edit `about.html`
2. Duplicate leader card
3. Update photo, name, designation, and certifications
4. Maintain grid layout

### More News/Jobs
1. Duplicate card structure
2. Update content and links
3. Data will automatically adjust to grid layout

## 📱 Responsive Breakpoints

- **Mobile**: < 480px (phones)
- **Tablet**: 480px - 768px (tablets)
- **Desktop**: > 768px (laptops)
- **Large Desktop**: > 1024px (large screens)

All components adjust gracefully at these breakpoints.

## 🔐 Security

- HTML forms validate on client-side
- Server-side validation with express-validator
- File upload restrictions (type and size)
- CORS enabled for API endpoints
- Sanitization of user inputs
- Email validation

For production, add:
- HTTPS/SSL certificates
- Rate limiting
- Database encryption
- API authentication

## 📊 SEO Optimization

- Semantic HTML5 structure
- Meta tags on all pages
- Heading hierarchy (H1, H2, H3)
- Alt text on images
- Internal linking
- Responsive design
- Fast loading (CSS/JS bundle < 100KB)

## 🚀 Deployment

### Static Site (No Backend)
- Netlify, Vercel, GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

### With Backend
- Heroku
- AWS EC2
- DigitalOcean
- Railway
- Render

### Environment Setup for Production
```bash
NODE_ENV=production
PORT=8080
# Generate strong secret keys
# Enable SSL/HTTPS
# Use database instead of in-memory storage
# Set up email service with production credentials
```

## 📦 Dependencies

### Frontend (Included)
- HTML5
- CSS3
- Vanilla JavaScript (no frameworks)

### Backend (Optional - in package.json)
- **express**: Web framework
- **dotenv**: Environment variables
- **body-parser**: Request parsing
- **cors**: Cross-origin requests
- **nodemailer**: Email sending
- **express-validator**: Input validation
- **multer**: File uploads
- **nodemon**: Development auto-restart

## 🐛 Troubleshooting

### Forms not submitting
- Check browser console for errors
- Verify form endpoint URLs
- For backend: Check server is running on correct port
- Verify email configuration in `.env`

### Images not showing
- Check image paths in HTML
- Ensure images exist in `/images` folder
- Check browser console for 404 errors
- Use relative paths, not absolute

### Gallery lightbox not working
- Verify images have `data-lightbox` attribute
- Check JavaScript loads without errors
- Test in different browser

### Mobile menu not toggling
- Check viewport meta tag is present
- Test touch events on actual mobile device
- Verify CSS media queries are correct

### Emails not sending
- Verify `.env` file exists and config is correct
- Check app password (not regular password)
- Verify SMTP service is accessible
- Check console for email service errors

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Nodemailer Guide](https://nodemailer.com/)
- [HTML5 Semantic Elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Mobile First Responsive Design](https://www.nngroup.com/articles/mobile-first-responsive-web-design/)

## 📞 Support

For form-related issues or customization help, refer to:
- Browser console (F12) for JavaScript errors
- Server logs when running backend
- Email service provider documentation

## 📄 License

This project is provided as-is for marine engineering companies. Customize as needed for your branding.

## ✨ Features Highlight

✅ Production-ready code  
✅ Fully responsive design  
✅ Modern CSS with variables  
✅ Comprehensive JavaScript utilities  
✅ Optional backend with email  
✅ Form validation & submission  
✅ Professional UI/UX  
✅ SEO optimized  
✅ Mobile-first approach  
✅ Clean, well-commented code  
✅ No external dependencies (frontend)  
✅ Easy to customize  

## 🎉 Thank You!

Thank you for using the Marine Engineering & Shipbuilding Website. We hope it serves your business well!

---

**Last Updated**: March 2024  
**Version**: 1.0.0
