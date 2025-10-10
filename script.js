// DigitalFlow Design System - JavaScript Implementation
// Following design.json specifications for minimal, functional interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation scroll effect - following design.json backdrop filter spec
    const navigation = document.querySelector('.navigation');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navigation.style.backdropFilter = 'blur(10px)';
            navigation.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        } else {
            navigation.style.backdropFilter = 'none';
            navigation.style.backgroundColor = 'transparent';
        }
        
        lastScrollY = currentScrollY;
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Download button interactions - following design.json button specs
    const downloadButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add subtle animation effect as per design.json
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show download modal
            showDownloadModal();
        });
    });

    // Intersection Observer for subtle animations - minimal as per design.json
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for subtle fade-in - following design.json minimal animation principle
    const sections = document.querySelectorAll('.light-section, .white-section, .dark-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Download modal - following design.json minimal interaction principle
    function showDownloadModal() {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Create modal content - following design.json button styles
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: #FFFFFF;
            padding: 48px;
            border-radius: 8px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        modalContent.innerHTML = `
            <h3 style="
                font-size: clamp(24px, 3vw, 36px);
                font-weight: 700;
                color: #000000;
                margin-bottom: 32px;
            ">Choose Your Platform</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <button class="platform-btn ios-btn" style="
                    background: #000000;
                    color: #FFFFFF;
                    font-size: 16px;
                    font-weight: 600;
                    padding: 16px 32px;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">Download for iOS</button>
                <button class="platform-btn android-btn" style="
                    background: #000000;
                    color: #FFFFFF;
                    font-size: 16px;
                    font-weight: 600;
                    padding: 16px 32px;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">Download for Android</button>
            </div>
            <button class="close-modal" style="
                position: absolute;
                top: 16px;
                right: 16px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666666;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">×</button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Animate modal in
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Add event listeners for platform buttons
        const platformButtons = modalContent.querySelectorAll('.platform-btn');
        platformButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.classList.contains('ios-btn') ? 'iOS' : 'Android';
                simulateDownload(platform);
                closeModal();
            });

            // Hover effects following design.json button specs
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });

        const closeBtn = modalContent.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        function closeModal() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.9)';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        }
    }

    // Simulate download - minimal feedback as per design.json
    function simulateDownload(platform) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            background: #000000;
            color: #FFFFFF;
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-size: 16px;
        `;
        
        notification.textContent = `Redirecting to ${platform === 'iOS' ? 'App Store' : 'Google Play'}...`;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);

        // In production, replace with actual app store URLs:
        // if (platform === 'iOS') {
        //     window.open('https://apps.apple.com/app/improvu', '_blank');
        // } else {
        //     window.open('https://play.google.com/store/apps/details?id=com.improvu.app', '_blank');
        // }
    }

    // Keyboard navigation support - accessibility following design.json
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('[style*="position: fixed"]');
            if (modal) {
                modal.click();
            }
        }
    });

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Additional scroll-based functionality can be added here
        }, 10);
    });

    // Focus management for accessibility
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3B82F6';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Mobile menu toggle (if needed for smaller screens)
    function createMobileMenu() {
        const nav = document.querySelector('.nav-container');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.style.cssText = `
                background: none;
                border: none;
                color: #FFFFFF;
                font-size: 24px;
                cursor: pointer;
                display: block;
            `;
            
            nav.appendChild(menuBtn);
            
            menuBtn.addEventListener('click', function() {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(0, 0, 0, 0.9)';
                navLinks.style.padding = '24px';
            });
        }
    }

    // Initialize mobile menu on load and resize
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
});