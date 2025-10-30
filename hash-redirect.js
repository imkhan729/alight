// Hash URL Redirect Handler
// This script handles hash URLs and redirects them to the main page
// while preserving smooth scrolling functionality

(function() {
    'use strict';
    
    // List of valid hash sections on the page
    const validHashes = [
        'pricing', 'about', 'features', 'faq', 'requirements', 
        'download', 'installation', 'pros-cons', 'app-info', 
        'screenshots', 'reviews', 'resources'
    ];
    
    // Function to check if hash is valid
    function isValidHash(hash) {
        if (!hash) return false;
        const cleanHash = hash.replace('#', '');
        return validHashes.includes(cleanHash);
    }
    
    // Function to redirect hash URLs to main page
    function redirectHashURL() {
        const currentHash = window.location.hash;
        
        // If we have a hash and we're on the main page
        if (currentHash && window.location.pathname === '/') {
            // Check if it's a valid hash
            if (isValidHash(currentHash)) {
                // Update URL to remove hash but keep it for scrolling
                const newURL = window.location.pathname + window.location.search;
                history.replaceState(null, null, newURL);
                
                // Smooth scroll to the target section
                setTimeout(function() {
                    const targetElement = document.querySelector(currentHash);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 100);
            } else {
                // Invalid hash - redirect to main page
                window.location.href = '/';
            }
        }
    }
    
    // Function to handle internal hash navigation
    function handleHashNavigation(hash) {
        if (isValidHash(hash)) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
    
    // Function to update all internal links to prevent hash URLs
    function updateInternalLinks() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const hash = this.getAttribute('href');
                if (isValidHash(hash)) {
                    e.preventDefault();
                    handleHashNavigation(hash);
                }
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            redirectHashURL();
            updateInternalLinks();
        });
    } else {
        redirectHashURL();
        updateInternalLinks();
    }
    
    // Handle hash changes
    window.addEventListener('hashchange', function() {
        redirectHashURL();
    });
    
    // Handle popstate (back/forward navigation)
    window.addEventListener('popstate', function() {
        redirectHashURL();
    });
    
    // Export functions for global access if needed
    window.HashRedirect = {
        redirectHashURL: redirectHashURL,
        handleHashNavigation: handleHashNavigation,
        isValidHash: isValidHash
    };
    
})();
