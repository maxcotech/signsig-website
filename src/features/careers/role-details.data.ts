import type { RoleDetail } from "@/features/careers/careers.data";

/**
 * Full job descriptions, transcribed from the content document (2026-08-26).
 *
 * Split out from `careers.data.ts` so both stay under the 150-line ceiling —
 * this is the part that grows as roles are added.
 */
export const ROLE_DETAILS: Record<string, RoleDetail> = {
  "senior-backend-engineer": {
    about:
      "Build and scale SignSig's backend infrastructure. You'll work on critical systems for document processing, signature verification, and compliance. You'll design APIs, optimize databases, and ensure the platform remains secure and reliable at scale.",
    responsibilities: [
      "Design and build scalable backend systems",
      "Optimize database queries and performance",
      "Implement security best practices",
      "Build APIs for customers and partners",
      "Contribute to architecture decisions",
    ],
    requiredSkills: [
      "5+ years backend development experience",
      "Proficiency in Node.js, Python, or Go",
      "Experience with relational databases (PostgreSQL, MySQL)",
      "Understanding of security and encryption",
      "Experience with cloud infrastructure (AWS, GCP)",
    ],
    niceToHave: [
      "Experience with digital signatures or cryptography",
      "Experience with compliance requirements (GDPR, HIPAA, SOC 2)",
      "Open-source contributions",
      "Experience with microservices architecture",
    ],
  },

  "product-manager": {
    about:
      "Define the future of SignSig. As a Product Manager, you'll own the roadmap for a major product area, work with engineers and designers, talk to customers, and make decisions about what to build next.",
    responsibilities: [
      "Define product strategy and roadmap",
      "Gather requirements from customers and stakeholders",
      "Work with engineering and design teams",
      "Prioritize features and improvements",
      "Measure product success with metrics and analytics",
    ],
    requiredSkills: [
      "3+ years product management experience",
      "Ability to communicate with technical and non-technical audiences",
      "Experience with data analysis and metrics",
      "Strong problem-solving and communication skills",
      "Comfortable with ambiguity and iteration",
    ],
    niceToHave: [
      "Experience in SaaS or security products",
      "Understanding of compliance or regulated industries",
      "Customer interview and user research experience",
      "Familiarity with e-signature or document management",
    ],
  },

  "security-engineer": {
    about:
      "Build security into everything we do. As a Security Engineer, you'll design security architecture, conduct threat modeling, manage compliance certifications (SOC 2, ISO 27001), and help the team stay ahead of security threats.",
    responsibilities: [
      "Design security architecture and controls",
      "Conduct threat modeling and risk assessment",
      "Manage SOC 2 and ISO 27001 compliance",
      "Perform security reviews of code and systems",
      "Respond to and remediate security incidents",
      "Build security automation and tooling",
    ],
    requiredSkills: [
      "4+ years security engineering experience",
      "Deep understanding of authentication and encryption",
      "Experience with compliance frameworks (SOC 2, ISO 27001, GDPR)",
      "Knowledge of web application and cloud security",
      "Experience with security tools and monitoring",
    ],
    niceToHave: [
      "CISSP or similar certification",
      "Experience with incident response",
      "Knowledge of cryptography and digital signatures",
      "Experience with healthcare or government security requirements",
    ],
  },

  "devops-engineer": {
    about:
      "Build and maintain the infrastructure that powers SignSig. You'll manage cloud infrastructure, set up CI/CD pipelines, implement monitoring and alerting, and ensure our systems are reliable, secure, and scalable.",
    responsibilities: [
      "Manage AWS infrastructure and cloud architecture",
      "Build and maintain CI/CD pipelines",
      "Implement monitoring, logging, and alerting",
      "Manage databases and backups",
      "Improve system reliability and performance",
      "Automate operational tasks",
    ],
    requiredSkills: [
      "3+ years DevOps or infrastructure experience",
      "Proficiency with AWS (EC2, RDS, S3, Lambda)",
      "Experience with Kubernetes or Docker",
      "Experience with CI/CD tools (GitHub Actions, GitLab CI)",
      "Scripting skills (Python, Bash)",
      "Monitoring and logging tools (Datadog, ELK, etc.)",
    ],
    niceToHave: [
      "Experience with Terraform or Infrastructure as Code",
      "Background in security infrastructure",
      "Experience with disaster recovery and high availability",
      "Knowledge of PostgreSQL or relational databases",
    ],
  },

  "customer-support-specialist": {
    about:
      "Be the face of SignSig to our customers. As a Support Specialist, you'll help customers solve problems, answer questions, and share feedback with the product team to improve SignSig.",
    responsibilities: [
      "Respond to customer support inquiries",
      "Troubleshoot technical issues",
      "Document solutions and create knowledge base articles",
      "Share customer feedback with product and engineering teams",
      "Maintain support SLAs and customer satisfaction",
    ],
    requiredSkills: [
      "2+ years customer support or success experience",
      "Excellent communication and empathy",
      "Problem-solving and troubleshooting skills",
      "Ability to explain technical concepts to non-technical users",
      "Organized and detail-oriented",
      "Comfortable with support tools and ticketing systems",
    ],
    niceToHave: [
      "Experience supporting SaaS products",
      "Knowledge of security or compliance concepts",
      "Ability to create documentation and tutorials",
      "Multilingual skills",
    ],
  },
};
