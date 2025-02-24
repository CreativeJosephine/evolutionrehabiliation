export class FAQAccordion extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .faq-item {
                    margin-bottom: 1rem;
                    border: 1px solid var(--secondary-color);
                    border-radius: var(--border-radius);
                    overflow: hidden;
                }

                .question {
                    padding: 1.5rem;
                    background: var(--background-light);
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: background-color 0.3s ease;
                }

                .question:hover {
                    background: var(--secondary-color);
                }

                .question h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    color: var(--text-color);
                }

                .icon {
                    width: 20px;
                    height: 20px;
                    position: relative;
                    transition: transform 0.3s ease;
                }

                .icon::before,
                .icon::after {
                    content: '';
                    position: absolute;
                    background: var(--primary-color);
                    border-radius: 2px;
                }

                .icon::before {
                    width: 2px;
                    height: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .icon::after {
                    width: 100%;
                    height: 2px;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .answer {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-out;
                    background: white;
                }

                .answer-content {
                    padding: 1.5rem;
                    color: var(--text-color);
                    line-height: 1.6;
                }

                .faq-item.active .icon {
                    transform: rotate(45deg);
                }

                .faq-item.active .answer {
                    max-height: 500px;
                    transition: max-height 0.5s ease-in;
                }

                @media (max-width: 768px) {
                    .question {
                        padding: 1rem;
                    }

                    .answer-content {
                        padding: 1rem;
                    }
                }
            </style>
            <slot></slot>
        `;
    }

    setupEventListeners() {
        const questions = this.querySelectorAll('.question');
        
        questions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.closest('.faq-item');
                this.toggleAnswer(item);
            });

            // Add keyboard support
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const item = question.closest('.faq-item');
                    this.toggleAnswer(item);
                }
            });
        });
    }

    toggleAnswer(item) {
        const isOpen = item.classList.contains('active');
        
        // Close all other items
        this.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.question').setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
        item.querySelector('.question').setAttribute('aria-expanded', (!isOpen).toString());
    }
}

customElements.define('faq-accordion', FAQAccordion); 