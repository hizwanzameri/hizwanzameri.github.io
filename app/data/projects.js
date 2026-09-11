export const selectedWorkIntro =
  "A selection of projects where I worked across UI/UX design, front-end development, product thinking, and technical implementation. My work focuses on turning complex requirements and real-world workflows into interfaces that are clear, practical, and easy to use.";

export const selectedProjects = [
  {
    id: "fleet-operations",
    number: "01",
    title: "Fleet Operations Dashboard & Driver App",
    subtitle: "Industrial Logistics & Fleet Management System",
    role: "UI/UX Developer / Front-End Developer",
    focus:
      "UI/UX Design, Front-End Development, Real-Time Operations, Driver Experience, Requirements Analysis",
    platform: "Web Dashboard & Android Tablet Application",
    description:
      "A connected fleet operations solution with a web dashboard for monitoring and coordination, and a tablet driver app for field assignments in a large-scale industrial environment.",
    image: "/work.svg",
    overview: [
      "A digital fleet operations solution designed for a large-scale industrial environment to improve coordination between an operations control team and vehicle drivers working across the site.",
      "The solution consists of two connected applications:",
    ],
    overviewApps: [
      {
        name: "Fleet Operations Dashboard",
        text: "a central web application for monitoring vehicles, coordinating assignments and tracking operational activities.",
      },
      {
        name: "Driver App",
        text: "a tablet-based application that provides drivers with their current assignments and operational updates while working in the field.",
      },
    ],
    overviewClosing:
      "Together, both applications create a connected workflow between the control team and drivers.",
    challenge: [
      "Coordinating multiple vehicles within a large industrial environment requires continuous communication between drivers and the operations team.",
      "The control team needs visibility into vehicle availability, assignments and ongoing activities. Drivers, meanwhile, need clear instructions without being overwhelmed by unnecessary operational information.",
      "This created two very different UX requirements:",
    ],
    challengePoints: [
      "A data-rich dashboard for monitoring and coordination.",
      "A focused, action-oriented interface for drivers.",
    ],
    challengeClosing:
      "The challenge was to design both experiences as part of the same system while ensuring each interface was appropriate for its user's working environment.",
    roleDetails: [
      "I worked across UI/UX design and front-end implementation, translating operational requirements into interfaces suitable for real-world industrial use.",
      "My responsibilities included:",
    ],
    responsibilities: [
      "Understanding existing fleet and driver workflows.",
      "Translating operational requirements into user flows and interfaces.",
      "Designing the fleet operations dashboard.",
      "Designing the tablet experience for drivers.",
      "Developing responsive front-end interfaces.",
      "Creating reusable UI components and interaction patterns.",
      "Integrating interfaces with backend services.",
      "Collaborating with stakeholders during requirement discussions and UAT.",
      "Refining interfaces based on operational feedback.",
      "Supporting production implementation.",
    ],
    deepDives: [
      {
        title: "Fleet Operations Dashboard",
        paragraphs: [
          "The Fleet Operations Dashboard acts as the central interface for teams responsible for coordinating vehicle activities.",
          "It provides operators with a shared view of vehicle availability, current assignments and operational statuses.",
          "Rather than simply presenting large amounts of data, the interface was designed to help operators quickly answer:",
        ],
        highlights: [
          "What is happening right now?",
          "Which vehicles require attention?",
          "What needs to happen next?",
        ],
        closing: [
          "Clear information hierarchy, status indicators and consistent interaction patterns help users scan operational information and identify important changes quickly.",
          "This was particularly important because operators may need to monitor several activities simultaneously.",
        ],
      },
      {
        title: "Driver Tablet App",
        paragraphs: [
          "The Driver App extends the system from the operations centre into the field.",
          "Dedicated tablets installed in vehicles provide drivers with information about their current tasks and allow them to update the progress of their assignments.",
          "Unlike the operations dashboard, the driver interface intentionally exposes only the information needed for the immediate task.",
        ],
        subsection: {
          title: "Designing for Drivers",
          intro: "The interface was designed around four key principles:",
          principles: [
            {
              name: "Glanceable information",
              text: "Important task information and statuses should be understandable within seconds.",
            },
            {
              name: "Large interaction targets",
              text: "Controls are designed for quick and comfortable interaction on a tablet.",
            },
            {
              name: "Minimal interaction",
              text: "Common actions should require as few steps as possible.",
            },
            {
              name: "Clear feedback",
              text: "The interface clearly communicates the current task state and whether an action has been successfully registered.",
            },
          ],
          closing:
            "The result is a focused interface designed specifically for users working in an active operational environment.",
        },
      },
      {
        title: "Two Interfaces, One Workflow",
        paragraphs: [
          "One of the most interesting UX challenges was designing two applications for users participating in the same workflow but requiring completely different levels of information.",
          "The operations team needs visibility and control.",
          "The driver needs clarity and direction.",
          "Instead of creating a single interface for everyone, each application was designed around its user's responsibilities.",
          "The dashboard prioritises information density, monitoring and coordination.",
          "The driver application prioritises readability, immediate actions and simplicity.",
          "Both experiences remain connected through the same underlying operational workflow.",
        ],
      },
      {
        title: "Designing for Real-World Connectivity",
        paragraphs: [
          "Vehicle-based applications also introduce challenges that are uncommon in traditional office software.",
          "Connectivity can become inconsistent as vehicles move throughout a large industrial environment.",
          "During testing and production observation, application and location data were analysed to understand delayed updates, temporary connection interruptions and synchronisation behaviour.",
          "These findings helped inform how the application handles connectivity and communicates system states to users.",
          "One of the key lessons from the project was:",
        ],
        highlights: [
          "A real-time interface should never assume the network is always real-time.",
        ],
        closing: [
          "The user experience also needs to remain understandable when information is delayed or temporarily unavailable.",
        ],
      },
    ],
    designApproach: [
      {
        title: "Understand the Workflow First",
        text: "Before designing screens, I focused on understanding how operations teams and drivers actually perform their tasks. The interfaces were then structured around these workflows instead of forcing users to adapt their processes around the software.",
      },
      {
        title: "Make Operational States Clear",
        text: "Consistent visual patterns and status indicators help users understand the state of vehicles and assignments without having to interpret large amounts of information.",
      },
      {
        title: "Design for Each User's Context",
        text: "The dashboard and driver application deliberately use different levels of information density. Operators need a broader view of operations, while drivers need a focused view of their immediate tasks.",
      },
      {
        title: "Design Beyond the Screen",
        text: "Tablet interaction, vehicle movement, connectivity and the physical working environment were considered alongside conventional UI requirements.",
      },
    ],
    outcome: [
      "The solution created a connected digital workflow between a central operations team and drivers working in the field.",
      "The Fleet Operations Dashboard provides the visibility required to coordinate activities, while the Driver App translates those activities into a focused experience for drivers.",
      "The project demonstrated how UI/UX can simplify complex operational processes without removing the information users need to make decisions.",
    ],
    learned: [
      "This project strengthened my experience designing role-based enterprise applications and operational interfaces.",
      "More importantly, it taught me to consider the environment surrounding an interface.",
      "Network conditions, hardware, physical environments and the context in which users interact with software can be just as important as the visual design itself.",
      "It reinforced the approach I bring to UI/UX development today:",
    ],
    learnedHighlight:
      "Understand the workflow. Reduce unnecessary complexity. Design around the people who actually use the system.",
  },
  {
    id: "memoira",
    number: "02",
    title: "Memoira",
    subtitle: "Digital Invitation Platform · Product Design & Development",
    role: "Product Designer / Front-End Developer",
    focus:
      "Product Design, UI/UX, Front-End Architecture, Dynamic Event Experiences",
    technology:
      "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Supabase, Vercel",
    description:
      "A digital invitation platform that gives each event its own personalised web experience on a dedicated subdomain, designed to feel memorable while staying simple for guests on mobile.",
    image: "/window.svg",
    overview: [
      "Memoira is a digital invitation platform designed to provide couples and event organisers with personalised web-based invitations.",
      "Instead of sending guests a static image or generic invitation link, each event receives its own personalised web experience.",
      "An invitation can be accessed through a dedicated event subdomain such as amin-juliana.memoira.my.",
      "The goal was to make digital invitations feel more personal and memorable while keeping them simple for guests to access from their phones.",
    ],
    challenge: [
      "Most digital invitation experiences need to balance two very different requirements.",
      "For the event owner, the platform needs to provide customisation and event management capabilities.",
      "For the guest, the experience should require almost no learning curve. Guests should be able to open a link and immediately understand the event details and available actions.",
      "This meant the product needed to hide the technical complexity behind a simple mobile-first experience.",
    ],
    roleDetails: [
      "Memoira is an end-to-end product project where I worked across both product design and technical implementation.",
      "My work included:",
    ],
    responsibilities: [
      "Defining the overall product concept.",
      "Designing the invitation experience.",
      "Designing mobile-first interfaces.",
      "Developing reusable React components.",
      "Creating animations and interactive experiences.",
      "Planning the event and invitation data structure.",
      "Implementing dynamic invitation pages.",
      "Exploring payment integration.",
      "Configuring production deployment and custom domains.",
      "Designing the architecture for dynamic event subdomains.",
    ],
    deepDives: [
      {
        title: "Product Experience",
        paragraphs: [
          "Each invitation acts as a personalised event website rather than a static invitation.",
          "The experience can combine event information, visual storytelling and interactive functionality within one mobile-friendly page.",
          "The interface is intentionally designed around guests first. Important information should be immediately accessible without requiring users to create accounts or understand how the underlying platform works.",
        ],
      },
      {
        title: "Technical Challenge",
        paragraphs: [
          "One of the more interesting engineering challenges was supporting dynamic event subdomains.",
          "Instead of using URLs such as memoira.my/event/amin-juliana, the platform was designed around amin-juliana.memoira.my.",
          "This required thinking beyond the UI itself and considering DNS configuration, wildcard subdomains, deployment architecture and how event information should be resolved dynamically.",
        ],
      },
    ],
    designApproach: [
      {
        title: "Mobile first",
        text: "Most guests will access an invitation directly from messaging applications on their phones, making the mobile experience the primary interface.",
      },
      {
        title: "Emotion through interaction",
        text: "Motion and transitions are used intentionally to make the invitation feel like an experience rather than a conventional website.",
      },
      {
        title: "Simple information hierarchy",
        text: "Event details and important guest actions are kept easy to discover despite the visually expressive design.",
      },
      {
        title: "Reusable architecture",
        text: "The interface is component-based so different invitation designs can share functionality without requiring the entire application to be rebuilt.",
      },
    ],
    learned: [
      "Memoira allowed me to approach development from a product perspective rather than only implementing predefined requirements.",
      "I had to think about the complete experience: branding, interface design, technical architecture, deployment, domains and how the product could eventually operate as a scalable platform.",
      "It represents the intersection between my background in visual design and my work as a software developer.",
    ],
  },
];

export const selectedWorkClosing = {
  title: "Design Meets Engineering",
  paragraphs: [
    "My background combines visual design, UI/UX and software engineering.",
    'I enjoy working on products where the problem is not simply "How should this interface look?", but also:',
    "How should it work?",
    "Whether I am simplifying manufacturing workflows or designing a digital invitation platform, my approach is to understand the underlying problem first and then use design and technology to create an experience that feels simple to the person using it.",
  ],
};
