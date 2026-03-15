# Quick Start Guide

## 🚀 Get the Site Running in 60 Seconds

### Option 1: Static Site (No Backend)

```bash
# Just open index.html in your browser!
# Or run a simple Python server:
python3 -m http.server 8000
# Visit: http://localhost:8000
```

✅ **Done!** Website is live with all features except email notifications on forms.

---

### Option 2: With Backend (Email Forms)

#### Step 1: Install Node.js
Download from https://nodejs.org (version 14+)

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Set Up Email
Create `.env` file:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

Get Gmail app password:
- Google Account → Security → App passwords
- Select Mail + Windows Computer
- Copy 16-character password

#### Step 4: Start Server
```bash
npm start
```

Visit: http://localhost:3000

✅ **Done!** Website is live with working forms and email notifications.

---

## 📋 What You Get

### 7 Complete Pages
- ✅ **Home** - hero, company info, divisions, gallery
- ✅ **About** - history, leadership team, certifications
- ✅ **Divisions** - marine engineering, shipbuilding, repair
- ✅ **Media** - news, blog, photo gallery, videos
- ✅ **Partners** - RacMet partnership, partner directory
- ✅ **Careers** - job listings, application form
- ✅ **Contact** - 4 offices, contact form, Google Map

### Key Features
- ✨ Fully responsive (mobile, tablet, desktop)
- 🎨 Professional navy/steel/ocean blue design
- 📱 Mobile navigation menu
- 🖼️ Lightbox photo gallery
- 📧 Form validation & submission
- 🌐 Embedded Google Map
- 🎬 Video embeds
- ⚡ Smooth scrolling & animations
- 🎯 SEO optimized structure

### Code Included
- 2000+ lines of responsive CSS
- 400+ lines of JavaScript utilities
- 7 complete HTML pages
- Express backend with email
- Form validation (client & server)
- Complete documentation

---

## 🎨 Customization (5 Minutes)

### Change Company Name
Edit these files and replace "Marine Engineering":
- `index.html` - line 20 (logo)
- `about.html` - update company name
- All other HTML files - footer section
- `README.md` - title

### Change Colors
Edit `css/styles.css` top section:
```css
--primary-navy: #new-color;
--primary-ocean-blue: #new-color;
```

### Change Office Addresses
Edit `contact.html` - find "office-locations" section and update:
- Address text
- Phone numbers
- Email addresses

### Add Your Images
1. Place images in `/images` folder
2. Reference in HTML: `<img src="images/your-image.jpg">`

### Change Text Content
Every page is pure HTML - just edit the text directly!

---

## 📞 Forms Explained

### Without Backend
Forms exist but don't send. To make them work:
- Connect to Formspree.io (free)
- Use Netlify Forms
- Connect any backend

### With Backend (Easy)
1. Follow Option 2 setup above
2. Forms automatically send emails
3. Check your email inbox!

### Forms Included
1. **Contact** - general inquiries
2. **Careers** - job applications with resume
3. **Partners** - partnership proposals
4. **Newsletter** - email subscriptions

---

## 🔍 What's in Each File

```
marine-engineering-website/
├── index.html ..................... Home page
├── about.html ..................... About us page
├── divisions.html ................. Services/divisions
├── media.html ..................... News/blog/gallery
├── partners.html .................. Partnerships
├── careers.html ................... Jobs & applications
├── contact.html ................... Contact & locations
├── css/styles.css ................. All styling (2000+ lines)
├── js/main.js ..................... All JavaScript (400+ lines)
├── server.js ...................... Express backend (optional)
├── package.json ................... Node.js config
├── .env.example ................... Email setup template
├── README.md ...................... Full documentation
├── BACKEND_SETUP.md ............... Detailed backend guide
├── QUICK_START.md ................. This file!
├── images/ ........................ Put images here
└── videos/ ........................ Put videos here
```

---

## ⚡ Performance

- **Fast Loading**: No heavy frameworks
- **Small Size**: <100KB CSS+JS
- **Optimized Images**: Use tools to compress
- **Caching**: Browser caches static files
- **Mobile First**: Built for mobile then desktop

---

## 🔒 Security Features

✅ Form validation (client & server)  
✅ File upload restrictions  
✅ Email verification  
✅ CORS protection  
✅ Input sanitization  

---

## 🌐 Where to Deploy

### For Static Site
- Netlify (easiest)
- Vercel
- GitHub Pages
- AWS S3

### With Backend
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

(All have free tiers or free credits)

---

## 🆘 Troubleshooting

**Q: Website looks broken**
A: Check all image paths point to `/images` folder

**Q: Forms not working**
A: Without backend? Expected. Add `.env` file and run `npm start`

**Q: Emails not sending**
A: Check Gmail has app password (not regular password)

**Q: Mobile menu not working**
A: Check `js/main.js` loaded in HTML

**Q: Images blurry on mobile**
A: Images auto-responsive. Check original image size.

---

## 📚 Technology Stack

### Frontend
- HTML5 (semantic structure)
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (no frameworks, no jQuery)

### Optional Backend
- Node.js + Express
- Nodemailer (emails)
- Multer (file uploads)
- Express-validator (form validation)

### No External Dependencies
The entire website works without any npm packages! Backend is optional.

---

## 💡 Pro Tips

1. **Use Chrome DevTools** - Right-click → Inspect Element
2. **Mobile Testing** - Right-click → Inspect → Toggle Device Toolbar
3. **Color Picker** - Use built-in tools in DevTools
4. **Search & Replace** - Ctrl+H in editor to change all instances
5. **Local Testing** - Always test locally before deploying
6. **Browser Cache** - Use Ctrl+Shift+R for hard refresh
7. **Console Errors** - Check F12 Console tab for issues

---

## 🎓 Learning Resources

- **HTML/CSS**: MDN Web Docs (developer.mozilla.org)
- **JavaScript**: JavaScript.info
- **Node.js**: nodejs.org/en/docs
- **Design**: Figma community designs

---

## 📈 Next Steps

1. ✅ Get site running (done in 60 seconds!)
2. ✅ Customize text and colors (5 minutes)
3. ✅ Add your company logo and images
4. ✅ Test all forms and features
5. ✅ Deploy to production
6. ✅ Set up domain name
7. ✅ Monitor analytics
8. ✅ Keep content updated

---

## 🎉 You're All Set!

Your professional corporate website is ready. 

Need help? Check:
- `README.md` - Full documentation
- `BACKEND_SETUP.md` - Email/form setup
- Browser console (F12) - Error messages

Happy coding! 🚀

---

**Pro Tip:** Save this guide! You'll want it for reference.

Last Updated: March 2024 | Version 1.0.0
