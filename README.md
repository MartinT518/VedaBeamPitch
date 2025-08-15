# VedaBeam Landing Page

**Ancient Wisdom Delivered with Modern Precision**

A professional landing page for VedaBeam, the first behavioral intelligence engine for health optimization. Built for Railway deployment with waitlist functionality and analytics tracking.

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Railway Deployment
1. Fork this repository
2. Connect to Railway at [railway.app](https://railway.app)
3. Deploy from GitHub repository
4. Add custom domain: vedabeam.com

## 📋 Features

- **Professional Landing Page** - Modern, responsive design with VedaBeam branding
- **Waitlist Functionality** - Email collection with form validation and success/error handling
- **Railway Optimized** - Express server with health checks and proper Railway configuration
- **Analytics Ready** - Google Analytics integration and custom event tracking
- **Mobile Responsive** - Optimized for all devices and screen sizes
- **SEO Optimized** - Meta tags, Open Graph, and Twitter Card support

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Hosting**: Railway (with Railway.json configuration)
- **Security**: Helmet.js, CORS, CSP headers
- **Performance**: Compression, static file serving

## 📁 Project Structure

```
vedabeam-landing-railway/
├── public/                 # Static assets
│   ├── index.html         # Main landing page
│   ├── styles.css         # Styling and responsive design
│   ├── script.js          # Client-side functionality
│   └── assets/            # Images and media files
├── server.js              # Express server
├── package.json           # Dependencies and scripts
├── railway.json           # Railway deployment configuration
├── Procfile              # Process configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🎯 Key Components

### Waitlist Form
- Email validation and sanitization
- Optional name field
- Success/error message handling
- Analytics event tracking
- Spam protection

### Express Server
- Static file serving
- Waitlist API endpoint (`/api/waitlist`)
- Health check endpoint (`/health`)
- Security middleware (Helmet, CORS)
- Compression for performance

### Railway Configuration
- Automatic deployment from GitHub
- Environment variable management
- Health check monitoring
- Custom domain support

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=production
PORT=3000  # Automatically set by Railway
```

### Custom Domain Setup
1. Add domain in Railway dashboard
2. Update DNS records at Hostinger:
   - A record: @ → Railway IP
   - CNAME record: www → your-app.railway.app

## 📊 Analytics & Tracking

### Google Analytics Integration
- Waitlist signup events
- Page view tracking
- Conversion rate monitoring
- User engagement metrics

### Custom Events
- `waitlist_signup` - Tracks successful email submissions
- Form validation errors
- Page interaction events

## 🚀 Deployment Guide

### Step 1: Repository Setup
```bash
# Clone or download this repository
git clone https://github.com/vedabeam/vedabeam-platform.git
cd vedabeam-landing-railway
```

### Step 2: Railway Deployment
1. Visit [railway.app](https://railway.app)
2. Sign up with GitHub account
3. Create new project from GitHub repository
4. Select this repository
5. Railway will automatically detect and deploy

### Step 3: Domain Configuration
1. In Railway dashboard, go to Settings > Domains
2. Add custom domain: vedabeam.com
3. Update DNS at Hostinger with provided records
4. SSL certificate will be automatically provisioned

### Step 4: Verification
- Visit your deployed URL
- Test waitlist form functionality
- Verify health check endpoint: `/health`
- Check analytics tracking

## 🔍 Monitoring & Maintenance

### Health Checks
- Railway automatically monitors `/health` endpoint
- Server logs available in Railway dashboard
- Automatic restart on failure

### Performance Monitoring
- Response time tracking
- Error rate monitoring
- Uptime monitoring via Railway

### Analytics Dashboard
- Google Analytics for user behavior
- Railway metrics for server performance
- Waitlist conversion tracking

## 🛡 Security Features

- **Helmet.js**: Security headers and CSP
- **CORS**: Cross-origin request protection
- **Input Validation**: Email sanitization and validation
- **Rate Limiting**: Protection against spam submissions
- **HTTPS**: Automatic SSL certificate via Railway

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly interactive elements
- Optimized loading performance
- Progressive Web App ready

## 🎨 Brand Guidelines

### Colors
- Primary: #4C1D95 (VedaBeam Purple)
- Secondary: #1E40AF (Deep Blue)
- Accent: #FFD700 (Gold)
- Background: Linear gradient (#667eea to #764ba2)

### Typography
- Font Family: Poppins (Google Fonts)
- Headings: 700 weight
- Body: 400 weight
- Accent: 600 weight

### Visual Elements
- Glassmorphism design with backdrop blur
- Floating animations
- Gradient buttons and badges
- Professional spacing and layout

## 🚀 Future Enhancements

- [ ] Progressive Web App (PWA) capabilities
- [ ] Advanced analytics dashboard
- [ ] A/B testing framework
- [ ] Email automation integration
- [ ] Multi-language support
- [ ] Advanced form fields (referral source, interests)

## 📞 Support

For technical support or questions:
- Email: dev@vedabeam.com
- Repository Issues: GitHub Issues tab
- Railway Support: Railway dashboard help

## 📄 License

MIT License - see LICENSE file for details

---

**VedaBeam** - Transforming health optimization through ancient wisdom and modern AI precision.

