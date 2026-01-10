import React from 'react';

const Navbar = () => {
    return (
        <div className="shiny-navbar">
            <div className="shiny-stroke-mask">
                <div className="shiny-bg"></div>
            </div>
            <div className="flex flex-row gap-8 items-center justify-center">
                <span className="flex flex-row gap-2 items-center justify-center"><div className="navbar-active-indicator"></div>Home</span>
                <span>My Work</span>
                <span>Work Experience</span>
                <span>About Me</span>
            </div>
            
        </div>
    );
};

export default Navbar;