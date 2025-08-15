const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Trust proxy for Railway
app.set('trust proxy', 1);

// Security middleware with proper CSP for external resources
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "https://fonts.googleapis.com", 
        "https://cdn.tailwindcss.com"
      ],
      fontSrc: [
        "'self'", 
        "https://fonts.gstatic.com"
      ],
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "https://cdn.tailwindcss.com"
      ],
      imgSrc: [
        "'self'", 
        "data:", 
        "https:", 
        "blob:"
      ],
      connectSrc: [
        "'self'", 
        "https:"
      ],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      upgradeInsecureRequests: NODE_ENV === 'production' ? [] : null
    }
  },
  crossOriginEmbedderPolicy: false
}));

// Performance and CORS middleware
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

app.use(cors({
  origin: NODE_ENV === 'production' 
    ? ['https://vedabeam.com', 'https://www.vedabeam.com']
    : true,
  credentials: true
}));

// Request parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving with caching
app.use(express.static(path.join(__dirname), {
  maxAge: NODE_ENV === 'production' ? '1d' : '0',
  etag: true,
  lastModified: true
}));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url} - ${req.ip}`);
  next();
});

// Waitlist endpoint with comprehensive validation
app.post('/api/waitlist',
  // Input validation
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  
  async (req, res) => {
    try {
      // Check validation results
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please enter a valid email address.',
          errors: errors.array()
        });
      }
      
      const { email } = req.body;
      
      // Log the signup with comprehensive data
      const signupData = {
        email,
        timestamp: new Date().toISOString(),
        userAgent: req.get('User-Agent'),
        ip: req.ip,
        referer: req.get('Referer'),
        source: 'vedabeam-pitch-onepager'
      };
      
      console.log('🎯 VedaBeam waitlist signup:', JSON.stringify(signupData, null, 2));
      
      // In production, you would save to database here
      // await saveToDatabase(signupData);
      
      // Send success response
      res.json({ 
        success: true, 
        message: 'Welcome to VedaBeam! Check your email for confirmation.'
      });
      
    } catch (error) {
      console.error('Waitlist signup error:', error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again.'
      });
    }
  }
);

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  const healthData = {
    status: 'healthy',
    service: 'vedabeam-pitch-onepager',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    memory: process.memoryUsage(),
    port: PORT
  };
  
  res.json(healthData);
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    api: 'VedaBeam Pitch One-Pager API',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      'POST /api/waitlist': 'Waitlist signup',
      'GET /health': 'Health check',
      'GET /api/status': 'API status'
    }
  });
});

// Serve main page for all routes (SPA behavior)
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      error: 'API endpoint not found',
      path: req.path
    });
  }
  
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: NODE_ENV === 'production' 
      ? 'Something went wrong. Please try again.' 
      : err.message,
    ...(NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('🧠 VedaBeam Pitch One-Pager Server Started');
  console.log(`🌐 Environment: ${NODE_ENV}`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🎯 Ready to capture high-performer signups!`);
});

// Graceful shutdown handlers
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 ${signal} received, shutting down gracefully...`);
  
  server.close((err) => {
    if (err) {
      console.error('❌ Error during server shutdown:', err);
      process.exit(1);
    }
    
    console.log('✅ Server closed successfully');
    console.log('👋 VedaBeam Pitch One-Pager shutdown complete');
    process.exit(0);
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('⚠️  Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

module.exports = app;

