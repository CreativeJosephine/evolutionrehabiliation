export class ChatWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.messages = [];
        this.isOpen = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                    font-family: var(--font-family, sans-serif);
                }

                .chat-toggle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--primary-color);
                    border: none;
                    color: white;
                    cursor: pointer;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                }

                .chat-toggle:hover {
                    transform: scale(1.1);
                }

                .chat-container {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    transform-origin: bottom right;
                }

                .chat-container.hidden {
                    transform: scale(0.95);
                    opacity: 0;
                    pointer-events: none;
                }

                .chat-header {
                    background: var(--primary-color);
                    color: white;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .chat-header h3 {
                    margin: 0;
                    font-size: 1.1rem;
                }

                .chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .message {
                    max-width: 80%;
                    padding: 0.8rem;
                    border-radius: 12px;
                    line-height: 1.4;
                }

                .message.user {
                    background: var(--primary-color);
                    color: white;
                    align-self: flex-end;
                    border-bottom-right-radius: 4px;
                }

                .message.bot {
                    background: var(--background-light);
                    color: var(--text-color);
                    align-self: flex-start;
                    border-bottom-left-radius: 4px;
                }

                .chat-input {
                    padding: 1rem;
                    border-top: 1px solid var(--secondary-color);
                    display: flex;
                    gap: 0.5rem;
                }

                input {
                    flex: 1;
                    padding: 0.8rem;
                    border: 1px solid var(--secondary-color);
                    border-radius: 20px;
                    outline: none;
                }

                input:focus {
                    border-color: var(--primary-color);
                }

                .send-button {
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .quick-replies {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }

                .quick-reply {
                    background: var(--background-light);
                    border: 1px solid var(--secondary-color);
                    border-radius: 15px;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: background-color 0.3s ease;
                }

                .quick-reply:hover {
                    background: var(--secondary-color);
                }

                @media (max-width: 480px) {
                    .chat-container {
                        width: calc(100vw - 40px);
                        height: calc(100vh - 100px);
                        bottom: 70px;
                    }
                }
            </style>

            <button class="chat-toggle" aria-label="Toggle chat">
                <i class="fas fa-comments"></i>
            </button>

            <div class="chat-container hidden">
                <div class="chat-header">
                    <h3>Chat with Us</h3>
                    <button class="close-chat" aria-label="Close chat">×</button>
                </div>
                <div class="chat-messages"></div>
                <div class="chat-input">
                    <input type="text" placeholder="Type your message..." aria-label="Chat message">
                    <button class="send-button" aria-label="Send message">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const toggle = this.shadowRoot.querySelector('.chat-toggle');
        const container = this.shadowRoot.querySelector('.chat-container');
        const input = this.shadowRoot.querySelector('input');
        const sendButton = this.shadowRoot.querySelector('.send-button');
        const closeButton = this.shadowRoot.querySelector('.close-chat');

        toggle.addEventListener('click', () => this.toggleChat());
        closeButton.addEventListener('click', () => this.toggleChat());
        
        sendButton.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Initial welcome message
        setTimeout(() => {
            this.addMessage('Hello! How can we help you today?', 'bot');
            this.addQuickReplies([
                'Book Consultation',
                'Services Info',
                'Contact Support'
            ]);
        }, 500);
    }

    toggleChat() {
        const container = this.shadowRoot.querySelector('.chat-container');
        this.isOpen = !this.isOpen;
        container.classList.toggle('hidden', !this.isOpen);
        
        if (this.isOpen) {
            this.shadowRoot.querySelector('input').focus();
        }
    }

    sendMessage() {
        const input = this.shadowRoot.querySelector('input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            this.handleUserMessage(message);
        }
    }

    addMessage(text, type) {
        const messages = this.shadowRoot.querySelector('.chat-messages');
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    addQuickReplies(replies) {
        const messages = this.shadowRoot.querySelector('.chat-messages');
        const quickReplies = document.createElement('div');
        quickReplies.className = 'quick-replies';
        
        replies.forEach(reply => {
            const button = document.createElement('button');
            button.className = 'quick-reply';
            button.textContent = reply;
            button.addEventListener('click', () => {
                this.addMessage(reply, 'user');
                this.handleUserMessage(reply);
            });
            quickReplies.appendChild(button);
        });
        
        messages.appendChild(quickReplies);
        messages.scrollTop = messages.scrollHeight;
    }

    handleUserMessage(message) {
        // Simple response logic - can be expanded with more sophisticated handling
        setTimeout(() => {
            switch(message.toLowerCase()) {
                case 'book consultation':
                    this.addMessage('I can help you book a consultation. Would you prefer:', 'bot');
                    this.addQuickReplies(['Online Meeting', 'Phone Call', 'In-Person']);
                    break;
                    
                case 'services info':
                    this.addMessage('We offer various services. What are you interested in?', 'bot');
                    this.addQuickReplies([
                        'Cognitive Training',
                        'Social Skills',
                        'Emotional Support'
                    ]);
                    break;
                    
                case 'contact support':
                    this.addMessage('You can reach our support team at:', 'bot');
                    this.addMessage('📞 (555) 123-4567\n📧 support@healingminds.com', 'bot');
                    break;
                    
                default:
                    this.addMessage('Thank you for your message. A team member will respond shortly.', 'bot');
                    this.addQuickReplies(['Book Consultation', 'Services Info', 'Contact Support']);
            }
        }, 500);
    }
}

customElements.define('chat-widget', ChatWidget); 