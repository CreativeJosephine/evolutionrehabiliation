class ResponsiveImage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const src = this.getAttribute('src');
        const alt = this.getAttribute('alt');
        const sizes = this.getAttribute('sizes') || '100vw';
        const lazy = this.hasAttribute('lazy');

        // Generate srcset for different sizes
        const srcset = this.generateSrcset(src);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                img {
                    width: 100%;
                    height: auto;
                    display: block;
                }
                .placeholder {
                    background: #f0f0f0;
                    width: 100%;
                    height: 0;
                    padding-bottom: 56.25%; /* 16:9 aspect ratio */
                    position: relative;
                }
            </style>
            <picture>
                <source type="image/webp" srcset="${srcset.webp}" sizes="${sizes}">
                <source type="image/jpeg" srcset="${srcset.jpeg}" sizes="${sizes}">
                <img 
                    src="${src}" 
                    alt="${alt}"
                    ${lazy ? 'loading="lazy"' : ''}
                    decoding="async"
                    onload="this.classList.add('loaded')"
                >
            </picture>
        `;
    }

    generateSrcset(src) {
        const widths = [320, 640, 960, 1280, 1920];
        const baseUrl = src.split('.')[0];

        return {
            webp: widths.map(w => `${baseUrl}-${w}.webp ${w}w`).join(', '),
            jpeg: widths.map(w => `${baseUrl}-${w}.jpg ${w}w`).join(', ')
        };
    }
}

customElements.define('responsive-image', ResponsiveImage); 