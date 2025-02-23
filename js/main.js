<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Meta Description for SEO -->
    <meta name="description" content="Healing Minds provides personalized psychosocial rehabilitation services to empower individuals.">
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Healing Minds | Psychosocial Rehabilitation Services">
    <meta property="og:description" content="Healing Minds provides personalized psychosocial rehabilitation services to empower individuals.">
    <meta property="og:image" content="images/og-image.jpg">
    <meta property="og:url" content="https://www.healingminds.com">
    <meta property="og:type" content="website">
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Healing Minds | Psychosocial Rehabilitation Services">
    <meta name="twitter:description" content="Healing Minds provides personalized psychosocial rehabilitation services to empower individuals.">
    <meta name="twitter:image" content="images/twitter-card.jpg">
    
    <title>Healing Minds | Psychosocial Rehabilitation Services</title>
    
    <!-- Preload critical assets -->
    <link rel="preload" href="css/styles.css" as="style">
    <link rel="preload" href="js/main.js" as="script">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    
    <!-- External Stylesheets -->
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <!-- Favicon -->
    <link rel="icon" href="images/favicon.ico">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">

    <!-- Preload critical fonts -->
    <link 
        rel="preload" 
        href="/fonts/inter-var.woff2" 
        as="font" 
        type="font/woff2" 
        crossorigin
    >

    <!-- Preconnect to external resources -->
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
</head>
<body>
    <!-- Skip to main content link for accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Header with Accessible Navigation -->
    <header role="banner">
        <nav class="navbar" role="navigation" aria-label="Main Navigation">
            <div class="nav-container">
                <div class="logo">
                    <!-- Fallback text in case image fails to load -->
                    <a href="index.html" class="logo-link">
                        <img 
                            src="placeholder.jpg" 
                            data-src="actual-image.jpg" 
                            loading="lazy" 
                            class="lazy"
                            alt="Healing Minds Logo"
                            width="150" height="50" 
                             onerror="this.onerror=null; this.parentElement.innerHTML='Healing Minds';">
                    </a>
                </div>
                
                <ul class="nav-links">
                    <li><a href="index.html" class="active" aria-current="page">Home</a></li>
                    <li><a href="#" class="services-trigger">Services</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>

                <div class="nav-right">
                    <div class="language-selector">
                        <select aria-label="Select language" onchange="changeLanguage(this.value)">
                            <option value="en">EN</option>
                            <option value="es">ES</option>
                            <option value="fr">FR</option>
                        </select>
                    </div>
                    
                    <button class="burger" aria-label="Toggle navigation" aria-expanded="false">
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                    </button>
                </div>
            </div>
        </nav>
        <!-- Add after header -->
        <nav aria-label="Breadcrumb" class="breadcrumb">
            <ol>
                <li><a href="/">Home</a></li>
                <li aria-current="page">Current Page</li>
            </ol>
        </nav>
    </header>

    <!-- Main Content Area -->
    <main role="main" id="main-content">
        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-background"></div>
            <div class="hero-content">
                <h1 class="hero-title">
                    Transform Your Life With 
                    <span class="highlight">Professional Support</span>
                </h1>
                <p class="hero-subtitle">
                    Begin your journey to wellness with personalized psychosocial rehabilitation services. 
                    Our expert team is here to support and guide you every step of the way.
                </p>
                <div class="hero-buttons">
                    <a href="#contact" class="primary-button" role="button">
                        Start Your Journey
                        <span class="sr-only">Begin your wellness journey now</span>
                    </a>
                    <a href="#services" class="secondary-button">Explore Services</a>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="features" aria-labelledby="services-heading">
            <div class="container">
                <h2 id="services-heading">Our Services</h2>
                <div class="feature-grid">
                    <article class="feature-card">
                        <i class="fas fa-brain" aria-hidden="true"></i>
                        <h3>Cognitive Skills Training</h3>
                        <p>Enhance mental functioning and problem-solving abilities through evidence-based techniques and personalized strategies.</p>
                        <a href="services/cognitive.html" class="learn-more">
                            Learn More
                            <span class="sr-only">about Cognitive Skills Training</span>
                        </a>
                    </article>

                    <article class="feature-card">
                        <i class="fas fa-users" aria-hidden="true"></i>
                        <h3>Social Skills Development</h3>
                        <p>Build meaningful relationships and improve communication through structured programs and guided practice.</p>
                        <a href="services/social.html" class="learn-more">
                            Learn More
                            <span class="sr-only">about Social Skills Development</span>
                        </a>
                    </article>

                    <article class="feature-card">
                        <i class="fas fa-home" aria-hidden="true"></i>
                        <h3>Independent Living Skills</h3>
                        <p>Develop essential life skills for greater autonomy and confidence in daily activities and responsibilities.</p>
                        <a href="services/independent.html" class="learn-more">
                            Learn More
                            <span class="sr-only">about Independent Living Skills</span>
                        </a>
                    </article>

                    <article class="feature-card">
                        <i class="fas fa-heart" aria-hidden="true"></i>
                        <h3>Emotional Support</h3>
                        <p>Navigate life's challenges with professional guidance and evidence-based emotional wellness strategies.</p>
                        <a href="services/emotional.html" class="learn-more">
                            Learn More
                            <span class="sr-only">about Emotional Support</span>
                        </a>
                    </article>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="testimonials" aria-labelledby="testimonials-heading">
            <h2 id="testimonials-heading">What Our Clients Say</h2>
            <div class="testimonial-carousel">
                <div class="testimonial">
                    <blockquote>
                        <p>"The support I received from Healing Minds transformed my life."</p>
                        <footer>- Sarah M.</footer>
                    </blockquote>
                </div>
                <!-- Add more testimonials -->
            </div>
        </section>
    </main>

    <!-- Newsletter Section -->
    <section class="newsletter" aria-labelledby="newsletter-heading">
        <div class="container">
            <h2 id="newsletter-heading">Stay Updated with Our Newsletter</h2>
            <form action="/subscribe" method="POST" class="newsletter-form">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        placeholder="Enter your email"
                        aria-describedby="email-help"
                    >
                    <small id="email-help">We'll never share your email with anyone else.</small>
                </div>
                <button type="submit">
                    <span>Subscribe</span>
                    <i class="fas fa-paper-plane" aria-hidden="true"></i>
                </button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer role="contentinfo">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Contact Us</h3>
                <address>
                    <p>Email: <a href="mailto:info@healingminds.com">info@healingminds.com</a></p>
                    <p>Phone: <a href="tel:+15551234567">(555) 123-4567</a></p>
                    <p>Address: 123 Healing Street, Mindful City, MC 12345</p>
                </address>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                    <li><a href="terms.html">Terms of Service</a></li>
                    <li><a href="accessibility.html">Accessibility Statement</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Resources</h3>
                <ul>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="faq.html">FAQs</a></li>
                    <li><a href="resources.html">Helpful Resources</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <span id="current-year">2024</span> Healing Minds. All rights reserved.</p>
        </div>
    </footer>

    <!-- Load JavaScript with defer for improved performance -->
    <script src="js/main.js" defer></script>

    <!-- Add this after the opening body tag -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Healing Minds",
      "description": "Psychosocial rehabilitation services provider",
      "url": "https://www.healingminds.com",
      "telephone": "+15551234567",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Healing Street",
        "addressLocality": "Mindful City",
        "postalCode": "12345",
        "addressCountry": "US"
      },
      "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00"
    }
    </script>

    <!-- Add before closing body tag -->
    <div class="cookie-banner" id="cookieBanner">
        <p>We use cookies to improve your experience. By continuing to use our site, you agree to our 
            <a href="privacy.html">Privacy Policy</a>.</p>
        <button class="accept-cookies">Accept</button>
    </div>

    <!-- Add before closing body tag -->
    <button id="backToTop" aria-label="Back to top" class="back-to-top">
        <i class="fas fa-arrow-up" aria-hidden="true"></i>
    </button>

    <!-- Add before closing body tag -->
    <div id="chat-widget" class="chat-widget" aria-live="polite">
        <button class="chat-toggle" aria-expanded="false">
            <span class="sr-only">Toggle chat</span>
            <i class="fas fa-comments" aria-hidden="true"></i>
        </button>
        <div class="chat-container" hidden>
            <!-- Chat interface will be loaded here -->
        </div>
    </div>

    <!-- Add after the chat-widget div and before closing body tag -->
    <div id="welcomePopup" class="popup-overlay">
        <div class="popup-content" role="dialog" aria-labelledby="welcomeTitle">
            <button class="close-popup" aria-label="Close popup">&times;</button>
            <h2 id="welcomeTitle">Welcome to Healing Minds</h2>
            <p>We're here to support your journey to wellness. Would you like to:</p>
            <div class="popup-buttons">
                <a href="services.html" class="popup-button">Explore Services</a>
                <a href="contact.html" class="popup-button">Schedule Consultation</a>
            </div>
        </div>
    </div>

    <!-- Add after the welcome popup -->
    <div id="consultationPopup" class="popup-overlay">
        <div class="popup-content" role="dialog" aria-labelledby="consultationTitle">
            <button class="close-popup" aria-label="Close popup">&times;</button>
            <h2 id="consultationTitle">Book a Free Consultation</h2>
            <form id="consultationForm" class="popup-form">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="popup-email">Email</label>
                    <input type="email" id="popup-email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="preferred-time">Preferred Time</label>
                    <input type="datetime-local" id="preferred-time" name="preferred-time" required>
                </div>
                <button type="submit" class="popup-button">Schedule Now</button>
            </form>
        </div>
    </div>

    <div class="scroll-progress"></div>

    <!-- Update the Services Popup section -->
    <div id="servicesPopup" class="popup-overlay services-popup">
        <div class="popup-content" role="dialog" aria-labelledby="servicesTitle">
            <button class="close-popup" aria-label="Close popup">&times;</button>
            <h2 id="servicesTitle">Our Services</h2>
            <div class="services-grid">
                <a href="services/service-a.html" class="service-card">
                    <i class="fas fa-star" aria-hidden="true"></i>
                    <h3>Service A</h3>
                    <p>Comprehensive support for mental health and wellness through personalized therapy sessions.</p>
                    <span class="learn-more">Learn More →</span>
                </a>
                
                <a href="services/service-b.html" class="service-card">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                    <h3>Service B</h3>
                    <p>Group therapy sessions focused on building social connections and support networks.</p>
                    <span class="learn-more">Learn More →</span>
                </a>
                
                <a href="services/service-c.html" class="service-card">
                    <i class="fas fa-hands-helping" aria-hidden="true"></i>
                    <h3>Service C</h3>
                    <p>Family counseling and support services to strengthen relationships and communication.</p>
                    <span class="learn-more">Learn More →</span>
                </a>
                
                <a href="services/service-d.html" class="service-card">
                    <i class="fas fa-brain" aria-hidden="true"></i>
                    <h3>Service D</h3>
                    <p>Specialized cognitive behavioral therapy for managing anxiety and stress.</p>
                    <span class="learn-more">Learn More →</span>
                </a>
            </div>
        </div>
    </div>
</body>
</html> 
