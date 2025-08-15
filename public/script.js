// VedaBeam Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waitlist-form');
    const emailInput = document.getElementById('email-input');
    const nameInput = document.getElementById('name-input');
    const submitButton = form.querySelector('.cta-button');
    const messageDiv = document.getElementById('form-message');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const name = nameInput.value.trim();
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Disable form during submission
        setFormLoading(true);
        
        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                showMessage(data.message || 'Thank you for joining the VedaBeam waitlist! We\'ll be in touch soon.', 'success');
                form.reset();
                
                // Track successful signup
                trackWaitlistSignup(email, name);
            } else {
                showMessage(data.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Waitlist signup error:', error);
            showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            setFormLoading(false);
        }
    });
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show success/error messages
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
    
    // Set form loading state
    function setFormLoading(loading) {
        submitButton.disabled = loading;
        submitButton.textContent = loading ? 'Joining...' : 'Join Waitlist';
        submitButton.style.opacity = loading ? '0.7' : '1';
        submitButton.style.cursor = loading ? 'not-allowed' : 'pointer';
        emailInput.disabled = loading;
        nameInput.disabled = loading;
    }
    
    // Auto-focus name input after valid email
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && isValidEmail(email)) {
            this.style.borderColor = '#10B981';
            setTimeout(() => nameInput.focus(), 100);
        } else if (email) {
            this.style.borderColor = '#EF4444';
        } else {
            this.style.borderColor = '#E2E8F0';
        }
    });
    
    // Track waitlist signups (for analytics)
    function trackWaitlistSignup(email, name) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'waitlist_signup', {
                'event_category': 'engagement',
                'event_label': 'landing_page',
                'value': 1
            });
        }
        
        // Console log for development
        console.log('Waitlist signup tracked:', { email, name, timestamp: new Date().toISOString() });
    }
    
    // Reset border color on focus
    emailInput.addEventListener('focus', function() {
        this.style.borderColor = '#4C1D95';
    });
    
    nameInput.addEventListener('focus', function() {
        this.style.borderColor = '#4C1D95';
    });
    
    // Smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation to floating elements
    const floatingElements = document.querySelector('.floating-elements');
    if (floatingElements) {
        // Add more floating elements dynamically
        for (let i = 0; i < 3; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.cssText = `
                position: absolute;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 50%;
                top: ${Math.random() * 80}%;
                left: ${Math.random() * 80}%;
                animation: float ${Math.random() * 4 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            floatingElements.appendChild(element);
        }
    }
});

// Service Worker registration for PWA capabilities (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

