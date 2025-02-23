class FeatureCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const icon = this.getAttribute('icon');
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: var(--card-bg, white);
                    border-radius: 12px;
                    padding: 2rem;
                    transition: transform 0.3s ease;
                }

                :host(:hover) {
                    transform: translateY(-5px);
                }

                .icon {
                    font-size: 2.5rem;
                    color: var(--accent-color);
                    margin-bottom: 1rem;
                }

                h3 {
                    margin: 0 0 1rem;
                    color: var(--text-color);
                }

                p {
                    margin: 0;
                    color: var(--text-muted);
                    line-height: 1.6;
                }
            </style>

            <i class="fas ${icon} icon"></i>
            <h3>${title}</h3>
            <p>${description}</p>
            <slot></slot>
        `;
    }
}

customElements.define('feature-card', FeatureCard); 
