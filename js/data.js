window.PORTFOLIO = {
  profile: {
    name: "Mahid Rafiq",
    headline: ["Curious mind.", "Practical", "builder."],
    role: "B.Pharm student · Junior software developer · Research & innovation",
    location: "Anantapur, Andhra Pradesh, India",
    origin: "Originally from Jammu & Kashmir",
    portrait: "assets/mahid-portrait.jpg",
    portraitAlt: "Portrait of Mahid Rafiq in a white lab coat",
    lede: "B.Pharm student and junior software developer combining pharmacy knowledge with Python, R and web development to organise, document and analyse scientific and innovation-related information.",
    exploring: ["pharmacy × technology", "bio-resource knowledge", "grassroots innovation", "digital knowledge systems"],
    email: "", cv: "", now: "",
    links: { linkedin: "https://www.linkedin.com/in/mahidrafiq", github: "https://github.com/mahidrafiq" },
    siteUrl: "https://mahidrafiq.github.io/mahidrafiq/"
  },
  identity: [
    { name: "Pharmacy", note: "Pharmacognosy, medicinal plants, pharmacology" },
    { name: "Technology", note: "Python, R and the web, built to be useful" },
    { name: "Research", note: "Literature review, prior-art support, documentation" },
    { name: "Innovation", note: "Grassroots and agricultural ideas, made practical" }
  ],
  principles: [
    { label: "Approach", text: "Understand the problem before the tool" },
    { label: "Practice", text: "Prototype, test, improve, repeat" },
    { label: "Interest", text: "Applied AI and automation" },
    { label: "Perspective", text: "Technology meets healthcare" }
  ],
  availability: {
    status: "Open to remote, part-time work",
    mode: "Remote only, part-time alongside full-time studies",
    types: ["Volunteer", "Internship", "Research support", "Project-based"],
    lookingFor: "A remote internship, volunteer or project-based role.",
    seeking: "I am looking for a remote internship, volunteer or project-based role where I can help with innovation scouting, technical documentation or research support, part-time alongside my studies.",
    help: ["Innovation scouting", "Technical documentation", "Prior-art and literature research", "Bio-resource knowledge management, with a focus on Jammu & Kashmir"]
  },
  story: [
    "I'm a B.Pharm student and junior software developer who works where pharmacy, technology, research and innovation overlap.",
    "I use Python, R and web development to organise, document and analyse scientific and innovation-related information. The problems that pull me in are grassroots and agricultural innovation, traditional knowledge, bio-resources and rural technology.",
    "I'm originally from Jammu & Kashmir and now study in Anantapur, where I'm in the third year of my B.Pharm. In 2018 I won first prize at JKEDI for an agricultural innovation, and in 2022 I was selected for the 49th Rashtriya Bal Vaigyanik Pradarshani in Guwahati."
  ],
  nav: [
    { label: "Work", target: "work" }, { label: "Lab", target: "lab" },
    { label: "GitHub", target: "github" }, { label: "Skills", target: "skills" },
    { label: "About", route: "about" }, { label: "Contact", target: "contact" }
  ],
  domains: [
    { id: "pharmacy", name: "Pharmacy", color: "var(--d1)" },
    { id: "tech", name: "Technology", color: "var(--d2)" },
    { id: "research", name: "Research & Innovation", color: "var(--d3)" }
  ],
  skillGroups: [
    { id: "research", title: "Research & Documentation", hint: "Finding, organising and writing things down", icon: "✎" },
    { id: "software", title: "Software & Data", hint: "Code and data for practical tools", icon: "</>" },
    { id: "domain", title: "Domain Knowledge", hint: "Pharmacy and plant-based resources", icon: "⚗" },
    { id: "tools", title: "Tools & Presentation", hint: "Reports and technical presentations", icon: "▤" },
    { id: "interest", title: "Areas of Interest", hint: "Where I want to work next", icon: "✳" }
  ],
  skills: [
    { name: "Scientific literature review", group: "research", domains: ["research"] },
    { name: "Prior-art research support", group: "research", domains: ["research"] },
    { name: "Technical documentation", group: "research", domains: ["research", "tech"] },
    { name: "Research briefs", group: "research", domains: ["research"] },
    { name: "Knowledge organisation", group: "research", domains: ["research", "tech"] },
    { name: "Innovation documentation", group: "research", domains: ["research"] },
    { name: "Python", group: "software", domains: ["tech"], kind: "language" },
    { name: "R", group: "software", domains: ["tech"], kind: "language" },
    { name: "HTML", group: "software", domains: ["tech"], kind: "language" },
    { name: "CSS", group: "software", domains: ["tech"], kind: "language" },
    { name: "JavaScript", group: "software", domains: ["tech"], kind: "language" },
    { name: "Git / GitHub", group: "software", domains: ["tech"] },
    { name: "Data organisation", group: "software", domains: ["tech", "research"] },
    { name: "Basic data analysis", group: "software", domains: ["tech", "research"] },
    { name: "Basic automation", group: "software", domains: ["tech"] },
    { name: "AI-assisted development", group: "software", domains: ["tech"] },
    { name: "Pharmacognosy", group: "domain", domains: ["pharmacy"] },
    { name: "Medicinal plants", group: "domain", domains: ["pharmacy"] },
    { name: "Crude drugs", group: "domain", domains: ["pharmacy"] },
    { name: "Phytoconstituents", group: "domain", domains: ["pharmacy"] },
    { name: "Herbal and plant-based resources", group: "domain", domains: ["pharmacy"] },
    { name: "Pharmacology", group: "domain", domains: ["pharmacy"] },
    { name: "Medicinal chemistry", group: "domain", domains: ["pharmacy"] },
    { name: "Pharmaceutics", group: "domain", domains: ["pharmacy"] },
    { name: "Microsoft Word", group: "tools", domains: ["tech"] },
    { name: "Microsoft Excel", group: "tools", domains: ["tech"] },
    { name: "Microsoft PowerPoint", group: "tools", domains: ["tech"] },
    { name: "Reports and technical presentations", group: "tools", domains: ["research"] },
    { name: "Grassroots innovation", group: "interest", domains: ["research"] },
    { name: "Agricultural innovation", group: "interest", domains: ["research"] },
    { name: "Healthcare and pharma innovation", group: "interest", domains: ["pharmacy", "research"] },
    { name: "Technology × healthcare", group: "interest", domains: ["pharmacy", "tech"] },
    { name: "Traditional knowledge", group: "interest", domains: ["pharmacy", "research"] },
    { name: "Bio-resources", group: "interest", domains: ["pharmacy", "research"] },
    { name: "Rural technology", group: "interest", domains: ["tech", "research"] },
    { name: "Digital knowledge systems", group: "interest", domains: ["tech", "research"] },
    { name: "Organising and analysing scientific information with code", group: "interest", domains: ["pharmacy", "tech", "research"] }
  ],
  projects: [
    { id: "order-management", name: "Rafiq Innovations: Order Management", category: "Software", status: "Public repository · browser demo", featured: true, visual: "dashboard", summary: "A lightweight order-management app that tracks orders from enquiry through delivery, with a simple printable workflow.", tech: ["HTML", "CSS", "JavaScript"], links: { github: "https://github.com/mahidrafiq/Rafiq-Innovations-Order-Management" } },
    { id: "voice-clone", name: "Voice Clone Desktop", category: "Software", status: "Prototype", featured: true, visual: "terminal", summary: "A desktop voice-cloning workflow focused on practical usability, local setup and packaging.", tech: ["Python", "AI"], links: {} },
    { id: "ai-resume-android", name: "AI Resume Android", category: "Automation", status: "Prototype", featured: true, visual: "phone", summary: "An Android automation experiment for composing and sending prompts in a mobile browser workflow.", tech: ["Android", "Automation"], links: { github: "https://github.com/mahidrafiq/ai-resume-android" } },
    { id: "elibrary", name: "RIPER e-Library", category: "Software", status: "In progress", featured: true, visual: "dashboard", summary: "A student-facing digital library and an administrative catalogue workflow.", tech: ["FastAPI", "Python"], links: { github: "https://github.com/kartik-h6/e-library", demo: "https://kartik-h6.github.io/e-library/" } },
    { id: "rafiq-engineering-works", name: "Rafiq Engineering Works Website", category: "Web", status: "Published", featured: true, visual: "web", summary: "A brand-forward manufacturing website for gates, grills and fabrication work.", tech: ["HTML", "CSS", "Brand design"], links: {} },
    { id: "tablet-punching", name: "Tablet-Punching Technology", category: "Innovation", status: "Concept", visual: "blueprint", summary: "An MSME innovation concept exploring tablet-punching technology and manufacturing automation.", tech: ["Engineering", "Pharmacy"], links: {} },
    { id: "agri-grassroots", name: "Agricultural & Grassroots Innovation", category: "Innovation", status: "Exploration", visual: "orchard", summary: "Explorations in orchard needs, agricultural tools and practical local-resource innovation.", tech: ["Agriculture", "Innovation"], links: {} }
  ],
  timeline: [
    { id: "science-exhibition", kind: "achievement", title: "49th Rashtriya Bal Vaigyanik Pradarshani", org: "National Science Exhibition, Guwahati", year: 2022, label: "2022", short: "National science exhibition", summary: "Selected to participate in the national exhibition in Guwahati, Assam." },
    { id: "jkedi", kind: "achievement", title: "First Prize, J&K Entrepreneurship Development Institute (JKEDI)", org: "JKEDI", year: 2018, label: "2018", short: "JKEDI first prize", summary: "Awarded first prize for an agricultural innovation." },
    { id: "x-tablet", kind: "experience", label: "Project", project: "tablet-punching", title: "MSME Innovation Project: Tablet-Punching Technology", summary: "Developed project concepts for tablet-punching technology and its manufacturing and automation applications." },
    { id: "x-agri", kind: "experience", label: "Project", project: "agri-grassroots", title: "Agricultural & Grassroots Innovation", summary: "Explored technology solutions for apple orchards, agricultural tools and local-resource-based rural needs." },
    { id: "x-software", kind: "experience", label: "Ongoing", title: "Personal software and portfolio projects", summary: "Built and refined web and software projects focused on practical utility, using Python, JavaScript, HTML/CSS and Git/GitHub." }
  ],
  testimonials: [],
  brand: {
    tagline: "Engineer the Essential", system: "Midnight Voltage",
    palette: [
      { name: "Deep Space", hex: "#0B0F12", role: "Primary dark background" },
      { name: "Forest Green", hex: "#0F4D3A", role: "Restrained support colour" },
      { name: "Voltage Lime", hex: "#A6FF3D", role: "Energy, highlights, small accents" },
      { name: "Technical Slate", hex: "#687280", role: "Secondary UI and neutral elements" },
      { name: "Soft Ivory", hex: "#F5F7F2", role: "Light background and reversed text" },
      { name: "Silver", hex: "#C7CCD3", role: "Logo finish and metallic details" }
    ],
    type: [
      { name: "Space Grotesk", role: "Headings and display", sample: "Engineer the Essential", family: "var(--display)" },
      { name: "Inter", role: "Body and interface", sample: "Practical tools for real-world problems.", family: "var(--sans)" }
    ],
    rules: ["Use the horizontal lockup as the main signature. Use the MR mark alone for avatars and icons.", "Silver mark on dark surfaces, dark mark on light surfaces.", "Voltage Lime is a small accent, never the logo fill.", "Keep clear space around the mark. Do not stretch, rotate or add effects.", "Write the line exactly as: Engineer the Essential."],
    downloads: [
      { label: "Primary lockup · dark", files: [{ type: "SVG", href: "assets/brand/primary_horizontal_dark.svg" }, { type: "PNG", href: "assets/brand/primary_horizontal_dark.png" }] },
      { label: "Primary lockup · light", files: [{ type: "SVG", href: "assets/brand/primary_horizontal_light.svg" }, { type: "PNG", href: "assets/brand/primary_horizontal_light.png" }] },
      { label: "MR mark · white", files: [{ type: "SVG", href: "assets/brand/lettermark_white.svg" }] },
      { label: "MR mark · black", files: [{ type: "SVG", href: "assets/brand/lettermark_black.svg" }] },
      { label: "Orbit motif · lime", files: [{ type: "SVG", href: "assets/brand/symbol_orbit_lime.svg" }] },
      { label: "App icon · dark", files: [{ type: "SVG", href: "assets/brand/app_icon_dark.svg" }, { type: "PNG", href: "assets/brand/app_icon_dark_512.png" }] },
      { label: "App icon · light", files: [{ type: "SVG", href: "assets/brand/app_icon_light.svg" }] },
      { label: "Social avatar", files: [{ type: "PNG", href: "assets/brand/social_avatar_dark_1024.png" }] },
      { label: "Social preview 1200×630", files: [{ type: "PNG", href: "assets/brand/og-image.png" }] }
    ]
  },
  lab: {
    products: [{ id: "rack", name: "Display Rack", price: 4500 }, { id: "grill", name: "Window Grill", price: 3200 }, { id: "gate", name: "Steel Gate", price: 12000 }, { id: "shelf", name: "Storage Shelf", price: 2750 }],
    menu: [{ name: "Masala Dosa", price: 80 }, { name: "Paneer Butter Masala", price: 220 }, { name: "Veg Biryani", price: 180 }, { name: "Filter Coffee", price: 40 }, { name: "Gulab Jamun", price: 60 }],
    taxPercent: 5, servicePercent: 5
  },
  github: { user: "mahidrafiq", mode: "featured", hide: [], max: 6 },
  newsletter: { enabled: false, name: "Field Notes", endpoint: "", heading: "Field Notes", tagline: "Short notes from the place where pharmacy, code and research meet.", topics: ["What I'm building and learning", "Pharmacy × technology ideas", "Grassroots and agricultural innovation", "Research and documentation tips"], cadence: "Occasional, when there is something worth sharing. No spam." }
};
window.PORTFOLIO.brand.mark = { viewBox: "40 60 840 556", d: "M 218 493 L 183 511 L 131 534 L 132 612 L 218 545 Z M 427 357 L 360 406 L 415 471 L 433 498 L 459 552 L 476 601 L 476 428 L 474 417 L 469 402 L 461 389 L 429 357 Z M 194 241 L 347 391 L 312 415 L 246 456 L 198 483 L 160 502 L 107 522 L 88 526 L 68 525 L 61 518 L 62 505 L 68 492 L 85 468 L 121 431 L 130 418 L 132 504 L 145 501 L 173 490 L 199 477 L 218 465 L 218 298 L 194 246 Z M 728 144 L 684 167 L 655 185 L 673 191 L 689 201 L 700 212 L 708 224 L 715 245 L 715 266 L 710 283 L 699 301 L 681 318 L 663 328 L 641 334 L 461 334 L 449 343 L 710 603 L 829 603 L 634 404 L 663 403 L 688 399 L 706 393 L 728 382 L 751 365 L 765 351 L 779 332 L 791 308 L 796 292 L 799 270 L 798 248 L 792 223 L 781 200 L 769 183 Z M 704 121 L 669 92 L 643 81 L 631 79 L 614 79 L 586 86 L 569 95 L 557 104 L 372 275 L 421 323 L 510 246 L 576 195 L 649 148 Z M 871 81 L 862 71 L 853 66 L 846 64 L 830 65 L 819 70 L 811 78 L 807 84 L 803 96 L 781 100 L 751 110 L 711 128 L 681 144 L 631 174 L 570 216 L 414 342 L 218 152 L 131 73 L 131 415 L 105 436 L 83 458 L 63 482 L 46 511 L 44 518 L 45 531 L 50 537 L 60 541 L 80 541 L 103 536 L 158 516 L 214 488 L 279 450 L 353 402 L 357 401 L 415 358 L 557 241 L 631 189 L 682 158 L 734 131 L 777 115 L 804 111 L 811 124 L 821 133 L 829 136 L 830 138 L 828 145 L 817 165 L 789 199 L 790 206 L 792 206 L 823 172 L 835 155 L 843 139 L 858 133 L 870 122 L 876 108 L 876 94 Z" };
