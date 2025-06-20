// Portfolio JavaScript - Interactive Features and Theme Management

class Portfolio {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupActiveNavigation();
        this.setupContactForm();
        this.loadThemePreference();
        this.setupParallaxEffect();
        this.setupTypingAnimation();
    }

    // Theme Toggle Functionality
    setupThemeToggle() {
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Update icon
        const icon = this.themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        // Save preference
        localStorage.setItem('theme-preference', newTheme);
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    loadThemePreference() {
        const savedTheme = localStorage.getItem('theme-preference');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', theme);
        
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Mobile Menu Functionality
    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Active Navigation Highlighting
    setupActiveNavigation() {
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
            this.updateNavbarBackground();
        });
    }

    updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animateElements = document.querySelectorAll(
            '.skill-category, .project-card, .achievement-card, .about-text, .contact-info, .contact-form'
        );

        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Contact Form Handling
    setupContactForm() {
        const contactForm = document.querySelector('.contact-form form');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm(contactForm);
        });
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            this.showNotification('Message sent successfully!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-primary);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            box-shadow: 0 10px 30px var(--shadow-medium);
            z-index: 1001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Parallax Effect for Hero Section
    setupParallaxEffect() {
        const hero = document.querySelector('.hero');
        const codeBlock = document.querySelector('.code-block');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallax = scrolled * 0.5;
                if (codeBlock) {
                    codeBlock.style.transform = `translateY(${parallax}px)`;
                }
            }
        });
    }

    // Typing Animation for Code Block
    setupTypingAnimation() {
        const codeContent = document.querySelector('.code-content code');
        if (!codeContent) return;

        const originalText = codeContent.innerHTML;
        const lines = originalText.split('\n');
        
        codeContent.innerHTML = '';
        
        let lineIndex = 0;
        const typeNextLine = () => {
            if (lineIndex < lines.length) {
                const line = lines[lineIndex];
                codeContent.innerHTML += line + '\n';
                lineIndex++;
                
                // Random delay between lines for realistic typing
                const delay = Math.random() * 200 + 100;
                setTimeout(typeNextLine, delay);
            }
        };

        // Start typing animation after a delay
        setTimeout(() => {
            typeNextLine();
        }, 1000);
    }
}

// Utility Functions
class Utils {
    // Smooth scroll to top
    static scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Get scroll percentage
    static getScrollPercentage() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        return (scrollTop / docHeight) * 100;
    }

    // Debounce function for performance
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Skill Bar Animation
class SkillAnimations {
    static animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                    entry.target.classList.add('skill-animate');
                }
            });
        });

        skillItems.forEach(item => observer.observe(item));
    }
}

// Project Card Interactions
class ProjectInteractions {
    static init() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Easter Eggs and Fun Interactions
class EasterEggs {
    static init() {
        // Konami Code Easter Egg
        let konamiCode = [];
        const konamiSequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                this.activateMatrixEffect();
                konamiCode = [];
            }
        });

        // Click counter on logo
        let clickCount = 0;
        const logo = document.querySelector('.logo-text');
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 10) {
                this.showSecretMessage();
                clickCount = 0;
            }
        });
    }

    static activateMatrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(canvas);

        // Matrix rain effect
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const charArray = chars.split('');
        const drops = [];

        for (let x = 0; x < canvas.width / 10; x++) {
            drops[x] = 1;
        }

        let animationId;
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = '10px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * 10, drops[i] * 10);
                
                if (drops[i] * 10 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            
            animationId = requestAnimationFrame(draw);
        };

        draw();

        // Remove effect after 5 seconds
        setTimeout(() => {
            cancelAnimationFrame(animationId);
            canvas.remove();
        }, 5000);
    }

    static showSecretMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="text-align: center;">
                <h3>🎉 Secret Unlocked! 🎉</h3>
                <p>You found the hidden easter egg!</p>
                <p>Thanks for exploring my portfolio thoroughly! 😄</p>
            </div>
        `;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-primary);
            color: var(--text-primary);
            padding: 2rem;
            border-radius: 12px;
            border: 2px solid var(--accent-primary);
            box-shadow: 0 20px 40px var(--shadow-heavy);
            z-index: 10000;
            animation: bounceIn 0.6s ease;
        `;

        // Add bounce animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounceIn {
                0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.05); }
                70% { transform: translate(-50%, -50%) scale(0.9); }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
            style.remove();
        }, 3000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main portfolio functionality
    new Portfolio();
    
    // Initialize additional features
    SkillAnimations.animateSkillBars();
    ProjectInteractions.init();
    EasterEggs.init();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    console.log('🚀 Portfolio loaded successfully!');
    console.log('💡 Try the Konami code for a surprise!');
    console.log('🔍 Click the logo 10 times for another easter egg!');
});

// Handle window resize
window.addEventListener('resize', Utils.debounce(() => {
    // Update any size-dependent calculations
    console.log('Window resized, updating layout...');
}, 250));

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come back soon! - Alex Chen';
    } else {
        document.title = 'Alex Chen - Software Developer';
    }
});