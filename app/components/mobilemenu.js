import React from 'react';
import Navbar from './navbar';

const MobileMenu = () => {
    return (
        <div className="mobile-menu-container">
            <Navbar isMobile={true} />                  
        </div>
    );
};

export default MobileMenu;