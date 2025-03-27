// This file contains the data for your portfolio
// Edit this file to update your information

const portfolioData = {
    // Portfolio Owner Information
    owner: {
        name: "Alaeto Ikechukwu Miracle",
        jobTitle: "Professional Title",
        location: "Ibadan, Nigeria",
        email: "ikechukwualaeto@gmail.com",
        phone: "+234 (807) 880-0552",
        website: "https://yourwebsite.com",
        profileImage: "images/slay.jpeg",
        shortBio: "A brief introduction about yourself.",
        longBio: "A more detailed biography explaining your background, experience, and what drives you professionally. This is your chance to tell your story and connect with visitors to your portfolio.",
        tagline: "Your professional tagline or motto",
        socialLinks: {
            linkedin: "https://linkedin.com/in/yourusername",
            github: "https://github.com/yourusername",
            twitter: "https://twitter.com/yourusername",
            // Add more social links as needed
        },
        interests: [
            "Interest 1",
            "Interest 2",
            "Interest 3",
            "Interest 4",
            "Interest 5"
        ],
        availability: "Available for freelance opportunities",
        services: [
            "Service 1",
            "Service 2",
            "Service 3",
            "Service 4"
        ]
    },
    
    // Skills
    skills: [
        {
            name: "Web Development",
            proficiency: 90,
            yearsOfExperience: 5,
            category: "Development",
            description: "Building responsive and accessible websites using modern technologies.",
            icon: "fa-code",
            featured: true,
            tags: ["HTML", "CSS", "JavaScript"]
        },
        {
            name: "UI/UX Design",
            proficiency: 85,
            yearsOfExperience: 4,
            category: "Design",
            description: "Creating user-centered designs with focus on usability and aesthetics.",
            icon: "fa-paint-brush",
            featured: true,
            tags: ["Figma", "Adobe XD", "User Research"]
        },
        {
            name: "Mobile Development",
            proficiency: 75,
            yearsOfExperience: 3,
            category: "Development",
            description: "Building cross-platform mobile applications.",
            icon: "fa-mobile-alt",
            featured: false,
            tags: ["React Native", "Flutter"]
        },
        {
            name: "Database Management",
            proficiency: 80,
            yearsOfExperience: 4,
            category: "Backend",
            description: "Designing and optimizing database schemas and queries.",
            icon: "fa-database",
            featured: false,
            tags: ["SQL", "NoSQL", "MongoDB"]
        }
        // Add more skills here
    ],
    
    // Projects
    projects: [
        {
            title: "Project 1",
            description: "A brief description of the project and what it accomplishes.",
            longDescription: "A more detailed explanation of the project, including challenges overcome and technologies used.",
            image: "images/placeholder.png",
            tags: ["Web", "React", "Node.js"],
            startDate: "2022-01",
            endDate: "2022-03",
            url: "https://project1.example.com",
            repositoryUrl: "https://github.com/yourusername/project1",
            featured: true,
            technologies: ["React", "Node.js", "MongoDB"],
            highlights: ["Feature 1", "Feature 2", "Feature 3"],
            category: "Web Development"
        },
        {
            title: "Project 2",
            description: "A brief description of the project and what it accomplishes.",
            longDescription: "A more detailed explanation of the project, including challenges overcome and technologies used.",
            image: "images/placeholder.png",
            tags: ["Mobile", "React Native"],
            startDate: "2021-09",
            endDate: "2021-12",
            url: "https://project2.example.com",
            repositoryUrl: "https://github.com/yourusername/project2",
            featured: true,
            technologies: ["React Native", "Firebase"],
            highlights: ["Feature 1", "Feature 2", "Feature 3"],
            category: "Mobile Development"
        }
        // Add more projects here
    ],
    
    // Work Experience
    experiences: [
        {
            company: "Company Name",
            position: "Your Position",
            location: "City, Country",
            startDate: "2020-01",
            endDate: "2023-01",
            current: false,
            description: "Description of your role and responsibilities at this company.",
            achievements: [
                "Achievement 1",
                "Achievement 2",
                "Achievement 3"
            ],
            technologies: ["Technology 1", "Technology 2", "Technology 3"],
            logo: "images/placeholder.png",
            website: "https://company.example.com",
            industry: "Industry"
        },
        {
            company: "Previous Company",
            position: "Previous Position",
            location: "City, Country",
            startDate: "2018-06",
            endDate: "2019-12",
            current: false,
            description: "Description of your role and responsibilities at this company.",
            achievements: [
                "Achievement 1",
                "Achievement 2"
            ],
            technologies: ["Technology 1", "Technology 2"],
            logo: "images/placeholder.png",
            website: "https://previous-company.example.com",
            industry: "Industry"
        }
        // Add more experience entries here
    ],
    
    // Education
    education: [
        {
            institution: "University of Ibadan",
            degree: "B.Sc.",
            field: "Petroleum Engineering",
            startDate: "2014-09",
            endDate: "2019-05",
            location: "Ibadan, Nigeria",
            description: "Description of your education experience.",
            achievements: [
                "Achievement 1",
                "Achievement 2"
            ],
            gpa: "3.8/4.0",
            courses: ["Course 1", "Course 2", "Course 3"],
            logo: "images/University of Ibadan.jpeg",
            website: "https://university.example.com"
        },
        {
            institution: "Another Institution",
            degree: "Another Degree or Certification",
            field: "Field of Study",
            startDate: "2013-01",
            endDate: "2013-12",
            location: "City, Country",
            description: "Description of this educational experience.",
            achievements: [
                "Achievement 1"
            ],
            courses: ["Course 1", "Course 2"],
            logo: "images/placeholder.png",
            website: "https://institution.example.com"
        }
        // Add more education entries here
    ],
    
    // Achievements and Certifications
    achievements: [
        {
            title: "Achievement Title",
            issuer: "Issuing Organization",
            date: "2022-05",
            description: "Description of the achievement or certification.",
            url: "https://achievement.example.com",
            image: "images/placeholder.png",
            featured: true,
            category: "Certification"
        },
        {
            title: "Another Achievement",
            issuer: "Issuing Organization",
            date: "2021-08",
            description: "Description of the achievement or certification.",
            url: "https://another-achievement.example.com",
            image: "images/placeholder.png",
            featured: false,
            category: "Award"
        }
        // Add more achievements here
    ]
};