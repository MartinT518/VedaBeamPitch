const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware with proper CSP for Tailwind and external resources
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.tailwindcss.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  }
}));

// Performance middleware
app.use(compression());
app.use(cors());

// Performance optimization headers
app.use((req, res, next) => {
  res.setHeader('Link', '</styles.css>; rel=preload; as=style, </script.js>; rel=preload; as=script');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submissions (waitlist)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Waitlist endpoint with robust validation
app.post('/api/waitlist',
  body('email').isEmail().normalizeEmail(),
  body('name').trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid input. Please check your email address.' 
      });
    }
    
    const { email, name } = req.body;
    
    // Log the signup (in production, save to database)
    console.log('New waitlist signup:', { 
      email, 
      name, 
      timestamp: new Date().toISOString(),
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });
    
    // Send success response
    res.json({ 
      success: true, 
      message: 'Thank you for joining the VedaBeam waitlist! We\'ll be in touch soon.' 
    });
  }
);

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'vedabeam-landing'
  });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`VedaBeam Landing Page running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown handlers
const gracefulShutdown = () => {
  console.log('Shutdown signal received, closing server gracefully.');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

