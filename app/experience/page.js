'use client'

import AnimatedText from '../components/animatedtext';
import TimelineItem from '../components/timelineitem';

const workExperiences = [
  {
    title: "UI/UX Developer",
    subtitle: "Fulkrum Interactive Technology",
    startDate: "May 2019",
    endDate: "Present",
    duration: "5 years 9 months",
    location: "Bertam, Kepala Batas, Pulau Pinang"
  },
  {
    title: "Desktop Artist",
    subtitle: "SGK",
    startDate: "Apr 2018",
    endDate: "Feb 2019",
    duration: "11 months",
    location: "Penang, Malaysia"
  },
  {
    title: "Interactive Designer",
    subtitle: "Fulkrum Interactive Technology",
    startDate: "Jul 2014",
    endDate: "Nov 2017",
    duration: "3 years 5 months",
    location: "Bertam, Kepala Batas, Pulau Pinang"
  },
  {
    title: "Intern (IT Technician)",
    subtitle: "Privilege Computer Center",
    startDate: "Jan 2012",
    endDate: "May 2012",
    duration: "5 months",
    location: "Perak, Malaysia"
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
            Here are some of my work experiences
          </AnimatedText>
        </div>
        </div>
        <div className="w-full">
              {workExperiences.map((data, i) =>
                <TimelineItem
                  key={i}
                  index={i}
                  icon="/work.svg"
                  title={data.title}
                  subtitle={data.subtitle}
                  startDate={data.startDate}
                  endDate={data.endDate}
                  duration={data.duration}
                  location={data.location}
                  end={i == workExperiences.length - 1}
                />
              )}
            </div>
</>    
  )
}