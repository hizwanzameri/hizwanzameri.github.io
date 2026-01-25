'use client'

import AnimatedText from '../components/animatedtext';

export default function About() {
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
            About Me
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
            Here are some of my personal information
          </AnimatedText>
        </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="section-title-text">Personal Information</span>
          <div className="flex flex-col gap-2">
            <span className="text-md">
              Name: Muhammad Hizwan Bin Zameri
              Age: 30
              Gender: Male
              Nationality: Malaysian
              Date of Birth: 1990-01-01
              Email: hizwan@gmail.com
              Phone: 0123456789
              Address: 123, Jalan ABC, Kuala Lumpur, Malaysia
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="section-title-text">Education</span>
          <div className="flex flex-col gap-2">
            <span className="text-md">
              Politeknik Muadzam Shah
              Diploma in Information Technology (Networking)
              Start Date: 2011
              End Date: 2014
              Duration: 3 years
              Location: Pahang, Malaysia
            </span>
          </div>
        </div>
</>    
  )
}