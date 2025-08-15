// JavaScript for animations and form submission
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // Waitlist Form Submission
    const form = document.getElementById('waitlist-form');
    const emailInput = document.getElementById('email-input');
    const messageDiv = document.getElementById('form-message');
    const submitButton = form.querySelector('button');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showMessage('Please enter your email address.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Joining...';
        submitButton.disabled = true;

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('🎉 Welcome to VedaBeam! Check your email for confirmation.', 'success');
                emailInput.value = '';
                
                // Track successful signup
                trackWaitlistSignup(email);
            } else {
                showMessage(data.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `mt-4 text-lg font-medium ${
            type === 'success' ? 'text-green-600' : 'text-red-600'
        }`;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'mt-4 text-lg font-medium';
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Track waitlist signups (for analytics)
    function trackWaitlistSignup(email) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'waitlist_signup', {
                'event_category': 'engagement',
                'event_label': 'landing_page',
                'value': 1
            });
        }
        
        // Console log for development
        console.log('Waitlist signup tracked:', { email, timestamp: new Date().toISOString() });
    }

    // Smooth scrolling for anchor links
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

    // Add interactive effects to logo containers
    const logoContainers = document.querySelectorAll('.logo-container');
    logoContainers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Email input validation styling
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && isValidEmail(email)) {
            this.style.borderColor = '#10B981';
        } else if (email) {
            this.style.borderColor = '#EF4444';
        } else {
            this.style.borderColor = '#E5E7EB';
        }
    });

    emailInput.addEventListener('focus', function() {
        this.style.borderColor = '#4F46E5';
    });
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

