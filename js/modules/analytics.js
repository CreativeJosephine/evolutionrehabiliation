class Analytics {
    constructor() {
        this.events = [];
        this.userSession = this.initSession();
    }

    initSession() {
        return {
            id: crypto.randomUUID(),
            startTime: Date.now(),
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            language: navigator.language
        };
    }

    trackEvent(category, action, label = null, value = null) {
        const event = {
            timestamp: Date.now(),
            category,
            action,
            label,
            value,
            path: window.location.pathname,
            sessionId: this.userSession.id
        };

        this.events.push(event);
        this.sendToAnalytics(event);
    }

    trackPageView() {
        this.trackEvent('page', 'view', window.location.pathname);
    }

    async sendToAnalytics(event) {
        try {
            const response = await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });
            
            if (!response.ok) throw new Error('Analytics API error');
        } catch (error) {
            console.error('Analytics Error:', error);
            // Store failed events for retry
            localStorage.setItem('failedAnalytics', 
                JSON.stringify([...this.getFailedEvents(), event])
            );
        }
    }

    getFailedEvents() {
        return JSON.parse(localStorage.getItem('failedAnalytics') || '[]');
    }
} 