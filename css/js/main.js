// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');
    
    // Update aria-expanded
    burger.setAttribute('aria-expanded', 
        burger.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
    );
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Animate Burger
    burger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.burger')) {
        nav.classList.remove('nav-active');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
    }
});

// Add scroll class to navbar
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const headerOffset = 80; // Height of your fixed header

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty links
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, '', targetId);
            }
        });
    });

    // Handle initial hash in URL
    if (window.location.hash) {
        const initialTarget = document.querySelector(window.location.hash);
        if (initialTarget) {
            setTimeout(() => {
                const elementPosition = initialTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// Add active state to navigation links while scrolling
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollPosition = window.pageYOffset + 100; // Offset for better trigger point

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add scroll animation for features
window.addEventListener('scroll', () => {
    const features = document.querySelectorAll('.feature-card');
    features.forEach(feature => {
        const featurePosition = feature.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (featurePosition < screenPosition) {
            feature.classList.add('animate');
        }
    });
});

// Popup Management
class PopupManager {
    constructor() {
        this.popups = document.querySelectorAll('.popup-overlay');
        this.closeButtons = document.querySelectorAll('.close-popup');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close button listeners
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => this.closePopup(button.closest('.popup-overlay')));
        });

        // Close on outside click
        this.popups.forEach(popup => {
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    this.closePopup(popup);
                }
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllPopups();
            }
        });
    }

    showPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    closePopup(popup) {
        popup.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    closeAllPopups() {
        this.popups.forEach(popup => this.closePopup(popup));
    }
}

// Initialize popup manager
const popupManager = new PopupManager();

// Show welcome popup after 3 seconds for new visitors
if (!localStorage.getItem('welcomeShown')) {
    setTimeout(() => {
        popupManager.showPopup('welcomePopup');
        localStorage.setItem('welcomeShown', 'true');
    }, 3000);
}

// Handle consultation form submission
const consultationForm = document.getElementById('consultationForm');
if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you! We will contact you shortly to confirm your consultation.');
        popupManager.closeAllPopups();
    });
}

// Show consultation popup when "Get Started" is clicked
document.querySelector('.cta-button').addEventListener('click', (e) => {
    e.preventDefault();
    popupManager.showPopup('consultationPopup');
});

// Smooth scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-fade-up').forEach((element) => {
    observer.observe(element);
});

// Journey Button Click Handler
const journeyButton = document.querySelector('.primary-button');
if (journeyButton) {
    journeyButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default navigation
        
        // Show a custom styled alert using the existing popup system
        const message = "Thank you for taking the first step! We'll guide you through your journey to wellness.";
        
        // Create and show a custom alert popup
        const alertHtml = `
            <div id="alertPopup" class="popup-overlay">
                <div class="popup-content" role="alert">
                    <button class="close-popup" aria-label="Close alert">&times;</button>
                    <div class="alert-content">
                        <i class="fas fa-heart" aria-hidden="true"></i>
                        <h2>Welcome!</h2>
                        <p>${message}</p>
                        <button class="popup-button continue-button">Continue</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add the alert to the DOM
        document.body.insertAdjacentHTML('beforeend', alertHtml);
        
        // Show the alert
        const alertPopup = document.getElementById('alertPopup');
        alertPopup.style.display = 'block';
        
        // Handle close button
        const closeButton = alertPopup.querySelector('.close-popup');
        const continueButton = alertPopup.querySelector('.continue-button');
        
        const closeAlert = () => {
            alertPopup.style.display = 'none';
            alertPopup.remove();
            // Redirect to contact page after closing
            window.location.href = 'contact.html';
        };
        
        closeButton.addEventListener('click', closeAlert);
        continueButton.addEventListener('click', closeAlert);
    });
}

// Form error handling
const handleFormError = (form, error) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = error;
    form.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
};

// Services Popup Handler - Simplified Version
document.addEventListener('DOMContentLoaded', () => {
    const servicesLink = document.querySelector('.services-trigger');
    const servicesPopup = document.getElementById('servicesPopup');
    const closeButtons = document.querySelectorAll('.close-popup');

    if (servicesLink && servicesPopup) {
        // Open popup
        servicesLink.addEventListener('click', (e) => {
            e.preventDefault();
            servicesPopup.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        // Close popup with close button
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                servicesPopup.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            });
        });

        // Close popup when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === servicesPopup) {
                servicesPopup.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        // Close popup with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && servicesPopup.style.display === 'block') {
                servicesPopup.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
});

// Track service clicks for analytics
const trackServiceClick = (serviceName) => {
    // Add your analytics code here
    console.log(`Service clicked: ${serviceName}`);
};

// Add lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll("img[loading='lazy']");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Form validation and error handling
const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Submission failed');
        
        showSuccessMessage('Thank you for your message!');
    } catch (error) {
        showErrorMessage('Sorry, there was an error. Please try again.');
    }
};

// Add to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
});

// Feature detection and fallbacks
const supportsIntersectionObserver = 'IntersectionObserver' in window;
if (!supportsIntersectionObserver) {
    // Fallback for older browsers
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = 1;
    });
}

// Basic analytics tracking
const trackEvent = (category, action, label) => {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
};

// Usage
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
        trackEvent('Features', 'click', card.querySelector('h3').textContent);
    });
});

// Add loading states to buttons
const addLoadingState = (button) => {
    button.innerHTML = `
        <span class="spinner"></span>
        <span class="sr-only">Loading...</span>
    `;
    button.disabled = true;
};

const removeLoadingState = (button, originalText) => {
    button.innerHTML = originalText;
    button.disabled = false;
};

// Advanced form validation
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        const value = input.value.trim();
        const type = input.type;

        switch(type) {
            case 'email':
                if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                    showError(input, 'Please enter a valid email address');
                    isValid = false;
                }
                break;
            case 'tel':
                if (!value.match(/^\+?[\d\s-]{10,}$/)) {
                    showError(input, 'Please enter a valid phone number');
                    isValid = false;
                }
                break;
            // Add more validations as needed
        }
    });

    return isValid;
};

// Advanced animation system
class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            threshold: 0.2,
            rootMargin: '50px'
        });
    }

    addAnimation(element, animation) {
        this.animations.set(element, animation);
        this.observer.observe(element);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = this.animations.get(entry.target);
                animation();
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Global error handling
window.onerror = function(msg, url, lineNo, columnNo, error) {
    const errorDetails = {
        message: msg,
        url: url,
        line: lineNo,
        column: columnNo,
        error: error?.stack,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    };

    // Log to your error tracking service
    console.error('Global error:', errorDetails);
    
    // Show user-friendly error message
    showErrorMessage('Something went wrong. Please try again later.');

    return false;
};

// Performance monitoring
const performanceMonitor = {
    metrics: {},
    
    measure(name, startMark, endMark) {
        performance.measure(name, startMark, endMark);
        const measures = performance.getEntriesByName(name);
        this.metrics[name] = measures[measures.length - 1].duration;
    },

    logMetrics() {
        console.table(this.metrics);
    }
};

// User preferences manager
const UserPreferences = {
    preferences: JSON.parse(localStorage.getItem('userPreferences')) || {},

    set(key, value) {
        this.preferences[key] = value;
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
        this.applyPreferences();
    },

    applyPreferences() {
        // Apply theme
        if (this.preferences.theme) {
            document.documentElement.setAttribute('data-theme', this.preferences.theme);
        }
        
        // Apply font size
        if (this.preferences.fontSize) {
            document.documentElement.style.fontSize = this.preferences.fontSize;
        }
    }
};

import { FormHandler } from './utils/form-handler.js';
import { LanguageManager } from './utils/language-manager.js';

// Initialize form handlers
document.addEventListener('DOMContentLoaded', () => {
    // Contact form
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        new FormHandler(contactForm);
    }

    // Consultation form
    const consultationForm = document.querySelector('#consultationForm');
    if (consultationForm) {
        new FormHandler(consultationForm);
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        new FormHandler(newsletterForm);
    }

    // Initialize language manager
    const langManager = new LanguageManager();
});

// Import the testimonial slider
import './components/testimonial-slider.js';

// Import the FAQ accordion
import './components/faq-accordion.js';

// Import the chat widget
import './components/chat-widget.js'; 