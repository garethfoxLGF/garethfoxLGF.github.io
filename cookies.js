/* ===== Cookie Consent Manager ===== */
/* UK & EU GDPR Compliant Cookie Consent Banner */

const CookieConsent = {
    // Default settings
    settings: {
        essential: true,
        analytics: false,
        marketing: false,
        preferences: false
    },

    // Initialize cookie consent
    init: function() {
        // Set a 10-second delay to allow page to load first
        setTimeout(() => {
            const consentGiven = this.getCookie('lgf_cookie_consent');
            
            if (!consentGiven) {
                this.showBanner();
            } else {
                // Load saved preferences
                this.loadSavedPreferences();
            }
        }, 500);

        // Attach event listeners
        this.attachEventListeners();
    },

    // Show the consent banner
    showBanner: function() {
        const banner = document.getElementById('cookie-consent');
        if (banner) {
            banner.classList.add('show');
        }
    },

    // Hide the consent banner
    hideBanner: function() {
        const banner = document.getElementById('cookie-consent');
        if (banner) {
            banner.classList.remove('show');
        }
    },

    // Show the settings modal
    showSettings: function() {
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.classList.add('show');
        }
    },

    // Hide the settings modal
    hideSettings: function() {
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.classList.remove('show');
        }
    },

    // Accept all cookies
    acceptAll: function() {
        this.settings.essential = true;
        this.settings.analytics = true;
        this.settings.marketing = true;
        this.settings.preferences = true;
        this.saveCookiePreferences();
        this.hideBanner();
        this.hideSettings();
        this.loadTracking();
    },

    // Reject all non-essential cookies
    rejectAll: function() {
        this.settings.essential = true;
        this.settings.analytics = false;
        this.settings.marketing = false;
        this.settings.preferences = false;
        this.saveCookiePreferences();
        this.hideBanner();
        this.hideSettings();
    },

    // Save custom preferences
    savePreferences: function() {
        const analyticsToggle = document.getElementById('toggle-analytics');
        const marketingToggle = document.getElementById('toggle-marketing');
        const preferencesToggle = document.getElementById('toggle-preferences');

        this.settings.analytics = analyticsToggle ? analyticsToggle.classList.contains('active') : false;
        this.settings.marketing = marketingToggle ? marketingToggle.classList.contains('active') : false;
        this.settings.preferences = preferencesToggle ? preferencesToggle.classList.contains('active') : false;

        this.saveCookiePreferences();
        this.hideSettings();
        this.hideBanner();
        this.loadTracking();
    },

    // Save preferences to cookie
    saveCookiePreferences: function() {
        const preferences = {
            version: 1,
            date: new Date().toISOString(),
            settings: this.settings
        };

        // Set cookie for 12 months
        const date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();

        document.cookie = 'lgf_cookie_consent=' + JSON.stringify(preferences) + ';' + expires + ';path=/;SameSite=Strict';
    },

    // Load saved preferences
    loadSavedPreferences: function() {
        const cookie = this.getCookie('lgf_cookie_consent');
        if (cookie) {
            try {
                const preferences = JSON.parse(cookie);
                this.settings = preferences.settings || this.settings;
            } catch (e) {
                console.error('Error parsing cookie preferences', e);
            }
        }
    },

    // Get cookie by name
    getCookie: function(name) {
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length);
            }
        }
        return null;
    },

    // Initialize toggle switches
    initializeToggles: function() {
        this.settings.essential = true; // Always true
        
        const analyticsToggle = document.getElementById('toggle-analytics');
        const marketingToggle = document.getElementById('toggle-marketing');
        const preferencesToggle = document.getElementById('toggle-preferences');

        if (analyticsToggle) {
            if (this.settings.analytics) {
                analyticsToggle.classList.add('active');
            } else {
                analyticsToggle.classList.remove('active');
            }
            analyticsToggle.addEventListener('click', () => {
                analyticsToggle.classList.toggle('active');
            });
        }

        if (marketingToggle) {
            if (this.settings.marketing) {
                marketingToggle.classList.add('active');
            } else {
                marketingToggle.classList.remove('active');
            }
            marketingToggle.addEventListener('click', () => {
                marketingToggle.classList.toggle('active');
            });
        }

        if (preferencesToggle) {
            if (this.settings.preferences) {
                preferencesToggle.classList.add('active');
            } else {
                preferencesToggle.classList.remove('active');
            }
            preferencesToggle.addEventListener('click', () => {
                preferencesToggle.classList.toggle('active');
            });
        }
    },

    // Attach event listeners
    attachEventListeners: function() {
        const acceptBtn = document.getElementById('cookie-accept-all');
        const rejectBtn = document.getElementById('cookie-reject-all');
        const settingsBtn = document.getElementById('cookie-settings');
        const saveBtn = document.getElementById('cookie-save-preferences');
        const modalCloseBtn = document.getElementById('cookie-modal-close');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAll());
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => this.rejectAll());
        }

        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.loadSavedPreferences();
                this.initializeToggles();
                this.showSettings();
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.savePreferences());
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => this.hideSettings());
        }

        // Close modal when clicking outside the modal content
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideSettings();
                }
            });
        }
    },

    // Load tracking scripts based on consent
    loadTracking: function() {
        // Placeholder for loading Google Analytics or other tracking scripts
        // Only load if user consents
        if (this.settings.analytics) {
            // Example: load Google Analytics here
            // You can uncomment and customize based on your needs
            /*
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
            */
        }

        if (this.settings.marketing) {
            // Example: load marketing tracking
            // Customize as needed
        }

        if (this.settings.preferences) {
            // Example: load preference tracking
            // Customize as needed
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        CookieConsent.init();
    });
} else {
    CookieConsent.init();
}
