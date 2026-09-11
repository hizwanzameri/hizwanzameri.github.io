'use client'

import Link from 'next/link';
import AnimatedText from '../components/animatedtext';
import {
  selectedProjects,
  selectedWorkClosing,
  selectedWorkIntro,
} from '../data/projects';

function MetaItem({ label, value }) {
  if (!value) return null;

  return (
    <div className="flex flex-col items-start gap-1 text-left">
      <span className="text-xs uppercase tracking-[0.18em] text-white/50">{label}</span>
      <span className="text-sm leading-relaxed text-white/90">{value}</span>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h3 className="section-title-text text-white/55">{children}</h3>
  );
}

function Prose({ children, className = '' }) {
  return (
    <div className={`flex max-w-3xl w-full flex-col items-start gap-3 text-left text-[15px] leading-7 text-white/85 ${className}`}>
      {children}
    </div>
  );
}

function ParagraphList({ items }) {
  if (!items?.length) return null;

  return items.map((item) => (
    <p key={item} className="m-0">{item}</p>
  ));
}

function BulletList({ items }) {
  if (!items?.length) return null;

  return (
    <ul className="m-0 flex w-full list-none flex-col items-start gap-2 p-0">
      {items.map((item) => (
        <li key={item} className="flex w-full items-start gap-3 text-left">
          <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-white/45" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CalloutList({ items }) {
  if (!items?.length) return null;

  return (
    <div className="flex w-full flex-col items-start gap-2 border-l border-white/25 pl-4 text-left">
      {items.map((item) => (
        <p key={item} className="m-0 font-medium leading-relaxed text-white/95">
          {item}
        </p>
      ))}
    </div>
  );
}

function ApproachList({ items }) {
  if (!items?.length) return null;

  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex flex-col items-start gap-2 border-t border-white/10 pt-3 text-left"
        >
          <span className="text-sm font-semibold text-white">{item.title}</span>
          <p className="m-0 text-sm leading-relaxed text-white/75">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function ContentSection({ title, children }) {
  return (
    <section className="flex w-full flex-col items-start gap-3 text-left">
      <SectionHeading>{title}</SectionHeading>
      <Prose>{children}</Prose>
    </section>
  );
}

function ProjectCaseStudy({ project }) {
  return (
    <article
      id={project.id}
      className="flex w-full scroll-mt-28 flex-col items-start gap-8 border-t border-white/15 pt-10 text-left"
    >
      <header className="flex w-full max-w-3xl flex-col items-start gap-4 text-left">
        <div className="flex w-full flex-col items-start gap-2 text-left">
          <span className="text-xs uppercase tracking-[0.22em] text-white/45">
            {project.number}
          </span>
          <h2 className="card-title-text m-0 gradient-text leading-tight">
            {project.title}
          </h2>
          <p className="m-0 text-sm leading-relaxed text-white/70">
            {project.subtitle}
          </p>
        </div>

        <div className="grid w-full gap-4 border-y border-white/10 py-4 sm:grid-cols-2">
          <MetaItem label="Role" value={project.role} />
          <MetaItem label="Focus" value={project.focus} />
          <MetaItem label="Platform" value={project.platform} />
          <MetaItem label="Technology" value={project.technology} />
        </div>
      </header>

      <ContentSection title="Overview">
        <ParagraphList items={project.overview} />
        {project.overviewApps?.length > 0 && (
          <div className="flex w-full flex-col items-start gap-3 text-left">
            {project.overviewApps.map((app) => (
              <div key={app.name} className="flex w-full flex-col items-start gap-1 text-left">
                <span className="text-sm font-semibold text-white">{app.name}</span>
                <p className="m-0 text-white/80">{app.text}</p>
              </div>
            ))}
          </div>
        )}
        {project.overviewClosing && <p className="m-0">{project.overviewClosing}</p>}
      </ContentSection>

      <ContentSection title="The Challenge">
        <ParagraphList items={project.challenge} />
        <CalloutList items={project.challengePoints} />
        {project.challengeClosing && <p className="m-0">{project.challengeClosing}</p>}
      </ContentSection>

      <ContentSection title="My Role">
        <ParagraphList items={project.roleDetails} />
        <BulletList items={project.responsibilities} />
      </ContentSection>

      {project.deepDives?.map((dive) => (
        <ContentSection key={dive.title} title={dive.title}>
          <ParagraphList items={dive.paragraphs} />
          <CalloutList items={dive.highlights} />
          <ParagraphList items={dive.closing} />
          {dive.subsection && (
            <div className="mt-1 flex w-full flex-col items-start gap-3 border-t border-white/10 pt-4 text-left">
              <span className="text-sm font-semibold text-white">{dive.subsection.title}</span>
              {dive.subsection.intro && <p className="m-0">{dive.subsection.intro}</p>}
              <div className="grid w-full gap-3 sm:grid-cols-2">
                {dive.subsection.principles?.map((principle) => (
                  <div
                    key={principle.name}
                    className="flex flex-col items-start gap-1 text-left"
                  >
                    <span className="text-sm font-semibold text-white">{principle.name}</span>
                    <p className="m-0 text-sm leading-relaxed text-white/75">{principle.text}</p>
                  </div>
                ))}
              </div>
              {dive.subsection.closing && <p className="m-0">{dive.subsection.closing}</p>}
            </div>
          )}
        </ContentSection>
      ))}

      {project.designApproach?.length > 0 && (
        <section className="flex w-full flex-col items-start gap-3 text-left">
          <SectionHeading>Design Approach</SectionHeading>
          <ApproachList items={project.designApproach} />
        </section>
      )}

      {project.outcome?.length > 0 && (
        <ContentSection title="Outcome">
          <ParagraphList items={project.outcome} />
        </ContentSection>
      )}

      {project.learned?.length > 0 && (
        <ContentSection title="What I Learned">
          <ParagraphList items={project.learned} />
          {project.learnedHighlight && (
            <CalloutList items={[project.learnedHighlight]} />
          )}
        </ContentSection>
      )}
    </article>
  );
}

export default function Work() {
  return (
    <div className="flex w-full flex-col items-start gap-10 self-stretch text-left">
      <div className="mb-2 flex w-full flex-col items-start justify-start gap-4">
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
              ease: 'power2.out',
            }}
          >
            Selected work across UI/UX, front-end, and product
          </AnimatedText>
        </div>
      </div>

      <div className="flex w-full max-w-3xl flex-col items-start gap-4 text-left">
        <span className="section-title-text">Selected Work</span>
        <p className="m-0 text-[15px] leading-7 text-white/85">{selectedWorkIntro}</p>

        <nav aria-label="Projects" className="flex w-full flex-col items-start gap-2 text-left">
          {selectedProjects.map((project) => (
            <Link
              key={project.id}
              href={`#${project.id}`}
              className="group flex w-full items-baseline justify-between gap-4 border-b border-white/10 py-2 text-left no-underline transition-colors hover:border-white/30"
            >
              <span className="text-xs uppercase tracking-[0.18em] text-white/45">
                {project.number}
              </span>
              <span className="flex-1 text-sm text-white/85 group-hover:text-white">
                {project.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex w-full flex-col items-start gap-4 text-left">
        {selectedProjects.map((project) => (
          <ProjectCaseStudy key={project.id} project={project} />
        ))}
      </div>

      <div className="flex w-full max-w-3xl flex-col items-start gap-3 border-t border-white/15 pt-10 text-left">
        <span className="section-title-text">{selectedWorkClosing.title}</span>
        <Prose>
          {selectedWorkClosing.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={`m-0 ${index === 2 ? 'font-medium text-white' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </Prose>
      </div>
    </div>
  );
}
