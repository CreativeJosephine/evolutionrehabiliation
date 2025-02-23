// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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
