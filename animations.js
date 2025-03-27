// This file contains advanced animations for the portfolio website

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger if available
    if (window.gsap && window.ScrollTrigger) {
        initGsapAnimations();
    }
    
    // Initialize text scramble effect for glitch elements
    initTextScramble();
    
    // Initialize split text animation
    initSplitText();
    
    // Initialize parallax effect
    initParallax();
});

// Initialize GSAP animations and scroll triggers
function initGsapAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate hero content on load
    gsap.from('.hero-content', {
        duration: 1.2,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
        delay: 0.5
    });
    
    // Animated heading with letter staggering
    const headingText = document.querySelector('.animated-heading h1');
    if (headingText) {
        // Split text into spans
        const text = headingText.innerHTML;
        const splitText = text.replace(/([^\s<>]+|<[^>]+>)/g, match => {
            return match.startsWith('<') ? match : `<span class="letter">${match}</span>`;
        });
        headingText.innerHTML = splitText;
        
        // Animate each letter
        gsap.from('.letter', {
            duration: 0.8,
            opacity: 0,
            y: 20,
            rotationX: 90,
            stagger: 0.05,
            delay: 0.8,
            ease: 'back.out(1.7)'
        });
    }
    
    // Animate sections when scrolling into view
    gsap.utils.toArray('.section').forEach((section, i) => {
        // Create timeline for each section
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate section title
        tl.from(section.querySelector('.section-title'), {
            duration: 0.8,
            opacity: 0,
            y: 50,
            ease: 'power3.out'
        });
        
        // Animate section line
        tl.from(section.querySelector('.section-line'), {
            duration: 0.6,
            width: 0,
            ease: 'power3.out'
        }, '-=0.4');
    });
    
    // Create reveal animations for timeline items
    gsap.utils.toArray('.timeline-item').forEach((item) => {
        gsap.from(item.querySelector('.timeline-content'), {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            opacity: 0,
            y: 30,
            x: item.classList.contains('timeline-left') ? -50 : 50,
            ease: 'power3.out'
        });
    });
    
    // Animate skill cards on scroll
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            duration: 0.6,
            opacity: 0,
            y: 30,
            delay: i * 0.1 % 0.3,
            ease: 'power3.out'
        });
    });
    
    // Animate project cards on scroll
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            duration: 0.6,
            opacity: 0,
            y: 30,
            delay: i * 0.1 % 0.3,
            ease: 'power3.out'
        });
    });
    
    // Floating animation for the profile image
    gsap.to('.profile-img-floating', {
        y: 20,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });
    
    // Floating elements animation
    gsap.utils.toArray('.floating-element').forEach((el, i) => {
        gsap.to(el, {
            x: `random(-20, 20)`,
            y: `random(-20, 20)`,
            rotation: `random(-15, 15)`,
            duration: 'random(3, 6)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2
        });
    });
}

// Text scramble effect for glitch elements
function initTextScramble() {
    // Class for the text scramble effect
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="glitch-char">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Apply text scramble to glitch effect elements
    document.querySelectorAll('.glitch-effect').forEach(el => {
        const fx = new TextScramble(el);
        const text = el.getAttribute('data-text') || el.textContent;
        
        let counter = 0;
        const next = () => {
            fx.setText(text).then(() => {
                setTimeout(next, 10000 + Math.random() * 5000);
            });
            counter++;
        };
        
        next();
    });
}

// Split text animation
function initSplitText() {
    // Find elements with split-text class
    document.querySelectorAll('.split-text').forEach(element => {
        // Get the text content
        const text = element.textContent;
        let html = '';
        
        // Wrap each letter in a span
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === ' ') {
                html += ' ';
            } else {
                html += `<span style="animation-delay: ${0.05 * i}s">${char}</span>`;
            }
        }
        
        // Set the new HTML
        element.innerHTML = html;
    });
}

// Parallax effect
function initParallax() {
    // Look for parallax sections
    document.querySelectorAll('.parallax-section').forEach(section => {
        const parallaxBg = section.querySelector('.parallax-bg');
        
        if (parallaxBg) {
            window.addEventListener('scroll', () => {
                // Calculate how far the section is from the top of the viewport
                const scrollPosition = window.scrollY;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                // Only apply parallax effect when the section is in view
                if (scrollPosition >= sectionTop - window.innerHeight && 
                    scrollPosition <= sectionTop + sectionHeight) {
                    // Calculate parallax offset
                    const offset = (scrollPosition - sectionTop) * 0.5;
                    parallaxBg.style.transform = `translateY(${offset}px)`;
                }
            });
        }
    });
}

// Typing effect (separate from Typed.js)
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    
    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];
        
        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span><span class="typing-cursor"></span>`;
        
        // Initial type speed
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init typing effect on elements with data-typed attribute
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-typed]').forEach(element => {
        const words = JSON.parse(element.getAttribute('data-typed'));
        const wait = element.getAttribute('data-typed-wait') || 3000;
        new TypeWriter(element, words, wait);
    });
});

// Tilt effect for cards
function initTiltEffect() {
    document.querySelectorAll('.tilt-effect').forEach(card => {
        card.addEventListener('mousemove', tiltCard);
        card.addEventListener('mouseout', resetTilt);
    });
}

function tiltCard(e) {
    const card = this;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    
    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate tilt angles
    const tiltX = (mouseY / cardHeight) * -10;
    const tiltY = (mouseX / cardWidth) * 10;
    
    // Apply transform
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
}

function resetTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
}

// Initialize tilt effect after DOM is loaded
document.addEventListener('DOMContentLoaded', initTiltEffect);

// Morph animation
function initMorphAnimation() {
    document.querySelectorAll('.morph-element').forEach(element => {
        let phase = 0;
        
        setInterval(() => {
            phase += 0.01;
            
            // Calculate border radius values
            const radius1 = 50 + 20 * Math.sin(phase);
            const radius2 = 50 + 20 * Math.sin(phase + 1);
            const radius3 = 50 + 20 * Math.sin(phase + 2);
            const radius4 = 50 + 20 * Math.sin(phase + 3);
            
            // Apply border radius
            element.style.borderRadius = `${radius1}% ${radius2}% ${radius3}% ${radius4}% / ${radius4}% ${radius3}% ${radius2}% ${radius1}%`;
        }, 50);
    });
}

// Initialize morph animation
document.addEventListener('DOMContentLoaded', initMorphAnimation);