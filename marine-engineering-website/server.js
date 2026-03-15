/* ================================================================
   MARINE ENGINEERING & SHIPBUILDING WEBSITE
   Node.js/Express Backend Server
   ================================================================ */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// ================================================================
// MIDDLEWARE CONFIGURATION
// ================================================================

// Enable CORS
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Configure file upload
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'));
    }
  }
});

// ================================================================
// EMAIL CONFIGURATION
// ================================================================

// Configure nodemailer (update with your email credentials)
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email service is ready');
  }
});

// ================================================================
// FORM VALIDATION RULES
// ================================================================

const validateContactForm = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('inquiryType').notEmpty().withMessage('Inquiry type is required'),
  body('message').trim().notEmpty().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
];

const validateCareerApplication = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('experience').notEmpty().withMessage('Experience is required'),
  body('qualification').notEmpty().withMessage('Qualification is required')
];

const validatePartnershipInquiry = [
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('contactPerson').trim().notEmpty().withMessage('Contact person name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('partnershipType').notEmpty().withMessage('Partnership type is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
];

// ================================================================
// ROUTES
// ================================================================

/**
 * Home Route
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Contact Form Submission
 */
app.post('/api/submit-inquiry', validateContactForm, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, phone, company, inquiryType, message } = req.body;

    // Email to company
    const companyEmailContent = `
      <h2>New Inquiry Received</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Email to customer
    const customerEmailContent = `
      <h2>Thank You for Contacting Us</h2>
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to Marine Engineering & Shipbuilding. We have received your inquiry and 
      will get back to you shortly.</p>
      <h3>Your Message Summary:</h3>
      <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
      <p><strong>Reference Number:</strong> INQ-${Date.now()}</p>
      <p>Our team will review your message and respond within 24 business hours.</p>
      <p>Best regards,<br>Marine Engineering & Shipbuilding Team</p>
    `;

    // Send email to company
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL || 'info@marineengineering.com',
      subject: `New Inquiry: ${inquiryType}`,
      html: companyEmailContent
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We Received Your Inquiry - Marine Engineering',
      html: customerEmailContent
    });

    res.json({
      success: true,
      message: 'Your inquiry has been submitted successfully. We will contact you shortly.'
    });

  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

/**
 * Career Application Submission
 */
app.post('/api/submit-application', upload.single('resume'), validateCareerApplication, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { fullName, email, phone, position, currentCompany, currentDesignation, 
            experience, qualification, skills, message } = req.body;
    
    const resumeFile = req.file ? req.file.filename : null;

    // Email to company
    const companyEmailContent = `
      <h2>New Job Application</h2>
      <p><strong>Position Applied:</strong> ${position}</p>
      <p><strong>Applicant:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Current Company:</strong> ${currentCompany || 'Not provided'}</p>
      <p><strong>Current Designation:</strong> ${currentDesignation || 'Not provided'}</p>
      <p><strong>Experience:</strong> ${experience}</p>
      <p><strong>Qualification:</strong> ${qualification}</p>
      <p><strong>Skills:</strong> ${skills || 'Not provided'}</p>
      <h3>Cover Letter:</h3>
      <p>${message ? message.replace(/\n/g, '<br>') : 'Not provided'}</p>
      <p><strong>Resume File:</strong> ${resumeFile || 'Not uploaded'}</p>
    `;

    // Email to applicant
    const applicantEmailContent = `
      <h2>Application Received</h2>
      <p>Dear ${fullName},</p>
      <p>Thank you for applying to Marine Engineering & Shipbuilding for the position of <strong>${position}</strong>.</p>
      <p>We have received your application and will review it carefully. Our HR team will contact you within 5-7 business days.</p>
      <p><strong>Application Reference:</strong> APP-${Date.now()}</p>
      <p>Best regards,<br>HR Team<br>Marine Engineering & Shipbuilding</p>
    `;

    // Send email to company
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CAREERS_EMAIL || 'careers@marineengineering.com',
      subject: `New Application: ${position}`,
      html: companyEmailContent
    });

    // Send confirmation to applicant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Application Received - Marine Engineering',
      html: applicantEmailContent
    });

    res.json({
      success: true,
      message: 'Your application has been submitted successfully. We will review it and contact you soon.'
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

/**
 * Partnership Inquiry Submission
 */
app.post('/api/submit-partnership', validatePartnershipInquiry, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { company, contactPerson, email, phone, partnershipType, message } = req.body;

    // Email to company
    const companyEmailContent = `
      <h2>New Partnership Inquiry</h2>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Contact Person:</strong> ${contactPerson}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Partnership Type:</strong> ${partnershipType}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Email to partner
    const partnerEmailContent = `
      <h2>Partnership Inquiry Received</h2>
      <p>Dear ${contactPerson},</p>
      <p>Thank you for your interest in a partnership with Marine Engineering & Shipbuilding.</p>
      <p>We have received your inquiry and our partnerships team will review it and contact you shortly.</p>
      <p><strong>Partnership Reference:</strong> PART-${Date.now()}</p>
      <p>Best regards,<br>Partnerships Team<br>Marine Engineering & Shipbuilding</p>
    `;

    // Send emails
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.PARTNERSHIPS_EMAIL || 'partnerships@marineengineering.com',
      subject: `Partnership Inquiry: ${partnershipType}`,
      html: companyEmailContent
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Partnership Inquiry Received - Marine Engineering',
      html: partnerEmailContent
    });

    res.json({
      success: true,
      message: 'Your partnership inquiry has been received. Our team will contact you shortly.'
    });

  } catch (error) {
    console.error('Error submitting partnership inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

/**
 * Newsletter Subscription
 */
app.post('/api/subscribe-newsletter', [
  body('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email } = req.body;

    // Email to subscriber
    const subscriberEmailContent = `
      <h2>Welcome to Our Newsletter</h2>
      <p>Thank you for subscribing to Marine Engineering & Shipbuilding newsletter.</p>
      <p>You will now receive latest news, updates, and industry insights directly to your inbox.</p>
      <p>Best regards,<br>Marine Engineering & Shipbuilding Team</p>
    `;

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Marine Engineering Newsletter',
      html: subscriberEmailContent
    });

    // Store subscriber in database (optional)
    // await Newsletter.create({ email });

    res.json({
      success: true,
      message: 'Thank you for subscribing! Check your email for confirmation.'
    });

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

/**
 * Health Check
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'An error occurred on the server'
  });
});

// ================================================================
// START SERVER
// ================================================================

app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════════════════════════════╗
    ║  Marine Engineering & Shipbuilding Website                ║
    ║  Server running on http://localhost:${PORT}              ║
    ║  Environment: ${process.env.NODE_ENV || 'development'}                           ║
    ╚════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
