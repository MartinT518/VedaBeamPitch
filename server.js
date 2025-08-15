const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  }
}));

// Performance middleware
app.use(compression());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submissions (waitlist)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Waitlist endpoint
app.post('/api/waitlist', (req, res) => {
  const { email, name } = req.body;
  
  // Log the signup (in production, save to database)
  console.log('New waitlist signup:', { email, name, timestamp: new Date().toISOString() });
  
  // Send success response
  res.json({ 
    success: true, 
    message: 'Thank you for joining the VedaBeam waitlist! We\'ll be in touch soon.' 
  });
});

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`VedaBeam Landing Page running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

