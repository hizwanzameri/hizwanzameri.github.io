'use client'

import AnimatedText from '../components/animatedtext';
import ShinyCard from '../components/shinycard';

export default function Work() {
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
            My Work
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
            Here are some of my projects
          </AnimatedText>
        </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="section-title-text">Currently</span>
          <span className="text-md">
            Working as a UI Developer at Fulkrum Interactive Technology. Supported key projects UIs and core software development ranging from web application to mobile.
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="section-title-text">Featured Projects</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ShinyCard icon="/close-menu-btn.png" title="Project 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
          <ShinyCard icon="/close-menu-btn.png" title="Project 2" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
          <ShinyCard icon="/close-menu-btn.png" title="Project 3" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
          </div>
        </div>
      </> 
  )
}