import { translations } from './translations.js';

export class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 
                          navigator.language.split('-')[0] || 
                          'en';
        this.translations = translations;
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang);
        
        // Setup language selector
        const langSelector = document.querySelector('.language-selector select');
        if (langSelector) {
            langSelector.value = this.currentLang;
            langSelector.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language ${lang} not supported, falling back to English`);
            lang = 'en';
        }

        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.setAttribute('lang', lang);
        this.updateContent();
    }

    updateContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update meta tags
        this.updateMetaTags();
    }

    getTranslation(key) {
        return key.split('.').reduce((obj, k) => obj && obj[k], this.translations[this.currentLang]);
    }

    updateMetaTags() {
        const metaDescription = document.querySelector('meta[name="description"]');
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        
        if (metaDescription) {
            metaDescription.content = this.getTranslation('meta.description');
        }
        if (ogTitle) {
            ogTitle.content = this.getTranslation('meta.ogTitle');
        }
        if (ogDescription) {
            ogDescription.content = this.getTranslation('meta.ogDescription');
        }
    }
} 