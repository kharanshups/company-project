# Backend Setup Guide

## Overview

The Node.js/Express backend is **optional** and provides form submission handling with email notifications. You can use the website without it for static content, or integrate it for dynamic form processing.

## Prerequisites

- Node.js 14.0.0 or higher
- npm 6.0.0 or higher
- A working email account (for sending form notifications)

## Installation Steps

### 1. Install Node.js Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`:
- express
- dotenv
- body-parser
- cors
- nodemailer
- express-validator
- multer

### 2. Configure Environment Variables

**Using Gmail (Recommended for testing):**

1. Go to your Google Account: https://myaccount.google.com
2. Enable 2-Factor Authentication (Security → 2-Step Verification)
3. Generate App Password: Security → App passwords
   - Select "Mail" as the app
   - Select "Windows Computer" (or your device)
   - Generate the password (copy the 16-character password)

4. Create `.env` file in project root:

```bash
cp .env.example .env
```

5. Edit `.env` and add:

```env
PORT=3000
NODE_ENV=development

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx

# Company Email Addresses
COMPANY_EMAIL=company@example.com
CAREERS_EMAIL=careers@example.com
PARTNERSHIPS_EMAIL=partners@example.com
```

**Using Other Email Services:**

For Outlook/Office 365:
```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

For Yahoo:
```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password
```

For Custom SMTP:
```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
EMAIL_SECURE=true
```

Then update `server.js`:
```javascript
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

### 3. Start the Server

**Development Mode (with auto-restart):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║  Marine Engineering & Shipbuilding Website                ║
║  Server running on http://localhost:3000                  ║
║  Environment: development                                 ║
╚════════════════════════════════════════════════════════════╝
```

### 4. Verify Installation

Visit: http://localhost:3000/api/health

You should get:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-03-15T10:30:00.000Z"
}
```

## API Endpoints

### 1. Contact Inquiry Form

**Endpoint:** `POST /api/submit-inquiry`

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "company": "ABC Company",
  "inquiryType": "project",
  "message": "I would like to discuss a shipbuilding project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your inquiry has been submitted successfully..."
}
```

**Form:** `contact.html`

---

### 2. Career Application

**Endpoint:** `POST /api/submit-application`

**Request Body:** (Form-data with file)
```
fullName: John Smith
email: john@example.com
phone: +91 1234567890
position: senior-naval-architect
experience: 10-15
qualification: master
skills: CATIA, CAD, FEA
resume: [FILE]
message: I am interested in this position...
```

**Response:**
```json
{
  "success": true,
  "message": "Your application has been submitted successfully..."
}
```

**Form:** `careers.html`

---

### 3. Partnership Inquiry

**Endpoint:** `POST /api/submit-partnership`

**Request Body:**
```json
{
  "company": "Tech Solutions Ltd",
  "contactPerson": "Jane Doe",
  "email": "jane@techsolutions.com",
  "phone": "+91 9876543210",
  "partnershipType": "supplier",
  "message": "We are interested in supplying marine materials..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your partnership inquiry has been received..."
}
```

**Form:** `partners.html`

---

### 4. Newsletter Subscription

**Endpoint:** `POST /api/subscribe-newsletter`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for subscribing..."
}
```

**Form:** `media.html`

## Email Notifications

### Emails Sent

1. **Contact Inquiry:**
   - To Company: Full inquiry details
   - To User: Confirmation with reference number

2. **Career Application:**
   - To HR: Application details and resume
   - To Applicant: Confirmation with reference number

3. **Partnership Inquiry:**
   - To Partnerships: Inquiry details
   - To Partner: Confirmation with reference number

4. **Newsletter:**
   - To Subscriber: Welcome email

## Form Validation

All forms include:
- **Client-side:** JavaScript validation (instant feedback)
- **Server-side:** Express-validator (security)

### Validation Rules

**Contact Form:**
- Name: Required, non-empty
- Email: Valid email format
- Phone: Required
- Message: Min 10 characters

**Career Application:**
- Full Name: Required
- Email: Valid email format
- Phone: Required
- Position: Must select from dropdown
- Experience: Must select a level
- Qualification: Must select a level
- Resume: File upload (PDF, DOC, DOCX, max 5MB)

**Partnership Inquiry:**
- Company: Required
- Contact Person: Required
- Email: Valid email format
- Phone: Required
- Partnership Type: Required
- Message: Required

## File Upload Configuration

Resume uploads are stored in `/uploads` directory:

```javascript
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    // ... validation logic
  }
});
```

**To customize:**
- Change `dest` to upload directory path
- Modify `limits.fileSize` for different file sizes
- Update `allowedMimes` for different file types

## Error Handling

### Common Errors & Solutions

**Email Service Error**
```
Error: connect EAUTH
```
**Solution:** Check Gmail app password (not regular password)

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** 
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
PORT=3001 npm start
```

**Email Configuration Error**
```
Error: Failed to verify mail server configuration
```
**Solution:**
- Check EMAIL_SERVICE is correct
- Verify email credentials
- Ensure 2FA is enabled (Gmail)
- Check firewall/antivirus isn't blocking SMTP

**File Upload Error**
```
Error: File too large
```
**Solution:** Increase `fileSize` limit in server.js or reduce file size

## Testing the Forms

### Using cURL

```bash
# Test Contact Form
curl -X POST http://localhost:3000/api/submit-inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 1234567890",
    "inquiryType": "project",
    "message": "Test message with at least ten characters"
  }'
```

### Using Postman

1. Open Postman
2. Create new POST request
3. URL: `http://localhost:3000/api/submit-inquiry`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+91 1234567890",
  "inquiryType": "project",
  "message": "Test message with sufficient characters"
}
```
6. Send and verify response

## Troubleshooting

**Q: Emails not sending**
A: 
- Check `.env` file exists and has correct credentials
- Verify email service is accessible
- Check server console for error messages
- For Gmail: verify app password (16 characters)

**Q: Forms submit but no email**
A:
- Check email service configuration
- Verify sender email is activated
- Check spam folder for emails
- Review server logs for errors

**Q: Get 404 on form submission**
A:
- Verify server is running
- Check endpoint URLs in HTML forms
- Ensure form `action` attribute matches API route

**Q: File upload fails**
A:
- Check file size (max 5MB)
- Verify file format is PDF or Word
- Check `/uploads` folder has write permissions
- Check server console for multer errors

## Production Deployment

### Environment Setup

```env
NODE_ENV=production
PORT=8080

# Use secure email service with strong credentials
EMAIL_SERVICE=gmail
EMAIL_USER=noreply@company.com
EMAIL_PASSWORD=strong-app-password

# Update with production emails
COMPANY_EMAIL=company@marineengineering.com
CAREERS_EMAIL=careers@marineengineering.com
PARTNERSHIPS_EMAIL=partners@marineengineering.com
```

### Deployment Checklist

- [ ] Node.js 14+ installed on server
- [ ] `.env` file configured with production credentials
- [ ] `node_modules` installed
- [ ] Tested all form submissions
- [ ] Email service verified
- [ ] SSL/HTTPS enabled
- [ ] Firewall allows port 3000 (or configured port)
- [ ] Logs configured for monitoring
- [ ] Backup and restore plan ready
- [ ] Database setup (if using one)

## Next Steps

1. **Customize Emails:** Update email templates in `server.js`
2. **Add Database:** Connect MongoDB, PostgreSQL, etc.
3. **Implement Users:** Add authentication if needed
4. **Enhance Security:** Add rate limiting, CSRF protection
5. **Analytics:** Integrate Google Analytics or Mixpanel
6. **CRM Integration:** Connect with Salesforce, HubSpot, etc.

## Support & Documentation

- **Express.js:** https://expressjs.com/
- **Nodemailer:** https://nodemailer.com/
- **Form Validation:** https://express-validator.github.io/
- **File Upload:** https://www.npmjs.com/package/multer
- **Environment Variables:** https://www.npmjs.com/package/dotenv

---

Last Updated: March 2024
