// DOM Content Loaded
// Clean URL handling is now done via .htaccess file
// This section has been removed as it's no longer needed

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script.js loaded successfully');

    // Mobile Navigation Toggle - Handle multiple instances
    const hamburgers = document.querySelectorAll('.hamburger');
    const navMenus = document.querySelectorAll('.nav-menu');
    const body = document.body;

    // Set up e/* Uncomment to enable Google Analytics */
    // initGoogleAnalytics();

    // Intersection Observer for fade-in animations
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    // Elements to observe
    const animatedElements = document.querySelectorAll('.feature-card, .hero-text, .hero-mockup, .btn, .hero-feature');

    // Start observing each element
    animatedElements.forEach(el => {
        el.classList.add('will-fade-in');
        fadeInObserver.observe(el);
    });
    nt listeners
    for each hamburger menu
    hamburgers.forEach((hamburger, index) => {
        if (navMenus[index]) {
            const navMenu = navMenus[index];

            hamburger.addEventListener('click', function() {
                const nowActive = !navMenu.classList.contains('active');
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                hamburger.setAttribute('aria-expanded', String(nowActive));

                // Prevent body scroll when menu is open
                if (nowActive) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = '';
                }
            });

            // Close menu when clicking on a link
            navMenu.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') {
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        }
    });

    // Close menu when clicking outside - handle all instances
    document.addEventListener('click', function(e) {
        // Check if click is outside any hamburger or nav menu
        let isOutside = true;

        hamburgers.forEach((hamburger, index) => {
            if (navMenus[index]) {
                const navMenu = navMenus[index];
                if (hamburger.contains(e.target) || navMenu.contains(e.target)) {
                    isOutside = false;
                }
            }
        });

        if (isOutside) {
            hamburgers.forEach(hamburger => {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });

            navMenus.forEach(navMenu => {
                navMenu.classList.remove('active');
            });

            body.style.overflow = '';
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Anchor clicked:', this.getAttribute('href'));

            const target = document.querySelector(this.getAttribute('href'));
            console.log('Target element:', target);

            if (target) {
                console.log('Scrolling to target');

                // Try smooth scrolling with fallback
                try {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } catch (error) {
                    console.log('Smooth scrolling not supported, using fallback');
                    // Fallback for browsers that don't support smooth scrolling
                    const targetPosition = target.offsetTop - 100; // Offset for header
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'auto'
                    });
                }

                // Close mobile menu if open
                const activeNavMenu = document.querySelector('.nav-menu.active');
                const activeHamburger = document.querySelector('.hamburger.active');
                if (activeNavMenu) {
                    activeNavMenu.classList.remove('active');
                    if (activeHamburger) activeHamburger.classList.remove('active');
                    body.style.overflow = '';
                }
            } else {
                console.log('Target not found');
            }
        });
    });

    // Header Background on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Installation Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Table of Contents Toggle
    const tocToggle = document.getElementById('tocToggle');
    const tocContent = document.getElementById('tocContent');
    const tocButton = document.getElementById('tocButton');

    if (tocToggle && tocContent && tocButton) {
        tocToggle.addEventListener('click', function() {
            tocContent.classList.toggle('hidden');
            tocButton.classList.toggle('rotated');
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // Simulate newsletter signup
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            }
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .review-card, .step, .section-header').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Counter Animation for Statistics
    const stats = document.querySelectorAll('.stat-number');
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Format numbers with appropriate suffixes
            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + 'M+';
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + 'K+';
            } else {
                element.textContent = current.toFixed(1) + '★';
            }
        }, 16);
    };

    // Animate statistics when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const text = statElement.textContent;

                if (text.includes('10M+')) {
                    animateCounter(statElement, 10000000);
                } else if (text.includes('4.8★')) {
                    animateCounter(statElement, 4.8);
                } else if (text.includes('1000+')) {
                    animateCounter(statElement, 1000);
                }

                statsObserver.unobserve(statElement);
            }
        });
    });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Download Button Click Tracking
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'APK',
                    'event_label': 'AlightMotion Premium'
                });
            }
        });
    });

    // Lazy Loading for Images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Screenshots carousel logic
    const viewport = document.querySelector('.showcase-viewport');
    const track = document.querySelector('.showcase-track');
    const prevBtn = document.querySelector('.showcase-nav.prev');
    const nextBtn = document.querySelector('.showcase-nav.next');
    const dotsContainer = document.querySelector('.showcase-dots');
    if (viewport && track && prevBtn && nextBtn) {
        let offset = 0;
        const gap = 16; // must match CSS gap
        let isAnimating = false; // 1s delay guard between navigations
        const slides = Array.from(track.querySelectorAll('.showcase-slide'));
        const slideWidth = () => {
            const firstSlide = track.querySelector('.showcase-slide');
            return firstSlide ? firstSlide.getBoundingClientRect().width + gap : 260 + gap;
        };
        let currentIndex = 0;

        function maxOffsetPx() {
            return Math.max(0, track.scrollWidth - viewport.clientWidth);
        }

        function maxIndex() {
            // number of steps we can move by slide-width increments
            return Math.max(0, Math.ceil(maxOffsetPx() / slideWidth()));
        }

        function clampIndex(i) {
            return Math.min(maxIndex(), Math.max(0, i));
        }

        function updateButtons() {
            const maxOffset = maxOffsetPx();
            prevBtn.disabled = offset <= 0;
            nextBtn.disabled = offset >= maxOffset - 2; // tolerance
        }

        function applyTransform() {
            track.style.transform = `translateX(${-offset}px)`;
            updateButtons();
        }

        function updateDots() {
            if (!dotsContainer) return;
            const buttons = dotsContainer.querySelectorAll('.showcase-dot');
            buttons.forEach((btn, idx) => btn.classList.toggle('active', idx === currentIndex));
        }

        function buildDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            for (let i = 0; i <= maxIndex(); i++) {
                const dot = document.createElement('button');
                dot.className = 'showcase-dot';
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    goToIndex(i);
                });
                dotsContainer.appendChild(dot);
            }
            updateDots();
        }

        function goToIndex(i) {
            if (isAnimating) return;
            isAnimating = true;
            currentIndex = clampIndex(i);
            offset = currentIndex * slideWidth();
            applyTransform();
            updateDots();
            setTimeout(() => { isAnimating = false; }, 1000); // 1s delay between moves
        }

        prevBtn.addEventListener('click', () => {
            goToIndex(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToIndex(currentIndex + 1);
        });

        // Wheel/touchpad: step one slide with 1s delay
        viewport.addEventListener('wheel', (e) => {
            const total = Math.abs(e.deltaX) + Math.abs(e.deltaY);
            if (total === 0) return;
            e.preventDefault();
            if (isAnimating) return;
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            const direction = delta > 0 ? 1 : -1;
            goToIndex(currentIndex + direction);
        }, { passive: false });

        // Resize handler: rebuild dots and keep position in view
        window.addEventListener('resize', () => {
            const savedIndex = currentIndex;
            buildDots();
            // snap without triggering delay guard
            offset = clampIndex(savedIndex) * slideWidth();
            applyTransform();
            updateDots();
            isAnimating = false;
        });

        // Initialize
        track.style.willChange = 'transform';
        buildDots();
        currentIndex = 0;
        offset = 0;
        applyTransform();
        updateDots();

        // Autoplay with 1s delay between moves
        const AUTOPLAY_DELAY_MS = 1000;
        let autoplayTimer = setInterval(() => {
            if (document.hidden) return; // don't advance when tab is hidden
            if (isAnimating) return; // respect 1s guard
            const lastIndex = maxIndex();
            const nextIndex = currentIndex >= lastIndex ? 0 : currentIndex + 1;
            goToIndex(nextIndex);
        }, AUTOPLAY_DELAY_MS);
    }

    // Show notification function
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add to document
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);

        // Close button event
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        });
    }

    // Initialize blog filters if on blog page
    if (document.getElementById('searchInput')) {
        initBlogFilters();
    }

    // Initialize service worker for PWA
    if ('serviceWorker' in navigator) {
        initServiceWorker();
    }
});

// Service Worker Initialization
function initServiceWorker() {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Google Analytics (replace with your tracking ID)
function initGoogleAnalytics() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');
}

// Uncomment to enable Google Analytics
// initGoogleAnalytics();

// Blog Search and Filter Functionality with Enhanced Animations
function initBlogFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (!searchInput) return;

    // Pagination variables
    const cardsPerPage = 9;
    let currentPage = 1;
    let filteredCards = Array.from(blogCards);

    // Get pagination elements
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const pageNumbersContainer = document.getElementById('pageNumbers');

    // Show cards for current page
    function showPage(page) {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;

        // Hide all cards
        blogCards.forEach(card => {
            card.style.display = 'none';
        });

        // Show cards for current page
        filteredCards.slice(startIndex, endIndex).forEach(card => {
            card.style.display = 'flex';
        });

        // Update pagination controls
        updatePaginationControls();
    }

    // Update pagination controls
    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

        // Update button states
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages || totalPages === 0;

        // Generate page numbers
        pageNumbersContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'page-number';
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pageNumbersContainer.appendChild(pageButton);
        }
    }

    // Event listeners for pagination buttons
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Search functionality with debounce
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();
            filterBlogPosts(query, getCurrentCategory());
        }, 300); // Debounce for 300ms
    });

    // Category filtering
    categoryButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            const query = searchInput.value.toLowerCase().trim();
            filterBlogPosts(query, category);

            // Add animation effect
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });

    // Get current active category
    function getCurrentCategory() {
        const activeButton = document.querySelector('.category-btn.active');
        return activeButton ? activeButton.getAttribute('data-category') : 'all';
    }

    // Filter blog posts based on search query and category with enhanced animations
    function filterBlogPosts(query, category) {
        // Reset to first page when filtering
        currentPage = 1;

        // Filter cards
        filteredCards = Array.from(blogCards).filter(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
            const cardCategory = card.getAttribute('data-category');

            const matchesSearch = query === '' || title.includes(query) || excerpt.includes(query);
            const matchesCategory = category === 'all' || cardCategory === category;

            return matchesSearch && matchesCategory;
        });

        // Show first page of filtered results
        showPage(currentPage);
    }

    // Initialize pagination
    showPage(currentPage);
}

// Removed duplicate DOMContentLoaded listener to prevent conflicts with pagination
// The functions are already initialized in the first DOMContentLoaded listener above