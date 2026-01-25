'use client';

import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const menuItems = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/work',
        label: 'My Work'
    },
    {
        href: '/experience',
        label: 'Work Experience'
    },
    {
        href: '/about',
        label: 'About Me'
    }
]

const Navbar = ({isMobile = false}) => {
    const pathname = usePathname();
    const [activeItem, setActiveItem] = useState(0);
    const [indicatorPosition, setIndicatorPosition] = useState({ left: 0, top: 0 });
    const itemRefs = useRef([]);

    useEffect(() => {
        const activeIndex = menuItems.findIndex(item => item.href === pathname);
        setActiveItem(activeIndex);
    }, [pathname]);

    useEffect(() => {
        if(isMobile) return;
        const updateIndicatorPosition = () => {
            if (itemRefs.current[activeItem]) {
                const activeElement = itemRefs.current[activeItem];
                const parentRect = activeElement.closest('.fixed-navbar').getBoundingClientRect();
                const itemRect = activeElement.getBoundingClientRect();
                
                // Position to the left of the item (12px circle + some spacing)
                const left = itemRect.left - parentRect.left - 20; // 12px circle + 8px spacing
                const top = itemRect.top - parentRect.top + (itemRect.height / 2) - 6; // Center vertically (6px = half of 12px)
                
                setIndicatorPosition({ left, top });
            }
        };

        updateIndicatorPosition();
        window.addEventListener('resize', updateIndicatorPosition);
        
        return () => window.removeEventListener('resize', updateIndicatorPosition);
    }, [activeItem, isMobile]);

    return (
        <div className={`${isMobile ? 'mobile-navbar' : 'fixed-navbar'} shiny-navbar navbar-radius relative overflow-hidden`}>
            <div className="flex flex-row gap-8 items-center justify-between w-full gradient-text"
            style={{ zIndex: 9999 }}>
                <Image src="/logo.png" alt="logo" width={30} height={30} />
                {menuItems.map((item, index) => (
                    <Link 
                        href={item.href} 
                        key={item.href} 
                        onClick={() => {
                            const itemIndex = menuItems.findIndex(i => i.href === item.href);
                            setActiveItem(itemIndex);
                        }}
                    >
                        <span 
                            ref={(el) => itemRefs.current[index] = el}
                            className="ms-4 flex flex-row gap-2 items-center justify-center"
                        >
                        {item.label}
                        </span>
                    </Link>
                ))}
            </div>
            { !isMobile && (
            <motion.div 
                className="navbar-active-indicator absolute"
                initial={false}
                animate={{
                    left: `${indicatorPosition.left}px`,
                    top: `${indicatorPosition.top}px`,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                }}
            />
            )}
            <div className="shiny-stroke-mask navbar-radius -z-10">
                <div className="shiny-bg"></div>
            </div>
        </div>
    );
};

export default Navbar;