# VedaBeam Pitch One-Pager - Deployment Guide

**Professional landing page for the first behavioral intelligence engine for high performers**

---

## 🚀 **Railway Deployment (Recommended)**

### **1. Quick Deploy**
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

### **2. Manual Deployment**

#### **Step 1: Create Railway Project**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway new
```

#### **Step 2: Configure Environment**
```bash
# Set production environment
railway variables set NODE_ENV=production

# Optional: Set custom port (Railway auto-assigns)
railway variables set PORT=3000
```

#### **Step 3: Deploy**
```bash
# Deploy from current directory
railway up

# Or connect to GitHub repository
railway connect
```

#### **Step 4: Custom Domain**
1. Go to Railway dashboard
2. Select your project
3. Navigate to "Settings" → "Domains"
4. Add your custom domain: `vedabeam.com`
5. Update DNS records as instructed

---

## 🌐 **Alternative Deployment Options**

### **Vercel**
```bash
npm install -g vercel
vercel --prod
```

### **Heroku**
```bash
# Create Heroku app
heroku create vedabeam-pitch

# Deploy
git push heroku main
```

### **DigitalOcean App Platform**
1. Connect GitHub repository
2. Select Node.js environment
3. Set build command: `npm install`
4. Set run command: `npm start`

---

## 🔧 **Local Development**

### **Prerequisites**
- Node.js 18+ 
- npm 8+

### **Setup**
```bash
# Clone repository
git clone <repository-url>
cd vedabeam-pitch-onepager

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Environment Setup**
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

### **Testing**
```bash
# Test server locally
curl http://localhost:3000/health

# Test waitlist endpoint
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## 📊 **Monitoring & Analytics**

### **Health Checks**
- **Endpoint:** `/health`
- **Status:** Returns server health and metrics
- **Monitoring:** Railway auto-monitors this endpoint

### **Logging**
```bash
# View Railway logs
railway logs

# Follow logs in real-time
railway logs --follow
```

### **Performance Monitoring**
- **Response Time:** Tracked via Railway dashboard
- **Uptime:** 99.9% SLA with Railway Pro
- **Error Rates:** Monitored via health checks

---

## 🔒 **Security Configuration**

### **Headers**
- ✅ **Helmet.js** - Security headers
- ✅ **CSP** - Content Security Policy
- ✅ **CORS** - Cross-origin resource sharing
- ✅ **Rate Limiting** - Built-in Express limits

### **SSL/TLS**
- ✅ **HTTPS** - Automatic with Railway
- ✅ **HTTP/2** - Supported by Railway
- ✅ **Certificate Management** - Auto-renewal

### **Data Protection**
- ✅ **Input Validation** - Express-validator
- ✅ **Email Sanitization** - Normalized emails
- ✅ **Request Logging** - Comprehensive logging

---

## 📈 **Performance Optimization**

### **Compression**
- ✅ **Gzip** - Automatic compression
- ✅ **Static Assets** - Cached with proper headers
- ✅ **CDN** - Railway edge network

### **Caching**
```javascript
// Static file caching (1 day in production)
maxAge: NODE_ENV === 'production' ? '1d' : '0'
```

### **Load Testing**
```bash
# Install artillery
npm install -g artillery

# Run load test
artillery quick --count 100 --num 10 https://vedabeam.com
```

---

## 🛠 **Troubleshooting**

### **Common Issues**

#### **1. CSP Errors**
```
Content Security Policy blocks external resources
```
**Solution:** Update CSP in `server.js` to allow required domains

#### **2. Port Binding**
```
Error: listen EADDRINUSE :::3000
```
**Solution:** Railway auto-assigns ports, ensure `PORT` env var is used

#### **3. Build Failures**
```
npm install fails
```
**Solution:** Check Node.js version compatibility in `package.json`

### **Debug Commands**
```bash
# Check Railway status
railway status

# View environment variables
railway variables

# Restart service
railway up --detach
```

---

## 📞 **Support**

### **Railway Support**
- **Documentation:** [railway.app/docs](https://railway.app/docs)
- **Discord:** [railway.app/discord](https://railway.app/discord)
- **Status:** [status.railway.app](https://status.railway.app)

### **VedaBeam Support**
- **Email:** hello@vedabeam.com
- **Health Check:** `https://vedabeam.com/health`
- **API Status:** `https://vedabeam.com/api/status`

---

## 🎯 **Post-Deployment Checklist**

- [ ] **Domain configured** and SSL certificate active
- [ ] **Health check** returning 200 status
- [ ] **Waitlist form** submitting successfully
- [ ] **Analytics** tracking (if configured)
- [ ] **Email notifications** working (if configured)
- [ ] **Mobile responsiveness** tested
- [ ] **Performance** optimized (< 3s load time)
- [ ] **SEO** metadata complete
- [ ] **Social sharing** previews working

**Your VedaBeam pitch one-pager is now live and ready to capture high-performer signups!** 🎉

