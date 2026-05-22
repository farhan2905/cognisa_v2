import { Code2, Cpu, Network, Database } from 'lucide-react';

export const servicesData = [
  {
    slug: 'web-development',
    title: 'Website & Web Apps',
    category: 'Engineering',
    icon: Code2,
    color: '#0891b2',
    shortDescription: 'High-performance, scalable web applications built with modern frameworks.',
    fullDescription: 'We engineer highly scalable, custom web applications tailored exactly to your business needs. Forget template-based websites; we build React-based architectures (Next.js) that offer sub-second load times, dynamic data routing, and seamless user experiences.',
    features: [
      { title: 'Custom Front-end', desc: 'Bespoke UI/UX built with React, Next.js, and Tailwind CSS.' },
      { title: 'Complex Workflows', desc: 'Secure user authentication, payment gateways, and custom dashboards.' },
      { title: 'SEO Optimized', desc: 'Server-side rendering for optimal search engine visibility.' },
    ],
    subservices: ['Custom Web Applications', 'API Integration', 'Legacy System Modernization', 'E-Commerce & Portals'],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    slug: 'ai-automation',
    title: 'AI & Automation',
    category: 'Intelligence',
    icon: Cpu,
    color: '#10b981',
    shortDescription: 'Custom AI agents and automated workflows to eliminate manual tasks.',
    fullDescription: 'Stop wasting hours on repetitive tasks. We integrate custom LLMs (Large Language Models) and advanced API automations directly into your workflow to handle customer support, data processing, and document generation automatically.',
    features: [
      { title: 'Custom AI Agents', desc: 'Intelligent bots trained on your specific business data.' },
      { title: 'Workflow Automation', desc: 'Seamlessly connect your CRM, emails, and internal tools.' },
      { title: 'Data Processing', desc: 'Automated data extraction and formatting from unstructured documents.' },
    ],
    subservices: ['Workflow Automation', 'Custom AI Agents', 'Data Processing Pipelines', 'Automated Support'],
    techStack: ['OpenAI API', 'Python', 'LangChain', 'Vercel AI SDK', 'Make/Zapier'],
  },
  {
    slug: 'system-architecture',
    title: 'System Architecture',
    category: 'Infrastructure',
    icon: Network,
    color: '#1d4ed8',
    shortDescription: 'Robust system design ensuring zero downtime and infinite scalability.',
    fullDescription: 'A beautiful front-end is useless if the servers crash under load. We design and deploy robust, microservice-based system architectures that can handle millions of requests while maintaining strict security protocols.',
    features: [
      { title: 'Scalable Databases', desc: 'Optimized PostgreSQL and NoSQL database structures.' },
      { title: 'Microservices', desc: 'Decoupled services for maximum reliability and ease of updates.' },
      { title: 'API Development', desc: 'Secure, high-performance REST and GraphQL APIs.' },
    ],
    subservices: ['Scalable Databases', 'Microservices', 'API Development', 'Load Balancing'],
    techStack: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    slug: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    category: 'DevOps',
    icon: Database,
    color: '#06b6d4',
    shortDescription: 'Secure, managed cloud deployments optimized for cost and speed.',
    fullDescription: 'We manage your entire cloud ecosystem. From initial server setup to continuous integration and delivery (CI/CD) pipelines, we ensure your application runs smoothly on AWS, GCP, or modern edge networks.',
    features: [
      { title: 'Managed Hosting', desc: 'End-to-end management of your servers and databases.' },
      { title: 'CI/CD Pipelines', desc: 'Automated testing and zero-downtime deployments.' },
      { title: 'Security & Compliance', desc: 'Strict firewall rules, DDOS protection, and daily backups.' },
    ],
    subservices: ['Managed Hosting', 'CI/CD Pipelines', 'Security & Compliance', 'Edge Networks'],
    techStack: ['AWS', 'Google Cloud', 'Vercel', 'GitHub Actions', 'Terraform'],
  }
];
