class StateManager {
    constructor() {
        this.state = {};
        this.subscribers = new Map();
    }

    setState(key, value) {
        this.state[key] = value;
        this.notify(key);
    }

    getState(key) {
        return this.state[key];
    }

    subscribe(key, callback) {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, new Set());
        }
        this.subscribers.get(key).add(callback);
    }

    unsubscribe(key, callback) {
        if (this.subscribers.has(key)) {
            this.subscribers.get(key).delete(callback);
        }
    }

    notify(key) {
        if (this.subscribers.has(key)) {
            this.subscribers.get(key).forEach(callback => {
                callback(this.state[key]);
            });
        }
    }
}

const appState = new StateManager();
export default appState; 
