const OpenAI = require('openai');
const supabase = require('../config/supabase');

const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

// ==========================================
// EXPANDED MOCK DATA REPOSITORY
// ==========================================

const CAREER_DATABASE = {
    "Data Science": {
        role: "Data Scientist",
        description: "Analyze complex data to help make decisions.",
        skills: ["Python", "SQL", "Machine Learning", "Pandas", "Statistics"],
        salary: "$120,000"
    },
    "Web Development": {
        role: "Full Stack Developer",
        description: "Build end-to-end web applications.",
        skills: ["React", "Node.js", "CSS", "Database Design", "API Development"],
        salary: "$105,000"
    },
    "Artificial Intelligence": {
        role: "AI Engineer",
        description: "Develop intelligent agents and neural networks.",
        skills: ["TensorFlow", "PyTorch", "Deep Learning", "NLP", "Python"],
        salary: "$135,000"
    },
    "UI/UX Design": {
        // Changed from 'Product Designer' to 'UI/UX Designer' to match user expectation
        role: "UI/UX Designer",
        description: "Design intuitive and beautiful user interfaces.",
        skills: ["Figma", "Wireframing", "User Research", "Prototyping", "Color Theory"],
        salary: "$95,000"
    },
    "Cybersecurity": {
        role: "Cybersecurity Analyst",
        description: "Protect systems and networks from threats.",
        skills: ["Network Security", "Ethical Hacking", "Cryptography", "Linux", "Risk Analysis"],
        salary: "$115,000"
    },
    "Product Management": {
        role: "Product Manager",
        description: "Guide the success of a product and lead cross-functional teams.",
        skills: ["Agile/Scrum", "Strategy", "User Stories", "Roadmapping", "Data Analysis"],
        salary: "$125,000"
    }
};

const DETAILED_ROADMAPS = {
    "UI/UX Designer": [
        {
            week: 1,
            topic: "Introduction to UI/UX",
            action: "Understand the difference between UI and UX.",
            resources: [
                { title: "Google UX Design Certificate", type: "Course", link: "https://www.coursera.org/professional-certificates/google-ux-design" },
                { title: "What is UX Design? (YouTube)", type: "Video", link: "https://www.youtube.com/watch?v=Um3BhY0oS2c" }
            ],
            details: "Focus on user-centric design principles, accessibility, and the design thinking process."
        },
        {
            week: 2,
            topic: "Figma Fundamentals",
            action: "Master the industry standard tool.",
            resources: [
                { title: "Figma 101: Crash Course", type: "Video", link: "https://www.youtube.com/watch?v=FTFaQWZBqQ8" },
                { title: "Figma Community Files", type: "Project", link: "https://www.figma.com/community" }
            ],
            details: "Learn frames, constraints, auto-layout, and components properties."
        },
        {
            week: 3,
            topic: "Wireframing & Prototyping",
            action: "Create low and high fidelity mockups.",
            resources: [{ title: "Wireframing for Beginners", type: "Article", link: "https://bootcamp.uxdesign.cc/wireframing-for-beginners-5a827453d053" }],
            details: "Practice creating user flows and clickable prototypes to test interactions."
        },
        {
            week: 4,
            topic: "Visual Design",
            action: "Typography, Color, and Layout.",
            resources: [{ title: "Refactoring UI", type: "Book", link: "https://www.refactoringui.com/" }],
            details: "Apply the 8pt grid system and create a consistent visual language."
        }
    ],
    "Full Stack Developer": [
        {
            week: 1,
            topic: "Frontend Foundations",
            action: "HTML5, CSS3, and JavaScript.",
            resources: [{ title: "MDN Web Docs", type: "Guide", link: "https://developer.mozilla.org/en-US/" }],
            details: "Build a responsive portfolio website using Flexbox and Grid."
        },
        {
            week: 2,
            topic: "React Ecosystem",
            action: "Hooks, Router, and Context.",
            resources: [{ title: "React Docs", type: "Docs", link: "https://react.dev/" }],
            details: "Create a interactive dashboard fetching data from an API."
        },
        { week: 3, topic: "Backend with Node.js", action: "Express & REST APIs", resources: [{ title: "Node.js Crash Course", type: "Video", link: "https://www.youtube.com/watch?v=fBNz5xF-Kx4" }, { title: "Express.js Guide", type: "Docs", link: "https://expressjs.com/en/starter/installing.html" }], details: "Build your own API server." },
        { week: 4, topic: "Database", action: "SQL vs NoSQL", resources: [{ title: "PostgreSQL Tutorial", type: "Course", link: "https://www.postgresqltutorial.com/" }, { title: "Supabase Docs", type: "Docs", link: "https://supabase.com/docs" }], details: "Connect your app to Supabase (PostgreSQL)." }
    ],
    "Data Scientist": [
        { week: 1, topic: "Python for Data", action: "Pandas & NumPy.", resources: [{ title: "Kaggle Python Course", type: "Course", link: "https://www.kaggle.com/learn/python" }], details: "Clean a real-world CSV dataset." },
        { week: 2, topic: "Visualization", action: "Matplotlib.", resources: [{ title: "Matplotlib Tutorials", type: "Docs", link: "https://matplotlib.org/stable/tutorials/index.html" }, { title: "Data Visualization with Python", type: "Course", link: "https://www.coursera.org/learn/python-plotting" }], details: "Create charts to tell a story." },
        { week: 3, topic: "Machine Learning Concepts", action: "Supervised Learning.", resources: [{ title: "Machine Learning by Andrew Ng", type: "Course", link: "https://www.coursera.org/specializations/machine-learning-introduction" }, { title: "Scikit-Learn Docs", type: "Docs", link: "https://scikit-learn.org/stable/user_guide.html" }], details: "Predict housing prices using Linear Regression." },
        { week: 4, topic: "Deep Learning Intro", action: "Neural Networks.", resources: [{ title: "Deep Learning Specialization", type: "Course", link: "https://www.coursera.org/specializations/deep-learning" }, { title: "TensorFlow Quickstart", type: "Docs", link: "https://www.tensorflow.org/tutorials/quickstart/beginner" }], details: "Build a simple classifier with TensorFlow." }
    ],
    "AI Engineer": [
        { week: 1, topic: "Neural Networks", action: "Perceptrons & Backprop.", resources: [{ title: "Neural Networks from Scratch", type: "Video", link: "https://www.youtube.com/watch?v=WOxAtm54CTA" }, { title: "Deep Learning Book", type: "Book", link: "https://www.deeplearningbook.org/" }], details: "Understand the math behind AI." },
        { week: 2, topic: "PyTorch Basics", action: "Tensors & Autograd.", resources: [{ title: "PyTorch 60min Blitz", type: "Guide", link: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html" }], details: "Implement a digit recognizer." },
        { week: 3, topic: "Transformers", action: "Attention Mechanisms.", resources: [{ title: "Attention Is All You Need", type: "Paper", link: "https://arxiv.org/abs/1706.03762" }, { title: "Hugging Face Course", type: "Course", link: "https://huggingface.co/course/chapter1/1" }], details: "Fine-tune a BERT model." },
        { week: 4, topic: "LLMs", action: "Prompt Engineering.", resources: [{ title: "ChatGPT Prompt Engineering", type: "Course", link: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/" }, { title: "OpenAI API Docs", type: "Docs", link: "https://platform.openai.com/docs/introduction" }], details: "Build a chatbot using OpenAI API." }
    ],
    "Cybersecurity Analyst": [
        { week: 1, topic: "Networking Basics", action: "TCP/IP & OSI Model.", resources: [{ title: "Network Fundamentals (NetworkChuck)", type: "Video", link: "https://www.youtube.com/watch?v=IPvYjXCsTg8" }, { title: "Cisco Networking Academy", type: "Course", link: "https://www.netacad.com/courses/networking/networking-basics" }], details: "Analyze packet traffic with Wireshark." },
        { week: 2, topic: "Linux Security", action: "Permissions & Hardening.", resources: [{ title: "Linux Hardening Guide", type: "Guide", link: "https://www.lifewire.com/harden-linux-server-4178243" }, { title: "Linux Journey", type: "Course", link: "https://linuxjourney.com/" }], details: "Secure a Linux server instance." },
        { week: 3, topic: "Ethical Hacking", action: "Penetration Testing.", resources: [{ title: "The Cyber Mentor - PH Course", type: "Video", link: "https://www.youtube.com/watch?v=3Kq1MIfTWCE" }, { title: "Kali Linux Documentation", type: "Docs", link: "https://www.kali.org/docs/" }], details: "Perform a vulnerability scan." },
        { week: 4, topic: "Cryptography", action: "Encryption Standards.", resources: [{ title: "Applied Cryptography", type: "Book", link: "https://www.schneier.com/books/applied_cryptography/" }, { title: "Coursera Cryptography I", type: "Course", link: "https://www.coursera.org/learn/crypto" }], details: "Implement SSL/TLS." }
    ],
    "Product Manager": [
        { week: 1, topic: "Product Lifecycle", action: "Idea to Launch.", resources: [{ title: "Product Management 101", type: "Article", link: "https://www.atlassian.com/agile/product-management" }, { title: "Inspired by Marty Cagan", type: "Book", link: "https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love/" }], details: "Create a Product Requirement Document (PRD)." },
        { week: 2, topic: "Agile & Scrum", action: "Sprints & Standups.", resources: [{ title: "Scrum Guide", type: "Docs", link: "https://scrumguides.org/" }, { title: "Agile Crash Course", type: "Video", link: "https://www.youtube.com/watch?v=Z9QbYZh1YXY" }], details: "Run a simulated sprint planning session." },
        { week: 3, topic: "User Research", action: "Interviews & Personas.", resources: [{ title: "User Research Basics", type: "Guide", link: "https://www.usability.gov/what-and-why/user-research.html" }, { title: "Mom Test", type: "Book", link: "http://mwl.io/the-mom-test" }], details: "Conduct user interviews and map insights." },
        { week: 4, topic: "Metrics & Analytics", action: "KPIs & Success.", resources: [{ title: "Lean Analytics", type: "Book", link: "http://leananalyticsbook.com/" }, { title: "Product Metrics Guide", type: "Article", link: "https://mixpanel.com/topics/product-metrics/" }], details: "Define success metrics for a feature." }
    ]
};

// ==========================================
// SERVICE FUNCTIONS
// ==========================================

async function analyzeResume(userId, text) {
    const skills = [];
    const lower = text.toLowerCase();

    ['python', 'java', 'javascript', 'react', 'node', 'sql', 'figma', 'aws', 'docker', 'css', 'html'].forEach(s => {
        if (lower.includes(s)) skills.push(s.charAt(0).toUpperCase() + s.slice(1));
    });

    if (skills.length === 0) skills.push("General Tech");

    // Safety Check: Ensure the user exists in user_profiles before inserting resume
    // This handles cases where the Supabase trigger might have failed or not been set up.
    const { data: profile } = await supabase.from('user_profiles').select('id').eq('id', userId).single();
    if (!profile) {
        console.log(`Creating missing profile for user ${userId}`);
        await supabase.from('user_profiles').insert([{ id: userId, created_at: new Date() }]);
    }

    const { error } = await supabase
        .from('resumes')
        .insert([{ user_id: userId, resume_text: text, extracted_skills: skills }]);

    if (error) console.error("Supabase Error (Resume):", error.message);

    return { skills };
}

async function recommendCareers(userId, userProfile) {
    const { interests, extractedSkills } = userProfile;

    let recommendations = [];

    // Prioritize selected interests
    interests.forEach(interest => {
        if (CAREER_DATABASE[interest]) {
            const data = CAREER_DATABASE[interest];

            // Basic Score Calculation
            let score = 75;
            // Boost if resume has relevant skills
            const hasSkill = data.skills.some(req =>
                extractedSkills.some(usr => usr.toLowerCase().includes(req.toLowerCase()))
            );
            if (hasSkill) score += 15;

            if (score > 98) score = 98;

            recommendations.push({
                role: data.role,
                match: score,
                description: data.description,
                missingSkills: data.skills.filter(s => !extractedSkills.some(us => us.toLowerCase().includes(s.toLowerCase())))
            });
        }
    });

    // Fallback if no specific recommendations found? 
    // Usually frontend validation ensures at least one interest.
    // Ensure we don't return duplicates if logic changes.

    // Default fallback
    if (recommendations.length === 0) {
        recommendations.push({
            role: "Full Stack Developer",
            match: 60,
            description: "A versatile role for building web apps.",
            missingSkills: ["React", "Node.js"]
        });
    }

    // Sort by Match Score
    recommendations.sort((a, b) => b.match - a.match);

    // Save to DB (Clean up old ones? For this demo, just inserting is fine, simplistic)
    // Ideally we should delete old recommendations for this user first
    await supabase.from('career_recommendations').delete().eq('user_id', userId);

    for (const rec of recommendations) {
        // Enrich with courses from Roadmap
        let courses = [];
        let roadmap = DETAILED_ROADMAPS[rec.role];

        // Fallback roadmap lookup if exact match missing (reuse generateRoadmap logic briefly or just simple fallback)
        if (!roadmap) {
            if (rec.role.includes("Data")) roadmap = DETAILED_ROADMAPS["Data Scientist"];
            else if (rec.role.includes("Design")) roadmap = DETAILED_ROADMAPS["UI/UX Designer"];
            else if (rec.role.includes("Security")) roadmap = DETAILED_ROADMAPS["Cybersecurity Analyst"];
            else if (rec.role.includes("Product")) roadmap = DETAILED_ROADMAPS["Product Manager"];
            else roadmap = DETAILED_ROADMAPS["Full Stack Developer"];
        }

        if (roadmap) {
            roadmap.forEach(step => {
                if (step.resources) {
                    courses.push(...step.resources);
                }
            });
        }

        // Limit to top 3 courses per role to avoid clutter
        rec.suggestedCourses = courses.slice(0, 3);

        await supabase.from('career_recommendations').insert({
            user_id: userId,
            role: rec.role,
            match_score: rec.match,
            description: rec.description,
            // We aren't saving courses to DB here to keep schema simple for now, 
            // but we return them to frontend. 
            // If we wanted persistence, we'd add a jsonb column 'suggested_courses'.
        });
    }

    return recommendations;
}

async function generateRoadmap(userId, careerRole) {
    // Explicit lookup
    let steps = DETAILED_ROADMAPS[careerRole];

    if (!steps) {
        // Fallback Logic: Try partial match or default
        console.log(`No exact roadmap for ${careerRole}, using fallback.`);
        if (careerRole.includes("Data")) steps = DETAILED_ROADMAPS["Data Scientist"];
        else if (careerRole.includes("Design")) steps = DETAILED_ROADMAPS["UI/UX Designer"];
        else if (careerRole.includes("Security")) steps = DETAILED_ROADMAPS["Cybersecurity Analyst"];
        else if (careerRole.includes("Product")) steps = DETAILED_ROADMAPS["Product Manager"];
        else steps = DETAILED_ROADMAPS["Full Stack Developer"];
    }

    // Save to DB
    await supabase.from('learning_roadmaps').delete().eq('user_id', userId).eq('career_role', careerRole);

    await supabase.from('learning_roadmaps').insert({
        user_id: userId,
        career_role: careerRole,
        roadmap_data: steps
    });

    return steps;
}

async function chatWithAI(message) {
    const lowerMsg = message.toLowerCase();

    // 1. Check for Real OpenAI
    const hasOpenAI = process.env.OPENAI_API_KEY &&
        process.env.OPENAI_API_KEY !== 'your_openai_api_key' &&
        openai;

    if (hasOpenAI) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful Career Assistant for the AI Career Guidance Platform. Provide concise, encouraging, and expert advice on careers, skills, and job searching." },
                    { role: "user", content: message }
                ],
            });
            return completion.choices[0].message.content;
        } catch (err) {
            console.error("OpenAI Error:", err.message);
            // Fall back to simulation if API fails
        }
    }

    // 2. Smart Simulation Logic

    // Salary & Skill Checks
    for (const [key, data] of Object.entries(CAREER_DATABASE)) {
        if (lowerMsg.includes(key.toLowerCase()) || lowerMsg.includes(data.role.toLowerCase())) {
            if (lowerMsg.includes('salary') || lowerMsg.includes('pay') || lowerMsg.includes('earn') || lowerMsg.includes('money')) {
                return `A ${data.role}'s typical starting salary is around ${data.salary}. This can vary based on location and experience.`;
            }
            if (lowerMsg.includes('skill') || lowerMsg.includes('learn') || lowerMsg.includes('know')) {
                return `To become a ${data.role}, you should focus on mastering: ${data.skills.join(', ')}. Check out our Roadmap tab for a detailed week-by-week guide!`;
            }
        }
    }

    // General Career Phrases
    if (lowerMsg.includes('resume') || lowerMsg.includes('cv')) {
        return "For a great tech resume: focus on quantifiable results (e.g., 'Improved performance by 30%'), list your technical skills clearly, and keep it brief. Have you uploaded your resume to our analyzer yet?";
    }
    if (lowerMsg.includes('interview')) {
        return "Interview tip: Practice the STAR method (Situation, Task, Action, Result) for behavioral questions. For technical roles, be ready to explain your architecture decisions.";
    }
    if (lowerMsg.includes('job') || lowerMsg.includes('market')) {
        return "The tech job market is currently favoring specialists. Deepening your knowledge in areas like Cloud Computing or AI Integration will give you a significant edge.";
    }
    if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
        return "You're very welcome! I'm here to help you succeed in your career journey. Anything else you'd like to know?";
    }
    if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
        return "Hello! I'm your AI Career Assistant. I can help you with salary information, technical skill requirements, resume tips, or navigating your learning roadmap. What's on your mind?";
    }

    // Default Fallback
    return "That's a great question! While my expertise is primarily in career guidance (salaries, skills, and roadmaps), I'm happy to help you with job search strategies. Feel free to ask about specific roles like 'Data Scientist' or 'Web Developer'!";
}

module.exports = { analyzeResume, recommendCareers, generateRoadmap, chatWithAI };
