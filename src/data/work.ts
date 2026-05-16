export const worksData = [
  {
    slug: 'desh-yatraa',
    number: '01',
    title: 'Desh Yatraa',
    category: 'Travel & Tourism Portal',
    icon: '✈️',
    color: '#6366f1',
    link: 'https://deshyatraa.com',
    shortDescription: 'We engineered a comprehensive travel booking and exploration portal for Desh Yatraa.',
    fullDescription: 'Desh Yatraa approached us with a vision to modernize their legacy booking system. We engineered a comprehensive travel booking and exploration portal from the ground up. The new platform features an intuitive search architecture, seamless booking workflows, and a highly optimized mobile experience that reduced cart abandonment by 40%.',
    outcomes: [
      { metric: '40%', label: 'Decrease in Cart Abandonment' },
      { metric: '3x', label: 'Faster Load Times' },
      { metric: '10k+', label: 'Monthly Active Users' },
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Stripe API', 'Tailwind CSS'],
    image: '/projects/deshyatraa.webp' // Mock image path
  },
  {
    slug: 'proxyui',
    number: '02',
    title: 'ProxyUI',
    category: 'UI Component Library',
    icon: '🧩',
    color: '#60a5fa',
    link: 'https://proxyui.vercel.app',
    shortDescription: 'A modern UI component showcase with reusable sections and patterns.',
    fullDescription: 'ProxyUI is our internal open-source initiative designed to help front-end teams ship clean interfaces faster. We built a highly accessible, fully responsive component library using React and Tailwind CSS, featuring dark mode support and micro-interactions.',
    outcomes: [
      { metric: '50+', label: 'Reusable Components' },
      { metric: '100%', label: 'TypeScript Coverage' },
      { metric: 'Zero', label: 'External CSS Dependencies' },
    ],
    techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Radix UI'],
    image: '/projects/proxyui.webp'
  },
  {
    slug: 'voyage-horizon',
    number: '03',
    title: 'Voyage Horizon',
    category: 'Travel Agency Platform',
    icon: '🌊',
    color: '#818cf8',
    link: 'https://voyagehorizon.co.in',
    shortDescription: 'A modern digital storefront showcasing premium travel packages.',
    fullDescription: 'Developed a modern digital storefront for Voyage Horizon to showcase their premium travel packages. We focused on high-performance media delivery, ensuring large hero videos and destination galleries loaded instantly. We also integrated a custom Headless CMS for their team to manage packages without touching code.',
    outcomes: [
      { metric: '200%', label: 'Increase in Lead Generation' },
      { metric: 'Sub-second', label: 'LCP (Largest Contentful Paint)' },
    ],
    techStack: ['Next.js', 'Sanity CMS', 'Cloudinary', 'Framer Motion'],
    image: '/projects/voyagehorizon.webp'
  },
  {
    slug: 'kuch-nahi',
    number: '04',
    title: 'Kuch Nahi',
    category: 'E-Commerce Experience',
    icon: '🛒',
    color: '#4f46e5',
    link: 'https://kuchnahi.co.in',
    shortDescription: 'Built a blazing-fast, custom e-commerce solution with hyper-optimized checkout.',
    fullDescription: 'Kuch Nahi required a bespoke e-commerce platform that didn\'t feel like a standard Shopify template. We built a blazing-fast, custom e-commerce solution with a headless architecture. The frontend was designed to minimize cart abandonment through a hyper-optimized, single-page checkout flow.',
    outcomes: [
      { metric: '65%', label: 'Conversion Rate Improvement' },
      { metric: '< 2s', label: 'Checkout Flow Time' },
    ],
    techStack: ['Next.js', 'Shopify Storefront API', 'Redis', 'Tailwind CSS'],
    image: '/projects/kuchnahi.webp'
  },
  {
    slug: 'bhairav-steel',
    number: '05',
    title: 'Bhairav Steel',
    category: 'B2B Industrial Catalog',
    icon: '🏗️',
    color: '#7c3aed',
    link: 'https://bhairavsteel.in',
    shortDescription: 'Transformed a traditional business into a powerful digital catalog.',
    fullDescription: 'Transformed Bhairav Steel\'s traditional offline business into a powerful digital catalog. We developed a robust B2B platform that handles complex product specifications, massive weight/dimension tables, and an automated quote request system that replaced their manual email workflows.',
    outcomes: [
      { metric: '1000+', label: 'Products Digitized' },
      { metric: '80%', label: 'Reduction in Manual Quoting Time' },
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS S3'],
    image: '/projects/bhairavsteel.webp'
  }
];
