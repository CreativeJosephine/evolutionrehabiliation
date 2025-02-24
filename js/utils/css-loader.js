export class CSSLoader {
    static loadCSS(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    static async loadNonCriticalCSS() {
        const cssFiles = [
            '/css/animations.css',
            '/css/components.css',
            '/css/utilities.css'
        ];

        try {
            await Promise.all(cssFiles.map(css => this.loadCSS(css)));
            console.log('Non-critical CSS loaded');
        } catch (error) {
            console.error('Error loading non-critical CSS:', error);
        }
    }

    static loadFonts() {
        const fonts = [
            {
                family: 'Inter',
                url: '/fonts/inter-var.woff2',
                descriptors: { weight: '400 700' }
            }
        ];

        fonts.forEach(font => {
            const fontFace = new FontFace(
                font.family,
                `url(${font.url})`,
                font.descriptors
            );

            fontFace.load().then(loadedFace => {
                document.fonts.add(loadedFace);
            });
        });
    }
} 