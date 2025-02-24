const critical = require('critical');
const fs = require('fs');
const path = require('path');

async function extractCriticalCSS() {
    const pages = [
        { url: 'index.html', name: 'home' },
        { url: 'about.html', name: 'about' },
        { url: 'services.html', name: 'services' },
        { url: 'contact.html', name: 'contact' }
    ];

    for (const page of pages) {
        try {
            const result = await critical.generate({
                inline: false,
                base: 'public/',
                src: page.url,
                target: `css/critical-${page.name}.css`,
                width: [320, 1200],
                height: [800, 1200],
                ignore: {
                    atrule: ['@font-face']
                },
                dimensions: [
                    {
                        height: 800,
                        width: 320
                    },
                    {
                        height: 1200,
                        width: 1200
                    }
                ]
            });

            console.log(`Critical CSS extracted for ${page.name}`);
        } catch (err) {
            console.error(`Error extracting critical CSS for ${page.name}:`, err);
        }
    }
}

extractCriticalCSS(); 