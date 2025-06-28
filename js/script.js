/**
 * Academic Portfolio Website - JavaScript Functions
 * Author: Jakub Jerzmanowski
 * Description: Handles tab navigation, smooth scrolling, and UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality when DOM is loaded
    initializeTabNavigation();
    initializeSmoothScrolling();
    initializeParallaxEffect();
});

/**
 * Tab Navigation System
 * Handles switching between Home and Publications sections
 */
function initializeTabNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const contentSections = document.querySelectorAll('.content-section');

    /**
     * Switch to a specific tab
     * @param {string} targetTab - The tab identifier to switch to
     */
    function switchTab(targetTab) {
        // Remove active class from all tabs and sections
        navTabs.forEach(tab => tab.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));

        // Add active class to clicked tab and corresponding section
        const activeTab = document.querySelector(`[data-tab="${targetTab}"]`);
        const activeSection = document.getElementById(targetTab);
        
        if (activeTab && activeSection) {
            activeTab.classList.add('active');
            activeSection.classList.add('active');
        }
    }

    // Add click event listeners to navigation tabs
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = tab.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

/**
 * Smooth Scrolling for Internal Links
 * Provides smooth scrolling behavior for anchor links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Subtle Parallax Effect
 * Adds a gentle parallax effect to the main content for visual interest
 */
function initializeParallaxEffect() {
    const parallaxElement = document.querySelector('.main-content');
    
    if (!parallaxElement) return;

    // Throttle scroll events for better performance
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const speed = scrolled * 0.1;
        
        // Apply transform with hardware acceleration
        parallaxElement.style.transform = `translate3d(0, ${speed}px, 0)`;
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Add scroll event listener with throttling
    window.addEventListener('scroll', requestTick);
}

/**
 * Utility Functions
 */

/**
 * Add fade-in animation to elements when they come into view
 * @param {string} selector - CSS selector for elements to animate
 */
function addScrollAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Handle form submissions (if forms are added later)
 * @param {string} formSelector - CSS selector for the form
 */
function handleFormSubmission(formSelector) {
    const form = document.querySelector(formSelector);
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add form handling logic here
        console.log('Form submitted');
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
    });
}

/**
 * Show notification messages
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
        color: 'white',
        borderRadius: '5px',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}