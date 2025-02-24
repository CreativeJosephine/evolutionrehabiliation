export class ImageLoader {
    static async loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    static preloadImages(srcs) {
        return Promise.all(srcs.map(src => this.loadImage(src)));
    }

    static preloadCriticalImages() {
        const criticalImages = [
            '/images/logo.png',
            '/images/hero-image-640.webp',
            // Add other critical images
        ];
        return this.preloadImages(criticalImages);
    }
} 