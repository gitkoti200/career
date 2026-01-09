export const roadmapData = {
  'software-engineer': {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Full-stack developer with expertise in web, mobile, and backend technologies',
    matchScore: 85,
    skills: {
      current: ['JavaScript', 'React', 'REST APIs', 'Git'],
      required: ['JavaScript', 'React', 'Node.js', 'Databases', 'System Design', 'DevOps'],
      missing: ['Node.js', 'System Design', 'DevOps', 'Docker', 'CI/CD']
    },
    roadmap: [
      {
        month: 'Month 1-2',
        title: 'JavaScript Advanced Concepts',
        skills: ['ES6+', 'Promises', 'Async/Await'],
        courses: [
          { name: 'Complete JavaScript Course 2024', platform: 'Udemy', duration: '30h' },
          { name: 'JavaScript Algorithms', platform: 'FreeCodeCamp', duration: '25h' }
        ]
      },
      {
        month: 'Month 3-4',
        title: 'Node.js & Express Backend',
        skills: ['Node.js', 'Express.js', 'REST APIs'],
        courses: [
          { name: 'Complete Node.js Developer', platform: 'Udemy', duration: '25h' }
        ]
      },
      {
        month: 'Month 5-6',
        title: 'Databases & Data Design',
        skills: ['SQL', 'MongoDB', 'ORM'],
        courses: [
          { name: 'SQL & Database Design', platform: 'Coursera', duration: '20h' }
        ]
      },
      {
        month: 'Month 7-8',
        title: 'System Design & Architecture',
        skills: ['System Design', 'Scalability'],
        courses: [
          { name: 'System Design Interview', platform: 'Educative', duration: '20h' }
        ]
      },
      {
        month: 'Month 9-10',
        title: 'DevOps & Deployment',
        skills: ['Docker', 'Kubernetes', 'CI/CD'],
        courses: [
          { name: 'Docker & Kubernetes', platform: 'Udemy', duration: '15h' }
        ]
      }
    ]
  },
  'data-scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Expert in data analysis, machine learning, and AI solutions',
    matchScore: 75,
    skills: {
      current: ['Python', 'Statistics', 'SQL'],
      required: ['Python', 'ML', 'Deep Learning', 'SQL'],
      missing: ['ML', 'Deep Learning', 'TensorFlow']
    },
    roadmap: [
      {
        month: 'Month 1-2',
        title: 'Python & Data Structures',
        skills: ['Python', 'NumPy', 'Pandas'],
        courses: [
          { name: 'Python for Data Science', platform: 'DataCamp', duration: '20h' }
        ]
      },
      {
        month: 'Month 3-5',
        title: 'Machine Learning Fundamentals',
        skills: ['ML Algorithms', 'Model Evaluation'],
        courses: [
          { name: 'ML Specialization', platform: 'Coursera', duration: '50h' }
        ]
      },
      {
        month: 'Month 6-8',
        title: 'Deep Learning',
        skills: ['Neural Networks', 'TensorFlow'],
        courses: [
          { name: 'Deep Learning Specialization', platform: 'Coursera', duration: '40h' }
        ]
      }
    ]
  },
  'ui-ux-designer': {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    description: 'Create beautiful and intuitive user experiences',
    matchScore: 80,
    skills: {
      current: ['Design Thinking', 'Wireframing'],
      required: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
      missing: ['Figma', 'Prototyping', 'User Testing', 'Design Systems']
    },
    roadmap: [
      {
        month: 'Month 1-2',
        title: 'UI/UX Design Fundamentals',
        skills: ['Design Principles', 'Color Theory', 'Typography'],
        courses: [
          { name: 'Fundamentals of Design', platform: 'Coursera', duration: '20h' }
        ]
      },
      {
        month: 'Month 3-4',
        title: 'Figma & Design Tools',
        skills: ['Figma', 'Prototyping', 'Components'],
        courses: [
          { name: 'Figma Advanced Course', platform: 'Udemy', duration: '18h' }
        ]
      },
      {
        month: 'Month 5-6',
        title: 'User Research & Testing',
        skills: ['User Research', 'A/B Testing', 'Usability'],
        courses: [
          { name: 'UX Research Methods', platform: 'Interaction Design', duration: '15h' }
        ]
      }
    ]
  },
  'ai-engineer': {
    id: 'ai-engineer',
    title: 'AI Engineer',
    description: 'Build AI applications with LLMs and generative AI',
    matchScore: 70,
    skills: {
      current: ['Python', 'ML'],
      required: ['LLMs', 'Prompt Engineering', 'RAG'],
      missing: ['LLM Fine-tuning', 'RAG', 'Vector DB']
    },
    roadmap: [
      {
        month: 'Month 1-2',
        title: 'LLM Fundamentals',
        skills: ['Transformers', 'Attention'],
        courses: [
          { name: 'Transformers Course', platform: 'HF', duration: '20h' }
        ]
      },
      {
        month: 'Month 3-5',
        title: 'RAG & Vector Databases',
        skills: ['RAG', 'Vector DB', 'Embeddings'],
        courses: [
          { name: 'RAG Systems', platform: 'DeepLearning.AI', duration: '20h' }
        ]
      }
    ]
  },
  'cloud-engineer': {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    description: 'Cloud infrastructure and DevOps expert',
    matchScore: 78,
    skills: {
      current: ['Linux', 'Docker'],
      required: ['AWS', 'Kubernetes', 'IaC'],
      missing: ['AWS Solutions', 'Terraform', 'CI/CD']
    },
    roadmap: [
      {
        month: 'Month 1-3',
        title: 'AWS Fundamentals',
        skills: ['EC2', 'S3', 'VPC'],
        courses: [
          { name: 'AWS Solutions Architect', platform: 'A Cloud Guru', duration: '30h' }
        ]
      }
    ]
  },
  'product-manager': {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Lead product strategy and development',
    matchScore: 72,
    skills: {
      current: ['Project Management', 'Analytics'],
      required: ['Product Strategy', 'Data Analysis', 'Roadmapping'],
      missing: ['Product Strategy', 'Advanced Analytics']
    },
    roadmap: [
      {
        month: 'Month 1-2',
        title: 'Product Fundamentals',
        skills: ['Product Strategy', 'Roadmapping'],
        courses: [
          { name: 'Intro to Product Management', platform: 'Reforge', duration: '15h' }
        ]
      }
    ]
  }
};

export default roadmapData;
