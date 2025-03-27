// DOM elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contact-form');
const currentYearElement = document.getElementById('current-year');
const backToTopBtn = document.getElementById('back-to-top');
const loadingScreen = document.getElementById('loading-screen');
const customCursor = document.getElementById('custom-cursor');
const customCursorFollower = document.getElementById('custom-cursor-follower');
const projectsShowcase = document.getElementById('projects-showcase');
const showcaseClose = document.getElementById('showcase-close');

// Set current year in the footer
currentYearElement.textContent = new Date().getFullYear();

// Initialize loading screen
window.addEventListener('load', () => {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });
    
    // Hide loading screen after all resources are loaded
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
    
    // Initialize Typed.js for the hero tagline
    if (document.querySelector('.typewriter')) {
        const portfolioTagline = document.getElementById('portfolio-tagline');
        const originalText = portfolioTagline.textContent;
        portfolioTagline.textContent = '';
        portfolioTagline.classList.remove('typewriter');
        
        new Typed('#portfolio-tagline', {
            strings: [originalText],
            typeSpeed: 50,
            backSpeed: 20,
            loop: false,
            showCursor: true,
            cursorChar: '|',
            onComplete: (self) => {
                setTimeout(() => {
                    self.cursor.style.display = 'none';
                }, 1500);
            }
        });
    }
    
    // Initialize particle background
    initParticles();
    
    // Initialize 3D animations
    init3DAnimations();
});

// Custom cursor effect
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    // Main cursor follows mouse immediately
    customCursor.style.left = `${clientX}px`;
    customCursor.style.top = `${clientY}px`;
    
    // Follower cursor has a slight delay for a trailing effect
    setTimeout(() => {
        customCursorFollower.style.left = `${clientX}px`;
        customCursorFollower.style.top = `${clientY}px`;
    }, 100);
});

// Change cursor style over interactive elements
document.addEventListener('mouseover', (e) => {
    if (
        e.target.tagName === 'A' || 
        e.target.tagName === 'BUTTON' || 
        e.target.classList.contains('project-card') ||
        e.target.closest('.project-card') ||
        e.target.classList.contains('skill-card') ||
        e.target.closest('.skill-card')
    ) {
        customCursor.classList.add('cursor-active');
        customCursorFollower.classList.add('cursor-follower-active');
    }
});

document.addEventListener('mouseout', (e) => {
    if (
        e.target.tagName === 'A' || 
        e.target.tagName === 'BUTTON' || 
        e.target.classList.contains('project-card') ||
        e.target.closest('.project-card') ||
        e.target.classList.contains('skill-card') ||
        e.target.closest('.skill-card')
    ) {
        customCursor.classList.remove('cursor-active');
        customCursorFollower.classList.remove('cursor-follower-active');
    }
});

// Load portfolio data
document.addEventListener('DOMContentLoaded', () => {
    // Fill in portfolio owner information
    if (portfolioData.owner) {
        const owner = portfolioData.owner;
        
        // Set portfolio name in multiple places
        const portfolioNameElements = document.querySelectorAll('#portfolio-name, #portfolio-name-span, #footer-name, #footer-logo');
        portfolioNameElements.forEach(element => {
            element.textContent = owner.name;
        });
        
        // Set other basic info
        document.title = `${owner.name} | Portfolio`;
        document.getElementById('portfolio-tagline').setAttribute('data-typed-text', owner.tagline || '');
        document.getElementById('portfolio-bio').innerHTML = formatContentWithHighlights(owner.longBio || owner.shortBio || '');
        document.getElementById('portfolio-location').textContent = owner.location || '';
        document.getElementById('portfolio-email').textContent = owner.email || '';
        document.getElementById('portfolio-job').textContent = owner.jobTitle || '';
        
        // Set contact info
        document.getElementById('contact-location').textContent = owner.location || '';
        document.getElementById('contact-email').textContent = owner.email || '';
        document.getElementById('contact-phone').textContent = owner.phone || '';
        
        // Set profile image if available
        if (owner.profileImage) {
            document.getElementById('portfolio-image').src = owner.profileImage;
        }
        
        // Set social links
        if (owner.socialLinks) {
            const socialLinksContainer = document.getElementById('social-links');
            const footerSocialContainer = document.getElementById('footer-social');
            socialLinksContainer.innerHTML = '';
            footerSocialContainer.innerHTML = '';
            
            for (const [platform, url] of Object.entries(owner.socialLinks)) {
                if (!url) continue;
                
                let icon = 'fas fa-link';
                
                // Set icon based on platform
                switch (platform.toLowerCase()) {
                    case 'linkedin': icon = 'fab fa-linkedin-in'; break;
                    case 'github': icon = 'fab fa-github'; break;
                    case 'twitter': icon = 'fab fa-twitter'; break;
                    case 'facebook': icon = 'fab fa-facebook-f'; break;
                    case 'instagram': icon = 'fab fa-instagram'; break;
                    case 'dribbble': icon = 'fab fa-dribbble'; break;
                    case 'behance': icon = 'fab fa-behance'; break;
                    case 'medium': icon = 'fab fa-medium-m'; break;
                    case 'youtube': icon = 'fab fa-youtube'; break;
                    case 'codepen': icon = 'fab fa-codepen'; break;
                    case 'stackoverflow': icon = 'fab fa-stack-overflow'; break;
                }
                
                const link = document.createElement('a');
                link.href = url;
                link.className = 'social-link';
                link.target = '_blank';
                link.setAttribute('aria-label', platform);
                link.innerHTML = `<i class="${icon}"></i>`;
                
                socialLinksContainer.appendChild(link);
                
                // Clone for footer
                const footerLink = link.cloneNode(true);
                footerSocialContainer.appendChild(footerLink);
            }
        }
        
        // Set interests
        if (owner.interests && owner.interests.length > 0) {
            const interestsContainer = document.getElementById('interests-container');
            interestsContainer.innerHTML = '';
            
            owner.interests.forEach(interest => {
                const interestItem = document.createElement('div');
                interestItem.className = 'interest-item hover-lift';
                interestItem.textContent = interest;
                interestsContainer.appendChild(interestItem);
            });
        }
        
        // Set services
        if (owner.services && owner.services.length > 0) {
            const servicesContainer = document.getElementById('services-container');
            servicesContainer.innerHTML = '';
            
            owner.services.forEach(service => {
                const serviceItem = document.createElement('div');
                serviceItem.className = 'service-item hover-lift';
                serviceItem.textContent = service;
                servicesContainer.appendChild(serviceItem);
            });
        }
    }
    
    // Load skills
    if (portfolioData.skills && portfolioData.skills.length > 0) {
        loadSkills(portfolioData.skills);
    }
    
    // Load projects
    if (portfolioData.projects && portfolioData.projects.length > 0) {
        loadProjects(portfolioData.projects);
    }
    
    // Load experiences
    if (portfolioData.experiences && portfolioData.experiences.length > 0) {
        loadExperiences(portfolioData.experiences);
    }
    
    // Load education
    if (portfolioData.education && portfolioData.education.length > 0) {
        loadEducation(portfolioData.education);
    }
});

// Format content with highlights
function formatContentWithHighlights(content) {
    // Highlight important phrases within ** **
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert URLs to links
    content = content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Convert line breaks to <br> tags
    content = content.replace(/\n/g, '<br>');
    
    return content;
}

// Load skills with animations
function loadSkills(skills) {
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    
    // Extract unique categories for filters
    const categories = [...new Set(skills.map(skill => skill.category).filter(Boolean))];
    const categoryFiltersContainer = document.getElementById('category-filters');
    categoryFiltersContainer.innerHTML = '';
    
    // Create category filter buttons
    categories.forEach(category => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn btn-glow-sm';
        filterBtn.setAttribute('data-filter', category);
        filterBtn.textContent = category;
        categoryFiltersContainer.appendChild(filterBtn);
        
        // Add event listener
        filterBtn.addEventListener('click', () => {
            // Update active filter button
            document.querySelectorAll('.skills-filter .filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            filterBtn.classList.add('active');
            
            // Filter skills with animation
            const skillElements = document.querySelectorAll('.skill-card');
            skillElements.forEach(element => {
                if (category === 'all' || element.getAttribute('data-category') === category) {
                    element.style.display = 'block';
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        element.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Create skill cards with staggered animation
    skills.forEach((skill, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.setAttribute('data-category', skill.category || '');
        skillCard.setAttribute('data-aos', 'fade-up');
        skillCard.setAttribute('data-aos-delay', (index % 3) * 100);
        
        // Determine icon based on skill name or provided icon
        let iconClass = 'fas fa-code';
        if (skill.icon) {
            // If icon is provided, use it
            iconClass = skill.icon.includes('fa-') ? skill.icon : `fas fa-${skill.icon}`;
        } else {
            // Default icon mapping based on common skills
            const iconMap = {
                'javascript': 'fab fa-js',
                'html': 'fab fa-html5',
                'css': 'fab fa-css3-alt',
                'python': 'fab fa-python',
                'react': 'fab fa-react',
                'node': 'fab fa-node-js',
                'angular': 'fab fa-angular',
                'vue': 'fab fa-vuejs',
                'sass': 'fab fa-sass',
                'java': 'fab fa-java',
                'php': 'fab fa-php',
                'wordpress': 'fab fa-wordpress',
                'bootstrap': 'fab fa-bootstrap',
                'git': 'fab fa-git-alt',
                'github': 'fab fa-github',
                'docker': 'fab fa-docker',
                'aws': 'fab fa-aws',
                'database': 'fas fa-database',
                'api': 'fas fa-plug',
                'design': 'fas fa-paint-brush'
            };
            
            // Try to match skill name with known icons
            const skillLower = skill.name.toLowerCase();
            for (const [key, value] of Object.entries(iconMap)) {
                if (skillLower.includes(key)) {
                    iconClass = value;
                    break;
                }
            }
        }
        
        skillCard.innerHTML = `
            <div class="skill-header">
                <div class="skill-icon pulse-effect">
                    <i class="${iconClass}"></i>
                </div>
                <h3 class="skill-name">${skill.name}</h3>
            </div>
            <div class="skill-proficiency">
                <div class="proficiency-bar" style="width: 0%"></div>
            </div>
            <p class="skill-description">${skill.description || ''}</p>
            <div class="skill-footer">
                <span>${skill.yearsOfExperience ? skill.yearsOfExperience + ' years' : ''}</span>
                <span>${skill.category || ''}</span>
            </div>
            ${skill.tags && skill.tags.length > 0 ? 
                `<div class="skill-tags">
                    ${skill.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                </div>` : ''}
        `;
        
        skillsContainer.appendChild(skillCard);
        
        // Animate skill proficiency bar
        setTimeout(() => {
            const proficiencyBar = skillCard.querySelector('.proficiency-bar');
            proficiencyBar.style.transition = 'width 1.5s ease-in-out';
            proficiencyBar.style.width = (skill.proficiency || 50) + '%';
        }, 500 + index * 100);
    });
    
    // Set "All" filter as active and add event listener
    const allFilterBtn = document.querySelector('.skills-filter .filter-btn[data-filter="all"]');
    allFilterBtn.classList.add('active');
    allFilterBtn.addEventListener('click', () => {
        document.querySelectorAll('.skills-filter .filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        allFilterBtn.classList.add('active');
        
        // Show all skill cards with animation
        const skillElements = document.querySelectorAll('.skill-card');
        skillElements.forEach(element => {
            element.style.display = 'block';
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 50);
        });
    });
}

// Load projects with showcase functionality
function loadProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    
    // Extract unique categories for filters
    const categories = [...new Set(projects.map(project => project.category).filter(Boolean))];
    const categoryFiltersContainer = document.getElementById('project-category-filters');
    categoryFiltersContainer.innerHTML = '';
    
    // Create category filter buttons
    categories.forEach(category => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn btn-glow-sm';
        filterBtn.setAttribute('data-filter', category);
        filterBtn.textContent = category;
        categoryFiltersContainer.appendChild(filterBtn);
        
        // Add event listener
        filterBtn.addEventListener('click', () => {
            // Update active filter button
            document.querySelectorAll('.projects-filter .filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            filterBtn.classList.add('active');
            
            // Filter projects with animation
            const projectElements = document.querySelectorAll('.project-card');
            projectElements.forEach(element => {
                if (category === 'all' || element.getAttribute('data-category') === category) {
                    element.style.display = 'block';
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        element.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Create project cards with staggered animation
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category || '');
        projectCard.setAttribute('data-project-id', index);
        projectCard.setAttribute('data-aos', 'fade-up');
        projectCard.setAttribute('data-aos-delay', (index % 3) * 100);
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image || 'images/placeholder.png'}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                ${project.tags && project.tags.length > 0 ? 
                    `<div class="project-tags">
                        ${project.tags.slice(0, 3).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                        ${project.tags.length > 3 ? `<span class="project-tag">+${project.tags.length - 3}</span>` : ''}
                    </div>` : ''}
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
        
        // Add click event to open project showcase
        projectCard.addEventListener('click', () => {
            openProjectShowcase(project);
        });
    });
    
    // Set "All" filter as active and add event listener
    const allFilterBtn = document.querySelector('.projects-filter .filter-btn[data-filter="all"]');
    allFilterBtn.classList.add('active');
    allFilterBtn.addEventListener('click', () => {
        document.querySelectorAll('.projects-filter .filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        allFilterBtn.classList.add('active');
        
        // Show all project cards with animation
        const projectElements = document.querySelectorAll('.project-card');
        projectElements.forEach(element => {
            element.style.display = 'block';
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 50);
        });
    });
    
    // Close showcase on button click
    showcaseClose.addEventListener('click', () => {
        projectsShowcase.classList.remove('active');
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 300);
    });
    
    // Close showcase on overlay click
    projectsShowcase.addEventListener('click', (e) => {
        if (e.target === projectsShowcase.querySelector('.showcase-overlay')) {
            projectsShowcase.classList.remove('active');
            setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
}

// Open project showcase modal
function openProjectShowcase(project) {
    const showcaseImage = document.getElementById('showcase-image');
    const showcaseTitle = document.getElementById('showcase-title');
    const showcaseDescription = document.getElementById('showcase-description');
    const showcaseTags = document.getElementById('showcase-tags');
    const showcaseTech = document.getElementById('showcase-tech');
    const showcaseHighlights = document.getElementById('showcase-highlights');
    const showcaseLinks = document.getElementById('showcase-links');
    
    // Set content
    showcaseImage.src = project.image || 'images/placeholder.png';
    showcaseTitle.textContent = project.title;
    showcaseDescription.innerHTML = project.longDescription || project.description;
    
    // Set tags
    showcaseTags.innerHTML = '';
    if (project.tags && project.tags.length > 0) {
        project.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'project-tag';
            tagSpan.textContent = tag;
            showcaseTags.appendChild(tagSpan);
        });
    }
    
    // Set technologies
    showcaseTech.innerHTML = '';
    if (project.technologies && project.technologies.length > 0) {
        showcaseTech.innerHTML = `
            <h4>Technologies Used</h4>
            <ul class="tech-list">
                ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
        `;
    }
    
    // Set highlights
    showcaseHighlights.innerHTML = '';
    if (project.highlights && project.highlights.length > 0) {
        showcaseHighlights.innerHTML = `
            <h4>Key Features</h4>
            <ul class="highlights-list">
                ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
        `;
    }
    
    // Set links
    showcaseLinks.innerHTML = '';
    if (project.url) {
        const demoLink = document.createElement('a');
        demoLink.href = project.url;
        demoLink.className = 'showcase-link';
        demoLink.target = '_blank';
        demoLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
        showcaseLinks.appendChild(demoLink);
    }
    
    if (project.repositoryUrl) {
        const repoLink = document.createElement('a');
        repoLink.href = project.repositoryUrl;
        repoLink.className = 'showcase-link';
        repoLink.target = '_blank';
        repoLink.innerHTML = '<i class="fab fa-github"></i> Repository';
        showcaseLinks.appendChild(repoLink);
    }
    
    // Show showcase with animation
    document.body.style.overflow = 'hidden'; // Prevent body scrolling
    projectsShowcase.classList.add('active');
    
    // Apply blur-in animation to showcase content
    const showcaseContent = projectsShowcase.querySelector('.showcase-content');
    showcaseContent.classList.add('blur-in');
}

// Load experiences with timeline animation
function loadExperiences(experiences) {
    const timelineContainer = document.getElementById('experience-timeline');
    timelineContainer.innerHTML = '';
    
    // Sort experiences by date (newest first)
    experiences.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB - dateA;
    });
    
    // Create timeline items with animations
    experiences.forEach((experience, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`;
        timelineItem.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
        timelineItem.setAttribute('data-aos-delay', index * 100);
        
        // Format dates
        const startDate = formatDate(experience.startDate);
        const endDate = experience.current ? 'Present' : (experience.endDate ? formatDate(experience.endDate) : '');
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${startDate} - ${endDate}</div>
                <h3 class="timeline-title">${experience.position}</h3>
                <h4 class="timeline-subtitle">${experience.company}${experience.location ? ` | ${experience.location}` : ''}</h4>
                <p class="timeline-description">${experience.description || ''}</p>
                
                ${experience.achievements && experience.achievements.length > 0 ? 
                    `<h5>Key Achievements:</h5>
                    <ul class="timeline-list">
                        ${experience.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>` : ''}
                
                ${experience.technologies && experience.technologies.length > 0 ? 
                    `<div class="timeline-tags">
                        ${experience.technologies.map(tech => `<span class="timeline-tag">${tech}</span>`).join('')}
                    </div>` : ''}
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Load education with timeline animation
function loadEducation(educationItems) {
    const timelineContainer = document.getElementById('education-timeline');
    timelineContainer.innerHTML = '';
    
    // Sort education by date (newest first)
    educationItems.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB - dateA;
    });
    
    // Create timeline items with animations
    educationItems.forEach((education, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`;
        timelineItem.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
        timelineItem.setAttribute('data-aos-delay', index * 100);
        
        // Format dates
        const startDate = formatDate(education.startDate);
        const endDate = education.endDate ? formatDate(education.endDate) : '';
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${startDate} - ${endDate}</div>
                <h3 class="timeline-title">${education.degree}${education.field ? ` in ${education.field}` : ''}</h3>
                <h4 class="timeline-subtitle">${education.institution}${education.location ? ` | ${education.location}` : ''}</h4>
                <p class="timeline-description">${education.description || ''}</p>
                
                ${education.gpa ? `<p><strong>GPA:</strong> ${education.gpa}</p>` : ''}
                
                ${education.achievements && education.achievements.length > 0 ? 
                    `<h5>Achievements:</h5>
                    <ul class="timeline-list">
                        ${education.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>` : ''}
                
                ${education.courses && education.courses.length > 0 ? 
                    `<h5>Key Courses:</h5>
                    <ul class="timeline-list">
                        ${education.courses.map(course => `<li>${course}</li>`).join('')}
                    </ul>` : ''}
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Format a date string
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short' };
    try {
        return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
        return dateString;
    }
}

// Navigation and section switching
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Get the target section ID
        const targetId = this.getAttribute('href').substring(1);
        
        // Hide all sections with animation
        sections.forEach(section => {
            if (section.classList.contains('active')) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    section.classList.remove('active');
                    section.style.display = 'none';
                }, 300);
            }
        });
        
        // Show target section with animation
        setTimeout(() => {
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
                
                // Refresh AOS to trigger animations in the new section
                AOS.refresh();
            }, 50);
        }, 350);
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
    });
});

// Mobile menu toggle
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Animate menu bars
    if (mobileMenu.classList.contains('active')) {
        document.querySelectorAll('.bar').forEach((bar, index) => {
            if (index === 0) {
                bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            } else if (index === 1) {
                bar.style.opacity = '0';
            } else if (index === 2) {
                bar.style.transform = 'rotate(-45deg) translate(7px, -8px)';
            }
        });
    } else {
        document.querySelectorAll('.bar').forEach((bar) => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
});

// Back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: this.name.value,
        email: this.email.value,
        subject: this.subject.value,
        message: this.message.value
    };
    
    // In a real application, you would send this data to a server
    // For this static version, just show a success toast
    showToast('Message sent successfully!', 'success');
    
    // Reset form with animation
    this.reset();
    
    // Animate form labels back to default state
    document.querySelectorAll('.form-label').forEach(label => {
        label.classList.remove('active');
    });
});

// Form input animation
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.querySelector('.form-label').classList.add('active');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.querySelector('.form-label').classList.remove('active');
        }
    });
});

// Toast notification function
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Add icon based on type
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Initialize particle background
function initParticles() {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6c63ff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6c63ff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Initialize 3D background animations
function init3DAnimations() {
    if (window.THREE) {
        // Animation for the first background
        const animation1 = document.getElementById('background-animation-1');
        if (animation1) {
            createWaveAnimation(animation1);
        }
        
        // Animation for the second background
        const animation2 = document.getElementById('background-animation-2');
        if (animation2) {
            createParticleAnimation(animation2);
        }
    }
}

// Create 3D wave animation
function createWaveAnimation(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create wave geometry
    const geometry = new THREE.PlaneGeometry(80, 80, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0x6c63ff,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    
    const wave = new THREE.Mesh(geometry, material);
    scene.add(wave);
    
    // Position camera
    camera.position.z = 25;
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        // Update wave vertices
        const time = Date.now() * 0.001;
        const positions = geometry.attributes.position;
        
        for (let i = 0; i < positions.count; i++) {
            const vertex = new THREE.Vector3();
            vertex.fromBufferAttribute(positions, i);
            
            // Wave pattern
            const waveX = 0.5 * Math.sin(vertex.x * 0.3 + time);
            const waveY = 0.5 * Math.sin(vertex.y * 0.3 + time);
            
            vertex.z = waveX + waveY;
            
            // Update position
            positions.setZ(i, vertex.z);
        }
        
        positions.needsUpdate = true;
        
        // Rotate the wave
        wave.rotation.x = Math.PI / 4;
        wave.rotation.z += 0.005;
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    });
    
    animate();
}

// Create 3D particle animation
function createParticleAnimation(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 5000;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color(0x6c63ff);
    const color2 = new THREE.Color(0xff6584);
    
    for (let i = 0; i < particleCount; i++) {
        // Position
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        
        // Color - gradient from color1 to color2
        const mixed = color1.clone().lerp(color2, Math.random());
        colors[i * 3] = mixed.r;
        colors[i * 3 + 1] = mixed.g;
        colors[i * 3 + 2] = mixed.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Position camera
    camera.position.z = 30;
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    });
    
    animate();
}