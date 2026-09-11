'use client'

import AnimatedText from '../components/animatedtext';
import Link from 'next/link';

export default function About() {
  return (
    <div className="flex w-full flex-col items-start gap-8 self-stretch text-left">
      <div className="mb-2 flex w-full flex-col items-start justify-start gap-4 sm:flex-col md:flex-row lg:flex-row">
        <div className="flex flex-1 flex-col items-start text-left">
          <AnimatedText
            type="chars"
            className="header-text gradient-text"
            style={{ minHeight: '1.5em' }}
            animationConfig={{
              duration: 0.8,
              stagger: 0.03,
              delay: 0,
              ease: 'power2.out',
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
              ease: 'power2.out',
            }}
          >
            Background, skills, and focus
          </AnimatedText>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-2 text-left">
        <span className="section-title-text">About</span>
        <span className="text-md text-left">
          Front-end and UI/UX professional with more than 10 years of combined experience across web interface development, interactive applications and digital product design. Hands-on translating business and operational requirements into responsive, user-centred web and mobile interfaces using React.js, JavaScript, HTML5 and CSS3. Collaborates with product stakeholders, back-end developers and project teams across requirements, design, implementation, UAT and production support — with a focus on maintainable interfaces, usability and cross-functional delivery.
        </span>
      </div>

      <div className="flex w-full flex-col items-start gap-3 text-left">
        <span className="section-title-text">Skills</span>
        <div className="flex w-full flex-col items-start gap-2 text-left text-md">
          <span><span className="font-semibold">Front-End Development:</span> React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, responsive design, Bootstrap, jQuery</span>
          <span><span className="font-semibold">Integration &amp; Architecture:</span> REST/JSON integration, component-based UI, reusable interface patterns, client-server integration</span>
          <span><span className="font-semibold">Tooling &amp; Delivery:</span> Git, Docker, Nginx, Node.js, npm, Linux/macOS/Windows, deployment and production troubleshooting</span>
          <span><span className="font-semibold">Product &amp; Quality:</span> Prototyping workflows, wireframes, usability, requirements clarification, UAT support, Agile collaboration</span>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-3 text-left">
        <span className="section-title-text">Education</span>
        <div className="flex w-full flex-col items-start gap-4 text-left text-md">
          <div className="flex w-full flex-col items-start gap-1 text-left">
            <span className="font-semibold">Bachelor of Computer Science (Software Engineering) with Honours</span>
            <span>Universiti Teknologi Malaysia</span>
            <span className="text-sm text-white/70">Expected Mar 2027 · Current CGPA 3.68</span>
          </div>
          <div className="flex w-full flex-col items-start gap-1 text-left">
            <span className="font-semibold">Diploma in Information Technology (Networking)</span>
            <span>Politeknik Muadzam Shah</span>
            <span className="text-sm text-white/70">2011 – 2014 · CGPA 3.43 · Pahang, Malaysia</span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-2 text-left">
        <span className="section-title-text">Contact</span>
        <div className="flex w-full flex-col items-start gap-1 text-left text-md">
          <span>Penang, Malaysia</span>
          <Link href="mailto:hizwanzameri@gmail.com" className="gradient-text self-start text-left">hizwanzameri@gmail.com</Link>
          <Link href="https://linkedin.com/in/hizwan" className="gradient-text self-start text-left" target="_blank" rel="noopener noreferrer">linkedin.com/in/hizwan</Link>
        </div>
      </div>
    </div>
  )
}
