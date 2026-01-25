'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const textArray = [
    "Hi, I'm Hizwan. Welcome to my website!",
    "I am passionate about creating user-friendly and efficient interfaces.",
    "Currently, I am working as a UI Developer at Fulkrum Interactive Technology.",
    "and I also love to travel and capture the beauty of the world."
];

const AboutMeCard = () => {
  const height = "h-30 sm:h-30 md:h-30 lg:h-30";
  const textRef = useRef(null);
  const caretRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timelineRef = useRef(null);
  const blinkTimelineRef = useRef(null);
  const imgRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Blinking caret animation
  useEffect(() => {
    const caretElement = caretRef.current;
    if (!caretElement) return;

    // Create blinking animation
    blinkTimelineRef.current = gsap.to(caretElement, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      if (blinkTimelineRef.current) {
        blinkTimelineRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    // Clear any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create a new timeline for the typewriter effect
    const tl = gsap.timeline({
      onComplete: () => {
        // Wait a bit before moving to next text
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        }, 2000); // 2 second pause after typing completes
      }
    });

    // Set initial state
    textElement.textContent = '';
    
    // Get current text
    const currentText = textArray[currentIndex];
    
    // Create typewriter effect
    const chars = currentText.split('');
    chars.forEach((char, index) => {
      tl.call(() => {
        textElement.textContent += char;
      }, null, index * 0.05); // 50ms delay between each character
    });

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [currentIndex]);

  // Auto-play video on mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window;
      setIsMobile(isMobileDevice);
      
      if (isMobileDevice && videoRef.current && imgRef.current) {
        const video = videoRef.current;
        
        // On mobile, show video and hide image
        gsap.set(video, { opacity: 1 });
        gsap.set(imgRef.current, { opacity: 0 });
        
        // Auto-play video on mobile
        const startMobileVideo = () => {
          video.play().then(() => {
            setIsVideoPlaying(true);
          }).catch(console.error);
        };
        
        if (video.readyState >= 2) {
          startMobileVideo();
        } else {
          const onCanPlay = () => {
            startMobileVideo();
            video.removeEventListener('canplay', onCanPlay);
          };
          video.addEventListener('canplay', onCanPlay);
          if (video.readyState === 0) {
            video.load();
          }
        }
      } else if (!isMobileDevice && videoRef.current && imgRef.current) {
        // On desktop, show image and hide video
        gsap.set(imgRef.current, { opacity: 1 });
        gsap.set(videoRef.current, { opacity: 0 });
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle mouse enter - fade to video and play
  const handleMouseEnter = () => {
    // Only trigger on desktop (not touch devices)
    if (window.innerWidth >= 768 && !isVideoPlaying && videoRef.current && imgRef.current) {
      setIsVideoPlaying(true);
      
      const video = videoRef.current;
      
      // Reset video to start
      video.currentTime = 0;
      
      // Function to start playing and then fade in
      const startVideoPlayback = () => {
        // Start playing the video while it's still hidden (opacity: 0)
        video.play().then(() => {
          // Wait for the video to actually render the first frame
          // Use multiple requestAnimationFrame calls to ensure frame is rendered
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Now that video is playing and has a frame, fade transitions
              gsap.to(imgRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
              });
              
              gsap.to(video, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut"
              });
            });
          });
        }).catch(console.error);
      };
      
      // Check if video has enough data loaded
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
        startVideoPlayback();
      } else {
        // Wait for video to load enough data to start playing
        const onCanPlay = () => {
          startVideoPlayback();
          video.removeEventListener('canplay', onCanPlay);
        };
        video.addEventListener('canplay', onCanPlay);
        // Ensure video is loading
        if (video.readyState === 0) {
          video.load();
        }
      }
    }
  };

  // Handle video end - fade back to image on desktop, loop on mobile
  const handleVideoEnd = () => {
    if (videoRef.current && imgRef.current) {
      if (isMobile) {
        // On mobile, loop the video
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(console.error);
      } else {
        // On desktop, fade out video and fade in image
        gsap.to(videoRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut"
        });
        
        gsap.to(imgRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setIsVideoPlaying(false);
          }
        });
      }
    }
  };

  // Handle mouse leave - if video is playing, let it finish; otherwise reset immediately
  const handleMouseLeave = () => {
    if (!isVideoPlaying && videoRef.current && imgRef.current) {
      // If video hasn't started playing, reset immediately
      gsap.set(imgRef.current, { opacity: 1 });
      gsap.set(videoRef.current, { opacity: 0 });
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
    // If video is playing, let handleVideoEnd handle the fade back
  };

  return (
    <div 
      className={"flex flex-col justify-end rounded-3xl sm:h-100 sm:w-100 md:h-80 md:w-80 lg:h-80 lg:w-80 overflow-clip shadow-[0px_1px_2px_0px_rgba(65,65,65,0.60)] hover:shadow-[0px_4px_20px_0px_rgba(65,65,65,0.60)] transition duration-300 ease-in-out relative"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        ref={imgRef}
        src={"/snapseed.jpeg"} 
        alt="" 
        className="sm:h-100 sm:w-100 md:h-80 md:w-80 lg:h-80 lg:w-80 object-cover"
      />
      <video
        ref={videoRef}
        src={"/montage.mov"}
        className="absolute top-0 left-0 sm:h-100 sm:w-100 md:h-80 md:w-80 lg:h-80 lg:w-80 object-cover opacity-0 z-10"
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
      />
      <div className={"absolute "+height+" w-full sm:w-100 md:w-80 lg:w-80 mask-t-from-50% backdrop-blur-xl rounded-3xl overflow-clip z-10"}>
      </div>
      <div className={"absolute "+height+" w-full sm:w-100 md:w-80 lg:w-80 p-5 text-white z-20"}>
        <div className="text-lg gradient-text card-title-text">About Me</div>
        <p className="font-light text-sm min-h-[2.5rem]">
          <span ref={textRef}></span>
          <span ref={caretRef} className="inline-block ml-0.5">|</span>
        </p>
      </div>
    </div>
  )
}

export default AboutMeCard;