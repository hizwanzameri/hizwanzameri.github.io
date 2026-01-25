'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import ShinyAnim from './shinyanim';
import DarkTooltip from './darktooltip';
import MobileMenu from './mobilemenu';

const MobileNavbar = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };

    const containerRef = useRef(null);
    const outerContainerRef = useRef(null);
    const innerContentRef = useRef(null);
    const themeBtnRef = useRef(null);
    const homeBtnRef = useRef(null);
    const contactBtnRef = useRef(null);
    const menuBtnRef = useRef(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        const handleMediaChange = (e) => {
            if (e.matches) {
                setOpen(false);
            }
        };

        mediaQuery.addEventListener('change', handleMediaChange);
        
        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (open) {
                setOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [open]);

    useEffect(() => {
        const buttons = [themeBtnRef.current, homeBtnRef.current, contactBtnRef.current].filter(Boolean);
        
        const updateContainerWidth = () => {
            if (containerRef.current && innerContentRef.current) {
                // Use double requestAnimationFrame to ensure all DOM updates are complete
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        const currentWidth = containerRef.current.offsetWidth;
                        
                        // Temporarily set width to auto to measure natural width (includes padding)
                        // This works because buttons with display:none won't contribute to width
                        const tempWidth = containerRef.current.style.width;
                        containerRef.current.style.width = 'auto';
                        // Use offsetWidth which includes padding, border, etc.
                        const targetWidth = containerRef.current.offsetWidth;
                        // Restore current width if we had one, otherwise use measured width
                        containerRef.current.style.width = tempWidth || `${currentWidth || targetWidth}px`;
                        
                        // Animate to target width
                        if (currentWidth > 0 && Math.abs(currentWidth - targetWidth) > 1) {
                            gsap.to(containerRef.current, {
                                width: targetWidth,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        } else {
                            containerRef.current.style.width = `${targetWidth}px`;
                        }
                    });
                });
            }
        };
        
        if (isInitialMount.current) {
            // Ensure menu button maintains fixed size
            if (menuBtnRef.current) {
                gsap.set(menuBtnRef.current, { width: '54px', height: '54px', flexShrink: 0 });
            }
            
            // On initial mount, ensure container has proper width with padding
            // Set width to auto first to let it size naturally with padding
            if (containerRef.current) {
                containerRef.current.style.width = 'auto';
            }
            
            // On initial mount, set initial state
            if (!open) {
                // Buttons should be visible, so animate them in
                gsap.set(buttons, { x: 100, opacity: 0, display: 'block' });
                gsap.to(buttons, {
                    x: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                    stagger: 0.1,
                    onComplete: updateContainerWidth
                });
            } else {
                // Buttons should be hidden
                gsap.set(buttons, { x: 100, opacity: 0, display: 'none' });
                // Set initial width for closed state (with padding)
                setTimeout(updateContainerWidth, 10);
            }
            isInitialMount.current = false;
            return;
        }

        if (!open) {
            // Ensure menu button maintains fixed size
            if (menuBtnRef.current) {
                gsap.set(menuBtnRef.current, { width: '54px', height: '54px', flexShrink: 0 });
            }
            
            // Animate buttons in
            gsap.set(buttons, { display: 'block' });
            // Ensure buttons maintain their fixed size
            buttons.forEach(btn => {
                if (btn) {
                    gsap.set(btn, { width: 'auto', minWidth: '54px', flexShrink: 0, x: 100, opacity: 0 });
                }
            });
            
            // Update container width to accommodate buttons (after display is set to block)
            setTimeout(updateContainerWidth, 0);
            
            // Move container back to center
            if (outerContainerRef.current) {
                gsap.to(outerContainerRef.current, {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            gsap.to(buttons, {
                x: 0,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
                stagger: 0.1
            });
        } else {
            // Ensure menu button maintains fixed size
            if (menuBtnRef.current) {
                gsap.set(menuBtnRef.current, { width: '54px', height: '54px', flexShrink: 0 });
            }
            
            // Animate buttons out (triggered when open = true)
            const currentWidth = containerRef.current.offsetWidth;
            const buttonWidth = 54; // Each button is 54px
            const gap = 8; // gap-2 = 0.5rem = 8px
            const buttonWithGap = buttonWidth + gap;
            
            // Calculate target width: current width minus all buttons and gaps
            // offsetWidth already includes padding, so this calculation is correct
            const targetWidth = currentWidth - (buttons.length * buttonWithGap);
            
            // Create a timeline to coordinate button slide-out and container shrink
            const tl = gsap.timeline();
            
            // Animate container width to shrink smoothly - start immediately
            tl.to(containerRef.current, {
                width: targetWidth,
                duration: 0.3 + (buttons.length - 1) * 0.1, // Match total button animation time
                ease: "power2.in"
            }, 0);
            
            // Move container to the right
            if (outerContainerRef.current) {
                // Calculate how far to move: from center to right edge
                // When centered: left edge is at (viewportWidth - containerWidth) / 2
                // When right-aligned: left edge should be at viewportWidth - containerWidth
                // Translation needed: (viewportWidth - containerWidth) / 2
                const viewportWidth = window.innerWidth;
                const moveDistance = (viewportWidth - targetWidth) / 2;
                
                tl.to(outerContainerRef.current, {
                    x: moveDistance - 30,
                    duration: 0.3 + (buttons.length - 1) * 0.1,
                    ease: "power2.in"
                }, 0);
            }
            
            // Animate buttons: slide out only (no shrinking, icons maintain fixed size)
            buttons.forEach((btn, index) => {
                if (btn) {
                    // Ensure buttons maintain their fixed size
                    gsap.set(btn, { width: 'auto', minWidth: '54px', flexShrink: 0 });
                    tl.to(btn, {
                        x: 100,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.in"
                    }, index * 0.1);
                }
            });
            
            // Hide buttons after animation completes
            tl.call(() => {
                gsap.set(buttons, { 
                    display: 'none',
                    x: 0
                });
            });
        }
    }, [open]);
    return (
        <>
        {open && (<MobileMenu />)}
        {open && (<DarkTooltip text="Close menu" className="mobile-navbar-tooltip" />)}
        <div ref={outerContainerRef} className="mobile-navbar-container flex flex-row items-center justify-center">
        <div 
            ref={containerRef}
            className="mobile-navbar shiny-navbar navbar-radius shadow-lg block md:hidden"
            style={{ overflow: 'hidden' }}
        >
            <div className="shiny-stroke-mask navbar-radius">
                <ShinyAnim index={0} />
            </div>
            <div ref={innerContentRef} className="flex flex-row gap-2 items-center justify-center gradient-text">
                <div ref={themeBtnRef} style={{ width: '54px', height: '54px', flexShrink: 0 }}>
                    <Image src="/theme-btn.png" alt="theme toggle button" width={54} height={54} />
                </div>
                <div ref={homeBtnRef} style={{ width: '54px', height: '54px', flexShrink: 0 }}>
                    <Image src="/home-btn.png" alt="home button" width={54} height={54} />
                </div>
                <div ref={contactBtnRef} style={{ width: '54px', height: '54px', flexShrink: 0 }}>
                    <Image src="/contact-btn.png" alt="contact button" width={54} height={54} />
                </div>
                <div 
                    ref={menuBtnRef}
                    className="z-100" 
                    onClick={handleOpen}
                    style={{
                        width: '54px',
                        height: '54px',
                        flexShrink: 0,
                        touchAction: 'manipulation',
                        userSelect: 'none',
                        WebkitTouchCallout: 'none',
                        WebkitUserSelect: 'none',
                        cursor: 'pointer'
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                    onMouseDown={(e) => {
                        gsap.to(e.currentTarget, { scale: 1.2, duration: 0.1 });
                    }}
                    onMouseUp={(e) => {
                        gsap.to(e.currentTarget, { scale: 1, duration: 0.1 });
                    }}
                    onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, { scale: 1, duration: 0.1 });
                    }}
                >
                {open ? <Image src="/close-menu-btn.png" className="cursor-pointer z-100" alt="close menu button" width={54} height={54}/> : <Image src="/menu-btn.png" className="cursor-pointer z-100" alt="menu button" width={54} height={54}/>}
                </div>
            </div>
        </div>
        </div>
        </>
    );
};

export default MobileNavbar;