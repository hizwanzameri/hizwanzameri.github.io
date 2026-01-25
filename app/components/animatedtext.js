"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function AnimatedText({
  children,
  type = 'chars', // 'chars' or 'words'
  className = '',
  style = {},
  animationConfig = {
    duration: 0.8,
    stagger: 0.03,
    delay: 0,
    ease: 'power2.out'
  },
  hoverConfig = {
    maxDistance: 100,
    moveDistance: 30,
    maxBlur: 8
  }
}) {
  const textRef = useRef(null)
  const spansRef = useRef([])
  const containerRef = useRef(null)
  const mouseMoveHandlerRef = useRef(null)
  const mouseLeaveHandlerRef = useRef(null)

  useEffect(() => {
    // Hide the text immediately before animation starts
    if (textRef.current) {
      textRef.current.style.opacity = '0'
      textRef.current.style.visibility = 'hidden'
    }

    const animateText = () => {
      // Check if GSAP is loaded
      if (!gsap) {
        console.error('GSAP is not loaded')
        return
      }

      // Split text into characters and animate
      const splitText = (element, splitType = 'chars') => {
        if (!element) {
          console.log('Element is null')
          return null
        }
        
        const text = element.textContent
        console.log('Text content:', text)
        if (!text) {
          console.log('No text found')
          return null
        }
        
        element.innerHTML = ''
        
        const spans = []
        
        // Set white-space on parent to preserve spaces
        element.style.whiteSpace = 'pre-wrap'
        
        if (splitType === 'chars') {
          // Split by characters, preserving all characters including spaces
          const chars = text.split('')
          chars.forEach((char) => {
          const span = document.createElement('span')
          span.textContent = char
          span.style.display = 'inline-block'
          // Apply gradient-text class to each span to maintain gradient effect
          span.className = 'gradient-text'
          element.appendChild(span)
          spans.push(span)
          })
        } else {
          // Split by words, preserving spaces between words
          // Use a regex that captures words and spaces separately
          const parts = text.match(/\S+|\s+/g) || []
          parts.forEach((part) => {
            if (part.length === 0) return
            
            const span = document.createElement('span')
            span.textContent = part
            span.style.display = 'inline-block'
            // Apply gradient-text class to each span to maintain gradient effect
            span.className = 'gradient-text'
            element.appendChild(span)
            spans.push(span)
          })
        }
        
        console.log(`Created ${spans.length} spans for ${splitType}`)
        return spans
      }

      // Animate text
      if (textRef.current) {
        // Make parent visible now that we're about to create spans
        textRef.current.style.opacity = '1'
        textRef.current.style.visibility = 'visible'
        
        const spans = splitText(textRef.current, type)
        spansRef.current = spans || []
        if (spans && spans.length > 0) {
          try {
            console.log(`Animating text with ${spans.length} ${type}`)
            // Set initial state - hide spans before animation
            gsap.set(spans, {
              autoAlpha: 0,
              y: 20,
              filter: 'blur(0px)'
            })
            
            // Animate
            gsap.to(spans, {
              autoAlpha: 1,
              y: 0,
              duration: animationConfig.duration,
              stagger: animationConfig.stagger,
              ease: animationConfig.ease,
              delay: animationConfig.delay,
              onComplete: () => {
                console.log('Text animation completed')
              }
            })
          } catch (error) {
            console.error('Error animating text:', error)
            // Fallback: make text visible
            spans.forEach(span => {
              span.style.opacity = '1'
              span.style.visibility = 'visible'
              span.style.transform = 'translateY(0)'
            })
          }
        } else {
          console.log(`No ${type} to animate`)
        }
      } else {
        console.log('textRef.current is null')
      }

      // Add mouse move handler for hover effect
      mouseMoveHandlerRef.current = (e) => {
        const allSpans = spansRef.current
        if (allSpans.length === 0) return

        allSpans.forEach((span) => {
          const rect = span.getBoundingClientRect()
          const spanCenterX = rect.left + rect.width / 2
          const spanCenterY = rect.top + rect.height / 2
          
          const mouseX = e.clientX
          const mouseY = e.clientY
          
          const dx = spanCenterX - mouseX
          const dy = spanCenterY - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Maximum distance for effect
          const maxDistance = hoverConfig.maxDistance
          
          if (distance < maxDistance) {
            // Calculate how much to move based on distance
            const force = (maxDistance - distance) / maxDistance
            const moveDistance = force * hoverConfig.moveDistance
            
            // Calculate angle
            const angle = Math.atan2(dy, dx)
            
            // Calculate new position
            const moveX = Math.cos(angle) * moveDistance
            const moveY = Math.sin(angle) * moveDistance
            
            // Calculate blur based on movement distance
            const blurAmount = force * hoverConfig.maxBlur
            
            // Animate the span away from cursor with blur
            gsap.to(span, {
              x: moveX,
              y: moveY,
              filter: `blur(${blurAmount}px)`,
              duration: 0.3,
              ease: 'power2.out'
            })
          } else {
            // Return to original position if mouse is far away
            gsap.to(span, {
              x: 0,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.5,
              ease: 'power2.out'
            })
          }
        })
      }

      // Add mouse leave handler to reset positions
      mouseLeaveHandlerRef.current = () => {
        const allSpans = spansRef.current
        allSpans.forEach((span) => {
          gsap.to(span, {
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.out'
          })
        })
      }

      // Get the container element (parent of text element)
      const container = textRef.current?.parentElement
      if (container) {
        containerRef.current = container
        container.addEventListener('mousemove', mouseMoveHandlerRef.current)
        container.addEventListener('mouseleave', mouseLeaveHandlerRef.current)
      }
    }

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      // Small delay to ensure everything is rendered
      setTimeout(animateText, 100)
    })

    // Cleanup function
    return () => {
      cancelAnimationFrame(rafId)
      if (containerRef.current && mouseMoveHandlerRef.current && mouseLeaveHandlerRef.current) {
        containerRef.current.removeEventListener('mousemove', mouseMoveHandlerRef.current)
        containerRef.current.removeEventListener('mouseleave', mouseLeaveHandlerRef.current)
      }
    }
  }, [children, type, animationConfig, hoverConfig])

  return (
    <span 
      ref={textRef} 
      className={className} 
      style={style}
    >
      {children}
    </span>
  )
}
