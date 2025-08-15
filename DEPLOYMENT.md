# VedaBeam Landing Page - Railway Deployment Guide

Complete step-by-step guide for deploying the VedaBeam landing page to Railway and configuring the custom domain.

## 🎯 Prerequisites

- [ ] GitHub account with repository access
- [ ] Railway account (free tier available)
- [ ] Domain purchased from Hostinger (vedabeam.com)
- [ ] Google Workspace configured for @vedabeam.com

## 📋 Deployment Steps

### Phase 1: Repository Setup (5 minutes)

1. **Upload to GitHub**
   ```bash
   # Navigate to your local repository
   cd vedabeam-landing-railway
   
   # Initialize git repository
   git init
   
   # Add all files
   git add .
   
   # Commit files
   git commit -m "Initial VedaBeam landing page setup"
   
   # Add remote repository (replace with your GitHub repo)
   git remote add origin https://github.com/vedabeam/vedabeam-platform.git
   
   # Push to GitHub
   git push -u origin main
   ```

2. **Verify Repository Structure**
   - Ensure all files are uploaded correctly
   - Check that assets/vedabeam-logo.png is included
   - Verify package.json and railway.json are present

### Phase 2: Railway Account Setup (3 minutes)

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Click "Start a New Project"
   - Sign up with your GitHub account
   - Authorize Railway to access your repositories

2. **Connect Repository**
   - Select "Deploy from GitHub repo"
   - Choose your vedabeam-platform repository
   - Select the main branch

### Phase 3: Railway Deployment (10 minutes)

1. **Initial Deployment**
   - Railway will automatically detect the Node.js project
   - It will read the railway.json configuration
   - Deployment will start automatically
   - Wait for build to complete (usually 2-3 minutes)

2. **Verify Deployment**
   - Check deployment logs for any errors
   - Visit the generated Railway URL (e.g., `your-app.railway.app`)
   - Test the waitlist form functionality
   - Verify the health check endpoint: `/health`

3. **Configure Environment Variables**
   - In Railway dashboard, go to Variables tab
   - Add any additional environment variables if needed
   - NODE_ENV and PORT are automatically configured

### Phase 4: Custom Domain Configuration (15 minutes)

1. **Add Domain in Railway**
   - In Railway dashboard, go to Settings > Domains
   - Click "Add Domain"
   - Enter: `vedabeam.com`
   - Click "Add Domain"
   - Note the provided CNAME/A record values

2. **Configure DNS at Hostinger**
   - Log in to your Hostinger account
   - Go to Domain management
   - Select vedabeam.com
   - Go to DNS Zone settings
   
   **Add these records:**
   ```
   Type: A
   Name: @
   Value: [Railway provided IP address]
   TTL: 300
   
   Type: CNAME
   Name: www
   Value: [your-app].railway.app
   TTL: 300
   ```

3. **SSL Certificate Setup**
   - Railway automatically provisions SSL certificates
   - Wait 5-10 minutes for DNS propagation
   - Verify HTTPS works: https://vedabeam.com

### Phase 5: Testing & Verification (10 minutes)

1. **Functionality Testing**
   - [ ] Landing page loads correctly
   - [ ] VedaBeam logo displays properly
   - [ ] Waitlist form accepts email submissions
   - [ ] Success/error messages work
   - [ ] Mobile responsiveness works
   - [ ] All links and buttons function

2. **Performance Testing**
   - [ ] Page load time < 3 seconds
   - [ ] Health check endpoint responds: `/health`
   - [ ] Server logs show no errors
   - [ ] Form submissions are logged

3. **SEO & Analytics Setup**
   - [ ] Meta tags are properly set
   - [ ] Open Graph tags work (test with social media)
   - [ ] Google Analytics tracking code (if configured)
   - [ ] Favicon displays correctly

## 🔧 Troubleshooting

### Common Issues

**1. Build Fails**
- Check package.json for correct dependencies
- Verify Node.js version compatibility
- Review Railway build logs for specific errors

**2. Domain Not Working**
- Verify DNS records are correctly configured
- Wait for DNS propagation (up to 24 hours)
- Check Railway domain configuration

**3. Form Not Submitting**
- Check server logs in Railway dashboard
- Verify `/api/waitlist` endpoint is working
- Test with browser developer tools

**4. Images Not Loading**
- Ensure assets are in `/public/assets/` directory
- Check file paths in HTML
- Verify images were uploaded to GitHub

### Debug Commands

```bash
# Test locally before deployment
npm install
npm start

# Check server health
curl https://vedabeam.com/health

# Test waitlist endpoint
curl -X POST https://vedabeam.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

## 📊 Monitoring Setup

### Railway Monitoring
- **Metrics**: Available in Railway dashboard
- **Logs**: Real-time server logs
- **Uptime**: Automatic health check monitoring
- **Alerts**: Configure via Railway settings

### Google Analytics (Optional)
1. Create Google Analytics account
2. Get tracking ID
3. Add to HTML head section
4. Configure conversion tracking for waitlist signups

### Performance Monitoring
- Use Railway's built-in metrics
- Monitor response times and error rates
- Set up uptime monitoring (UptimeRobot free tier)

## 🚀 Post-Deployment Checklist

- [ ] **Domain Working**: vedabeam.com loads correctly
- [ ] **HTTPS Enabled**: SSL certificate active
- [ ] **Form Functional**: Waitlist submissions work
- [ ] **Mobile Optimized**: Responsive design works
- [ ] **Analytics Tracking**: Events are being recorded
- [ ] **SEO Optimized**: Meta tags and sitemap configured
- [ ] **Performance**: Page load time < 3 seconds
- [ ] **Monitoring**: Health checks and alerts configured

## 🔄 Updates & Maintenance

### Deploying Updates
```bash
# Make changes to your code
git add .
git commit -m "Update landing page content"
git push origin main

# Railway will automatically redeploy
```

### Monitoring Performance
- Check Railway dashboard weekly
- Monitor waitlist conversion rates
- Review server logs for errors
- Update content based on user feedback

### Scaling Considerations
- Railway free tier supports moderate traffic
- Upgrade to paid tier when needed
- Consider CDN for global performance
- Implement caching for high traffic

## 📞 Support Resources

- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **Railway Community**: Discord server
- **Hostinger Support**: Domain and DNS issues
- **GitHub Issues**: Repository-specific problems

## 🎉 Success Metrics

Track these metrics to measure landing page success:

- **Waitlist Signups**: Target 15-25% conversion rate
- **Page Load Time**: Keep under 3 seconds
- **Bounce Rate**: Aim for under 60%
- **Mobile Traffic**: Ensure mobile optimization
- **Uptime**: Maintain 99.9% availability

---

**Congratulations!** Your VedaBeam landing page is now live at vedabeam.com and ready to capture early adopters for your behavioral intelligence platform.

