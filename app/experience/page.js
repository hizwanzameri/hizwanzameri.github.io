'use client'

import AnimatedText from '../components/animatedtext';
import TimelineItem from '../components/timelineitem';

const workExperiences = [
  {
    year: "2023",
    title: "UI/UX Developer",
    subtitle: "Fulkrum Interactive",
    startDate: "Jan 2023",
    endDate: "Present",
    duration: "3+ years",
    location: "Penang, Malaysia",
    highlights: [
      "Design and refine responsive interfaces for enterprise web and mobile systems from operational workflows and stakeholder feedback.",
      "Contribute to front-end implementation with React.js, JavaScript, HTML and CSS while coordinating with back-end developers.",
      "Create reusable UI patterns, wireframes, prototypes and interface specifications across application modules.",
      "Support data-intensive dashboards and tracking apps with real-time statuses, filtering and visualisation; assist deployment and production troubleshooting.",
    ],
  },
  {
    year: "2019",
    title: "Interactive Developer",
    subtitle: "Fulkrum Interactive",
    startDate: "May 2019",
    endDate: "Jan 2023",
    duration: "3 years 8 months",
    location: "Penang, Malaysia",
    highlights: [
      "Developed responsive web and mobile interfaces and converted approved designs into functional front-end experiences.",
      "Integrated user interfaces with application data through JSON and API-based interactions.",
      "Built prototypes and proof-of-concept interfaces to validate workflows and feasibility before full implementation.",
      "Supported testing, defect resolution and iterative improvements from stakeholder and end-user feedback.",
    ],
  },
  {
    year: "2018",
    title: "Desktop Artist",
    subtitle: "Schawk!",
    startDate: "Apr 2018",
    endDate: "Feb 2019",
    duration: "11 months",
    location: "Penang, Malaysia",
    highlights: [
      "Adapted high-volume packaging artwork to detailed client and production specifications while maintaining brand standards.",
      "Worked in a quality-controlled, deadline-driven environment with close attention to detail and disciplined file management.",
    ],
  },
  {
    year: "2014",
    title: "Interactive Designer",
    subtitle: "Fulkrum Interactive Media",
    startDate: "Jul 2014",
    endDate: "Nov 2017",
    duration: "3 years 4 months",
    location: "Kepala Batas, Penang",
    highlights: [
      "Created graphic designs and front-end interfaces for web and mobile projects using Adobe Creative Cloud, HTML, CSS and JavaScript.",
      "Produced wireframes, mock-ups, responsive layouts and interactive concepts with development teams.",
      "Converted business requirements into clear visual solutions for digital products and client presentations.",
    ],
  },
]

export default function Experience() {
  return (
<>
<div className="flex flex-col sm:flex-col md:flex-row lg:flex-row gap-4 justify-start items-start mb-10 w-full">
        <div className="flex flex-col flex-1">
          <AnimatedText 
            type="chars"
            className="header-text gradient-text" 
            style={{ minHeight: '1.5em' }}
            animationConfig={{
              duration: 0.8,
              stagger: 0.03,
              delay: 0,
              ease: 'power2.out'
            }}
          >
            Work Experience
          </AnimatedText>
          <AnimatedText 
            type="words"
            className="text-md gradient-text" 
            style={{ minHeight: '1.5em' }}
            animationConfig={{
              duration: 0.6,
              stagger: 0.05,
              delay: 0.3,
              ease: 'power2.out'
            }}
          >
            Roles across UI/UX, interactive development and design
          </AnimatedText>
        </div>
        </div>
        <div className="w-full">
              {workExperiences.map((data, i) =>
                <TimelineItem
                  key={i}
                  index={i}
                  year={data.year}
                  title={data.title}
                  subtitle={data.subtitle}
                  startDate={data.startDate}
                  endDate={data.endDate}
                  duration={data.duration}
                  location={data.location}
                  highlights={data.highlights}
                  end={i == workExperiences.length - 1}
                />
              )}
            </div>
</>    
  )
}
