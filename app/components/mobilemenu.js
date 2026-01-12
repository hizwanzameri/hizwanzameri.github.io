import React from 'react';
import Image from 'next/image';

const MobileMenu = () => {
    return (
        <div className="mobile-menu-container">
        <div className="mobile-menu shiny-navbar navbar-radius">
            <div className="shiny-stroke-mask navbar-radius">
                <div className="shiny-bg"></div>
            </div>
            <div className="flex flex-row gap-8 items-center justify-between w-full gradient-text">
                <span className="flex flex-row gap-2 items-center justify-center"><div className="navbar-active-indicator"></div>Home</span>
                <span>My Work</span>
                <span>Work Experience</span>
                <span>About Me</span>
            </div>
        </div>
        </div>
    );
};

export default MobileMenu;