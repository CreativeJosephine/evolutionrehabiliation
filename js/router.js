class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;
        
        window.addEventListener('popstate', this.handleRoute.bind(this));
        document.addEventListener('click', this.handleClick.bind(this));
    }

    async handleRoute() {
        const path = window.location.pathname;
        const route = this.routes.find(r => r.path === path);
        
        if (route) {
            if (this.currentRoute && this.currentRoute.unmount) {
                await this.currentRoute.unmount();
            }

            this.currentRoute = route;
            const content = await route.component();
            document.getElementById('app').innerHTML = content;
            
            if (route.mount) {
                await route.mount();
            }
        }
    }

    handleClick(e) {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            this.navigate(e.target.href);
        }
    }

    navigate(url) {
        window.history.pushState(null, '', url);
        this.handleRoute();
    }
} 
