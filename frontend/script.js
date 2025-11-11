// Enhanced script.js with all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initDarkMode();
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initProjectFiltering();
    initScrollAnimations();
    initLazyLoading();
    initSkillAnimations();
});

// Dark mode functionality
function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    themeToggle?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
}

// Mobile menu toggle functionality
function initMobileMenu() {
    const mobileMenuButtons = document.querySelectorAll('custom-navbar');
    mobileMenuButtons.forEach(nav => {
        const mobileMenuButton = nav.shadowRoot?.querySelector('.mobile-menu-button');
        const navLinks = nav.shadowRoot?.querySelector('.nav-links');
        
        if (mobileMenuButton && navLinks) {
            mobileMenuButton.addEventListener('click', function() {
                const isHidden = navLinks.style.display === 'none' || !navLinks.style.display;
                
                if (isHidden) {
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.backgroundColor = 'white';
                    navLinks.style.padding = '1rem';
                    navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    navLinks.style.gap = '0';
                    
                    // Style individual links for mobile
                    const links = navLinks.querySelectorAll('.nav-link');
                    links.forEach(link => {
                        link.style.padding = '0.75rem 1rem';
                        link.style.width = '100%';
                    });
                } else {
                    navLinks.style.display = 'none';
                }
            });
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Contact form validation and submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Reset errors and messages
            document.querySelectorAll('[id$="Error"]').forEach(el => {
                el.classList.add('hidden');
            });
            document.getElementById('successMessage').classList.add('hidden');
            document.getElementById('errorMessage').classList.add('hidden');
            
            // Validate form
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                document.getElementById('nameError').classList.remove('hidden');
                isValid = false;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                document.getElementById('emailError').classList.remove('hidden');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                document.getElementById('messageError').classList.remove('hidden');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const spinner = document.getElementById('spinner');
                const submitText = document.getElementById('submitText');
                
                submitBtn.disabled = true;
                spinner.classList.remove('hidden');
                submitText.textContent = 'Sending...';
                
                try {
                    // Prepare form data
                    const formData = new FormData(contactForm);
                    const data = Object.fromEntries(formData);
                    
                    // Send to backend
                    const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        // Show success message
                        contactForm.reset();
                        document.getElementById('successMessage').classList.remove('hidden');
                    } else {
                        throw new Error(result.message || 'Failed to send message');
                    }
                } catch (error) {
                    console.error('Contact form error:', error);
                    document.getElementById('errorMessage').classList.remove('hidden');
                } finally {
                    // Reset button state
                    submitBtn.disabled = false;
                    spinner.classList.add('hidden');
                    submitText.textContent = 'Send Message';
                }
            }
        });
    }
}

// Project filtering functionality
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            });
            this.classList.add('active', 'bg-blue-600', 'text-white');
            this.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-card, .project-card, .education-item').forEach(el => {
        observer.observe(el);
    });
}

// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Remove loading skeleton once image is loaded
                img.addEventListener('load', () => {
                    img.classList.remove('loading-skeleton');
                });
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Animate skill bars on scroll
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('style').split('width: ')[1];
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[09]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    // Add loading state
    if (!img.complete) {
        img.classList.add('loading');
    }
});

// Global utility functions
window.utils = {
    // Debounce function for performance
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Format date
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause non-essential animations
    } else {
        // Page is visible, resume animations
    }
});

// Contact form validation and submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Reset errors and messages
            document.querySelectorAll('[id$="Error"]').forEach(el => {
                el.classList.add('hidden');
            });
            document.getElementById('successMessage').classList.add('hidden');
            document.getElementById('errorMessage').classList.add('hidden');
            
            // Validate form
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                document.getElementById('nameError').classList.remove('hidden');
                isValid = false;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                document.getElementById('emailError').classList.remove('hidden');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                document.getElementById('messageError').classList.remove('hidden');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const spinner = document.getElementById('spinner');
                const submitText = document.getElementById('submitText');
                
                submitBtn.disabled = true;
                spinner.classList.remove('hidden');
                submitText.textContent = 'Sending...';
                
                try {
                    // Prepare form data
                    const formData = new FormData(contactForm);
                    const data = Object.fromEntries(formData);
                    
                    // Send to Formspree
                    const response = await fetch('https://formspree.io/f/xjkjvebg', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });
                    
                    if (response.ok) {
                        // Show success message
                        contactForm.reset();
                        document.getElementById('successMessage').classList.remove('hidden');
                        
                        console.log('✅ Contact form submitted successfully via Formspree:', data);
                    } else {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to send message');
                    }
                } catch (error) {
                    console.error('❌ Contact form error:', error);
                    document.getElementById('errorMessage').classList.remove('hidden');
                } finally {
                    // Reset button state
                    submitBtn.disabled = false;
                    spinner.classList.add('hidden');
                    submitText.textContent = 'Send Message';
                }
            }
        });
    }
}

