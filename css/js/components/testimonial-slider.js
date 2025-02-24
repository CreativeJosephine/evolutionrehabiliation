export class TestimonialSlider extends HTMLElement {
    constructor() {
        super();
        this.currentSlide = 0;
        this.autoplayInterval = null;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupControls();
        this.startAutoplay();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: relative;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .slider-container {
                    position: relative;
                    overflow: hidden;
                    padding: 2rem 0;
                }

                .testimonials-track {
                    display: flex;
                    transition: transform 0.5s ease-in-out;
                }

                .testimonial {
                    flex: 0 0 100%;
                    padding: 2rem;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                    text-align: center;
                }

                .testimonial.active {
                    opacity: 1;
                }

                .testimonial-content {
                    background: var(--background-light);
                    padding: 2rem;
                    border-radius: var(--border-radius);
                    box-shadow: var(--shadow-soft);
                    margin-bottom: 1.5rem;
                    position: relative;
                }

                .testimonial-content::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 10px solid var(--background-light);
                }

                .author-info {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                }

                .author-image {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .author-details {
                    text-align: left;
                }

                .author-name {
                    font-weight: 600;
                    color: var(--text-color);
                    margin: 0;
                }

                .author-title {
                    color: var(--text-muted);
                    font-size: 0.875rem;
                    margin: 0;
                }

                .slider-controls {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 2rem;
                }

                .slider-button {
                    background: none;
                    border: none;
                    padding: 0.5rem;
                    cursor: pointer;
                    color: var(--primary-color);
                    transition: color 0.3s ease;
                }

                .slider-button:hover {
                    color: var(--accent-color);
                }

                .dots {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--secondary-color);
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .dot.active {
                    background: var(--primary-color);
                }

                @media (max-width: 768px) {
                    .testimonial {
                        padding: 1rem;
                    }
                }
            </style>

            <div class="slider-container">
                <div class="testimonials-track">
                    <slot></slot>
                </div>
                
                <div class="slider-controls">
                    <button class="slider-button prev" aria-label="Previous testimonial">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="dots"></div>
                    <button class="slider-button next" aria-label="Next testimonial">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    setupControls() {
        const prevButton = this.shadowRoot.querySelector('.prev');
        const nextButton = this.shadowRoot.querySelector('.next');
        const testimonials = this.querySelectorAll('.testimonial');
        const dotsContainer = this.shadowRoot.querySelector('.dots');

        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        prevButton.addEventListener('click', () => this.prevSlide());
        nextButton.addEventListener('click', () => this.nextSlide());

        this.updateSlide();
    }

    updateSlide() {
        const testimonials = this.querySelectorAll('.testimonial');
        const dots = this.shadowRoot.querySelectorAll('.dot');
        const track = this.shadowRoot.querySelector('.testimonials-track');

        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === this.currentSlide);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }

    prevSlide() {
        const testimonials = this.querySelectorAll('.testimonial');
        this.currentSlide = (this.currentSlide - 1 + testimonials.length) % testimonials.length;
        this.updateSlide();
    }

    nextSlide() {
        const testimonials = this.querySelectorAll('.testimonial');
        this.currentSlide = (this.currentSlide + 1) % testimonials.length;
        this.updateSlide();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    setupKeyboardNavigation() {
        this.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }

    setupTouchNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        this.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                this.nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                this.prevSlide();
            }
        });
    }

    disconnectedCallback() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
}

customElements.define('testimonial-slider', TestimonialSlider); 