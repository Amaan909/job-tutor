// temp.js
// Temporary file containing job description, self description, and resume text

const jobDescription = `Title: Engineer II, Software Development
Company: Anaplan
Location: Gurgaon, India

Summary:
Anaplan is looking for a versatile and experienced Senior Fullstack Developer to build and own end-to-end features on their industry-leading AI-infused scenario planning and analysis platform. This is a deeply hands-on role for a talented engineer passionate about working across the entire technology stack, from crafting intuitive user interfaces with React to building robust backend services.

Responsibilities:
- Actively write clean, maintainable, and high-quality code for both front-end (React, TypeScript) and back-end (Python)
- Design, develop, and deploy end-to-end features, taking full ownership from the database to the browser
- Build and maintain scalable backend services, APIs, and data models
- Develop responsive and performant user interfaces using modern front-end technologies
- Collaborate closely with product managers, designers, and other engineers to define and implement solutions
- Participate actively in code reviews across the stack, providing and receiving constructive feedback
- Mentor other developers on full-stack best practices and help elevate the team's technical capabilities

Required Qualifications:
- Strong, hands-on professional experience building complex web applications with React
- Deep proficiency in JavaScript (ES6+) and TypeScript
- Solid experience with state management libraries like Redux, Zustand, or Recoil
- Expertise with testing frameworks such as Jest and React Testing Library
- Strong professional experience in server-side development using Python
- Experience building and consuming RESTful APIs or GraphQL
- Proficiency with both SQL (PostgreSQL, MySQL) and NoSQL databases
- Experience with ORMs like Prisma, TypeORM, or Sequelize
- Experience working with cloud platforms (AWS, Azure, or GCP)
- Excellent problem-solving skills and the ability to work independently

Preferred Qualifications:
- Bachelor's degree in Computer Science, Engineering, or a related technical field
- Experience with containerization (Docker) and orchestration (Kubernetes)
- Familiarity with CI/CD pipelines and infrastructure-as-code (e.g., Terraform)
- Experience in a SaaS or enterprise software environment
- Knowledge of microservices architecture
`;

const selfDescription = `I am a Software Engineer at MAQ Software with 1+ year of experience in full-stack web development and AI automation. I work across the MERN and PERN stacks, with strong proficiency in React, TypeScript, JavaScript, C# .NET, PostgreSQL, and MongoDB. I have built AI agents using MCP servers, developed automated testing frameworks, and resolved security vulnerabilities including XSS, CSRF, and command injection. I hold a B.Tech in Computer Science from NIT Hamirpur with a CGPA of 8.17. My academic projects include a Transformer-based Neural Machine Translation system and a full-stack Classroom Management System with RBAC and real-time analytics.`

const resumeText = `Skills:
Problem Solving: Data Structures and Algorithms in C++
Full Stack Web Development: MERN, PERN, C# .NET, SQL, TypeScript, Playwright, ADO
AI: Agentic AI, MCP servers, SDD framework
Databases: PostgreSQL, SQL Server, MongoDB
Related Coursework: Object Oriented Programming, DBMS, Computer Networks, Operating System, System Design

Experience:
MAQ Software Pvt Ltd (1+ year)
Role: Software Engineer 1
- Full Stack Web development in (C# .NET, JavaScript) - Backend, (HTML, CSS, WPF, ReactJs) - Frontend
- Created AI agents with MCP server integration to access ADO resources using various MCP tools for Playwright automation
- Created SDD (Spec-it) framework with MCP server integration for Playwright automation
- Resolved security vulnerabilities in .NET code: XSS, CSRF attacks, Command Injection, Weak Encryption (DES to AES), Weak Authentication (Captcha, Rate Limiting)
- Extensive use of GitHub Copilot for every stage of SDLC
- Performed Regression testing, Smoke testing, Playwright testing, implemented Feature Flag for testing, created build pipelines

Projects:
Neural Machine Translation using Transformer for low resource language
- Used Transformer-based model to translate English to Urdu and vice versa at word and sub-word level
- Used data-augmentation techniques like back translation and weighted back translation to increase corpus size and improve model accuracy
- Evaluated model performance using the BLEU score
- Score improvement by 22+ points based on state-of-the-art evaluation

Classroom Manager (PERN, shadcn/ui, Refine)
- Role Based Access Control: Supports distinct views and permissions for Students, Teachers, and Admins
- Data Management: Comprehensive CRUD operations for Departments, Subjects, and Classes with advanced filtering, search, and pagination
- Enrollment System: Secure join-code system allowing students to enroll in classes seamlessly
- Dashboard Analytics: Real-time insights into metrics like enrollment trends, user distribution, and subject statistics

Education:
National Institute of Technology, Hamirpur (2021-2025)
B.Tech: Computer Science and Engineering
CGPA: 8.17
`;

module.exports = { jobDescription, selfDescription, resumeText };