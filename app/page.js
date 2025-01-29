"use client"
import { useState } from "react";
import Image from "next/image";
import Navigation from "./components/navigation";
import {
  motion,
  time,
} from "framer-motion";
import YouTubeEmbed from "./components/YouTubeEmbed";

const TimelineItem = ({ index, icon = "/file-check.svg", title = 'Assignment 1', subtitle = "20/1/2024", startDate = "N/A", endDate = "", duration = "", location = "N/A", end = false }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, type: "spring", delay: index * 0.4 }}
      className="flex flex-row w-full min-h-32 gap-4">
      <div className={`flex flex-col ${end ? "items-start justify-start" : "items-center justify-center"} `}>
        <Image
          onClick={() => close(false)}
          aria-hidden
          src={icon}
          alt=""
          className="bg-white rounded-full flex items-center justify-center p-1"
          width={30}
          height={30}
        />
        {end ? false :
          <div className="bg-white h-full w-[1px]"></div>
        }
      </div>
      <div className="w-full flex flex-col">
        <h1 className="font-bold">{title}</h1>
        <span className="text-sm">{subtitle}</span>
        <span className="text-xs">{startDate} - {endDate} · {duration}</span>
        <div className="text-xs">{location}</div>
      </div>
    </motion.div>

  )
}

const MenuItem = ({ children, setPageId, pageId, active }) => {
  return (
    <div onClick={() => {
      setPageId(pageId)
    }} className={`cursor-pointer rounded-full border border-white/20 px-4 py-2 text-sm ${active ? 'bg-white/20 font-semibold' : ''}`}>{children}</div>
  )
}

const MyProfile = ({ }) => {
  const [pageId, setPageId] = useState('Summary')

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

  const education = [
    {
      title: "Politeknik Muadzam Shah",
      subtitle: "Diploma in Information Technology (Networking)",
      startDate: "2011",
      endDate: "2014",
      duration: "Pahang, Malaysia",
      location: ""
    },
    {
      title: "SMK Raja Shahriman",
      subtitle: "SPM",
      startDate: "2006",
      endDate: "2010",
      duration: "Beruas, Perak, Malaysia",
      location: ""
    },
  ]

  return (
    <div className="p-6 pb-80 flex flex-col">
      <Header subtitle={pageId}>
        My Profile
      </Header>
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-3 mb-10">
        <MenuItem setPageId={setPageId} pageId={'Summary'} active={pageId == 'Summary'}>Summary</MenuItem>
        <MenuItem setPageId={setPageId} pageId={'Work Experiences'} active={pageId == 'Work Experiences'}>Work Experiences</MenuItem>
        <MenuItem setPageId={setPageId} pageId={'Education'} active={pageId == 'Education'}>Education</MenuItem>
      </div>
      {
        pageId == 'Summary' ?
          <div>
            <p>
              Hi, my name is Muhammad Hizwan Bin Zameri. I am a versatile professional with a strong foundation in UI/UX design, UI engineering, and software development. My career journey has allowed me to take on diverse roles, from UI/UX developer to business analyst, showcasing my ability to adapt and excel in dynamic environments. With a keen interest in innovation and technology, I have contributed to projects ranging from mobile applications to industrial systems, employing tools like Next.js, Node.js, Flutter and Kotlin.
            </p>
            <br></br>
            <p>
              I thrive in roles that demand creativity, technical expertise, and user-centric design, ensuring seamless experiences and functional solutions. Whether developing web applications, managing deployment strategies, or collaborating on complex systems, I bring a detail-oriented and collaborative approach to every project.
            </p>
            <br></br>
            <p>
              Currently, I am part of a software house, Fulkrum, where I contribute to creating innovative solutions that align with modern technological advancements. Passionate about continuous learning and problem-solving, I am committed to delivering impactful results that resonate with both clients and users.
            </p>
          </div>
          : pageId == 'Education' ?
            <div>
              {education.map((data, i) =>
                <TimelineItem
                  key={i}
                  index={i}
                  icon="/education.svg"
                  title={data.title}
                  subtitle={data.subtitle}
                  startDate={data.startDate}
                  endDate={data.endDate}
                  duration={data.duration}
                  location={data.location}
                  end={i == education.length - 1}
                />
              )}
            </div>
            :
            <div>
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
      }
    </div>
  )
}

const Reflection = ({ children }) => {
  return (
    <div className="relative mt-4 mb-10 flex flex-col w-full p-4 rounded-xl bg-white/10 border border-white/20">
      <Image
        aria-hidden
        src="/pen.svg"
        alt="pen"
        width={20}
        height={20}
        className="absolute right-4"
      />
      <h1 className="font-semibold text-sm mb-3">My Reflection  </h1>
      <p className="text-sm text-justify">{children}</p>
    </div>
  )
}

const AssignmentItem = ({ index, title = 'Assignment 1', submittedOn = "20/1/2024", description = "N/A", videoId = "", images = [], reflection = "N/A", end = false }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, type: "spring", delay: index * 0.4 }}
      className="flex flex-row w-full min-h-52 gap-4">
      <div className={`flex flex-col ${end ? "items-start justify-start" : "items-center justify-center"} `}>
        <Image
          onClick={() => close(false)}
          aria-hidden
          src="/file-check.svg"
          alt="file"
          className="bg-white rounded-full flex items-center justify-center p-1"
          width={30}
          height={30}
        />
        {end ? false :
          <div className="bg-white h-full w-[1px]"></div>
        }
      </div>
      <div className="w-full">
        <h1 className="font-bold">{title}</h1>
        <span className="text-xs">Submitted On <b>{submittedOn}</b></span>
        <div className="text-sm mb-4">{description}</div>
        {videoId.length > 0 ?
          <YouTubeEmbed videoId={videoId} />
          : false}
        <div className="flex flex-row gap-3 overflow-x-auto">
          {images.length > 0 ? images.map((data, i) =>
            <Image
              key={i}
              aria-hidden
              src={data.path}
              alt=""
              width={200}
              height={200}
              className="rounded-md w-full sm:w-full md:w-[200px] lg:w-[200px]"
            />
          ) : false
          }
        </div>
        <Reflection>
          {reflection}
        </Reflection>
      </div>
    </motion.div>

  )
}

const Header = ({ children, subtitle }) => {
  return (
    <>
      <span className="bg-gradient-to-b from-[#fff] from-30%  to-[#fff]/30 text-2xl bg-clip-text text-transparent ">
        {children}
      </span>
      <span className="mt-2 mb-6 text-sm">
        {subtitle}
      </span>
    </>
  )
}

const Assignments = ({ }) => {
  const content = [
    {
      title: 'Assignment 2 (Individual): Video',
      submittedOn: "12 January 2025",
      description: "IT usage at workplace",
      videoId: "L3i4C-Bz9Ag",
      images: [],
      reflection: "Reflecting on Assignment 2, the process of installing Ubuntu OS on a virtual machine using VirtualBox was both challenging and rewarding. It provided me with a hands-on understanding of virtualization technology and its applications in the workplace. The assignment enhanced my technical skills, particularly in setting up and configuring VirtualBox, allocating system resources, and navigating Ubuntu's installation process. While troubleshooting errors, such as configuring the virtual disk or ensuring compatibility settings, I learned to apply problem-solving techniques effectively. This practical exercise highlighted the importance of virtual machines in IT environments, offering safe testing grounds for software and operating systems without affecting the host machine. Overall, the experience deepened my appreciation for virtualization tools and their role in modern IT workflows.",
    },
    {
      title: 'Assignment 1 (Group): Industry Talk 1',
      submittedOn: "5 January 2025",
      description: "Industry Talk Poster",
      videoId: "",
      images: [{
        path: "/assignment1/a1.png"
      }],
      reflection: "This assignment provided invaluable insights into AirAsia's digital ecosystem and the dynamic world of software engineering. Learning about the integration of cutting-edge technologies like cloud computing and microservices, alongside their flat organizational structure and collaborative culture, emphasized the importance of teamwork, adaptability, and effective communication. The session highlighted the significance of technical proficiency, continuous learning, and a growth mindset, particularly in contributing to real-world projects during internships. The emphasis on mentorship and onboarding underscored the role of a supportive work environment in fostering personal and professional development. Overall, this assignment was inspiring and motivating, reinforcing the need to stay current with emerging tools and technologies while encouraging proactive skill enhancement to thrive in innovative, tech-driven environments like AirAsia.",
    },
    {
      title: 'Assignment 3 (Group): Industry Talk 2',
      submittedOn: "1 January 2025",
      description: "Industry Talk 2 Report",
      videoId: "",
      images: [
        {
          path: "/assignment3/a3-1.png"
        },
        {
          path: "/assignment3/a3-2.png"
        },
        {
          path: "/assignment3/a3-3.png"
        }
      ],
      reflection: "Reflecting on Assignment 3, which involved Industry Talk 2, I found the experience insightful and enriching. Collaborating with my group to analyze and discuss the key points from the talk enhanced my understanding of the latest trends and challenges in the industry. The speaker's insights were particularly eye-opening, as they provided real-world context to the concepts we've been studying. Through group discussions, I developed a deeper appreciation for teamwork, as each member contributed unique perspectives and ideas, fostering a well-rounded understanding of the topic. This assignment not only expanded my industry knowledge but also improved my ability to communicate and collaborate effectively, skills that are essential in professional environments.",
    }
  ]
  return (
    <div className="p-6 pb-80 flex flex-col">
      <Header subtitle={'Assignments & Reflections'}>
        <b>SECP1513</b> Technology & Information System
      </Header>
      {content.map((data, i) =>
        <AssignmentItem
          key={i}
          index={i}
          title={data.title}
          videoId={data.videoId}
          images={data.images}
          submittedOn={data.submittedOn}
          description={data.description}
          reflection={data.reflection}
          end={i == content.length - 1}
        />
      )}
    </div>
  )
}

const Popup = ({ children, active, close }) => {
  return (
    <motion.div
      key={close}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="fixed top-0 right-0 w-full sm:w-full md:w-[70vw] lg:w-[50vw] h-screen p-6" >
      <div className="rounded-xl h-full w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white overflow-clip">
        <div className="flex flex-row p-6 border-b border-white/20">
          <Image
            onClick={() => close(false)}
            aria-hidden
            src="/back.svg"
            alt="back"
            className="cursor-pointer"
            width={30}
            height={30}
          />
        </div>
        <div className="w-full h-full flex flex-col overflow-y-scroll">
          {children}
        </div>
      </div>
    </motion.div >
  )
}

export default function Home() {
  const [showPopup, setShowPopup] = useState(false)
  const [pageId, setPageId] = useState('myprofile')

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-row sm:flex-row md:flex-col lg:flex-col gap-8 items-center justify-items-center sm:items-center sm:justify-items-center md:items-start md:justify-items-start lg:items-start lg:justify-items-start">
          <Image
            aria-hidden
            src="/profile-1.png"
            alt="profile"
            className="rounded-full w-[50px] sm:w-[50px] md:w-[150px] lg:w-[150px] h-[50px] sm:h-[50px] md:h-[150px] lg:h-[150px] "
            width={150}
            height={150}
          />
          <p className="bg-gradient-to-b from-[#fff] from-30%  to-[#fff]/30 text-5xl sm:text-5xl md:text-7xl lg:text-7xl bg-clip-text text-transparent drop-shadow-[0_20px_35px_rgba(255,255,255,0.6)]">Hizwan Zameri</p>
        </div>

        <span className="text-sm">I'm a UI/UX Developer at <b>Fulkrum Interactive Technology</b>.<br></br>A Part Time Student at <b>Universiti Teknologi Malaysia</b>.</span>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Welcome to my portfolio{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              <a
                className=""
                href="https://hizwanzameri.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >hizwanzameri.github.io</a>
            </code>
            .
          </li>
          <li className="mb-2">Visit my github profile{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              <a
                className=""
                href="https://github.com/hizwanzameri"
                target="_blank"
                rel="noopener noreferrer"
              >github.com/hizwanzameri</a>
            </code>
            .
          </li>
          <li>Visit my linkedin profile{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              <a
                className=""
                href="https://linkedin.com/in/hizwanzameri"
                target="_blank"
                rel="noopener noreferrer"
              >linkedin.com/in/hizwanzameri</a>
            </code>
            .
          </li>
        </ol>
        <span>More about me:</span>
        <Navigation showProfile={setShowPopup} setPageId={setPageId} />
        {
          showPopup ? <Popup close={setShowPopup} >
            {pageId == 'myprofile' ?
              <MyProfile /> : <Assignments />
            }

          </Popup> : false
        }
      </main>

    </div >
  );
}
