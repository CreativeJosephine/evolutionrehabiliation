export class FormHandler {
    constructor(formElement) {
        this.form = formElement;
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.originalButtonText = this.submitButton?.innerHTML || 'Submit';
        this.setupValidation();
    }

    setupValidation() {
        // Add validation classes and aria attributes
        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('invalid', this.handleInvalid.bind(this));
            input.addEventListener('input', this.handleInput.bind(this));
        });

        // Prevent default validation popup
        this.form.addEventListener('invalid', (e) => e.preventDefault(), true);
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleInvalid(e) {
        const input = e.target;
        input.classList.add('invalid');
        this.showError(input);
    }

    handleInput(e) {
        const input = e.target;
        input.classList.remove('invalid');
        this.clearError(input);
        this.validateInput(input);
    }

    validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let message = '';

        switch(input.type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                message = 'Please enter a valid email address';
                break;
            case 'tel':
                isValid = /^\+?[\d\s-]{10,}$/.test(value);
                message = 'Please enter a valid phone number';
                break;
            case 'text':
                isValid = value.length >= 2;
                message = 'This field is required';
                break;
        }

        if (!isValid) {
            this.showError(input, message);
            input.classList.add('invalid');
        }

        return isValid;
    }

    showError(input, message = input.validationMessage) {
        let errorDiv = input.parentElement.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', errorDiv.id = `error-${input.id}`);
    }

    clearError(input) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
    }

    setLoading(isLoading) {
        if (this.submitButton) {
            if (isLoading) {
                this.submitButton.innerHTML = `
                    <span class="spinner"></span>
                    <span class="sr-only">Sending...</span>
                `;
                this.submitButton.disabled = true;
            } else {
                this.submitButton.innerHTML = this.originalButtonText;
                this.submitButton.disabled = false;
            }
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.form.checkValidity()) {
            this.form.querySelectorAll('input, textarea').forEach(input => {
                this.validateInput(input);
            });
            return;
        }

        this.setLoading(true);

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(this.form.action, {
                method: this.form.method || 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Submission failed');

            this.showSuccess();
            this.form.reset();
        } catch (error) {
            this.showError(this.form, 'Something went wrong. Please try again later.');
        } finally {
            this.setLoading(false);
        }
    }

    showSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you! We will get back to you soon.';
        this.form.parentElement.insertBefore(successMessage, this.form.nextSibling);

        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
} 