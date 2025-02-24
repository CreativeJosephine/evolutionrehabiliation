export class CSSPerformanceMonitor {
    static measureCSSLoading() {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
                if (entry.name.endsWith('.css')) {
                    console.log(`CSS Load Timing for ${entry.name}:`, {
                        duration: entry.duration,
                        startTime: entry.startTime,
                        transferSize: entry.transferSize
                    });
                }
            });
        });

        observer.observe({ 
            entryTypes: ['resource'],
            buffered: true
        });
    }

    static measureFirstPaint() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log(`${entry.name}: ${entry.startTime}ms`);
            });
        });

        observer.observe({ 
            entryTypes: ['paint'],
            buffered: true
        });
    }
} 