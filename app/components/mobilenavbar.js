import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ShinyAnim from './shinyanim';
import DarkTooltip from './darktooltip';
import MobileMenu from './mobilemenu';

const MobileNavbar = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    return (
        <>
        {open && (<MobileMenu />)}
        {open && (<DarkTooltip text="Close menu" className="mobile-navbar-tooltip" />)}
        <div className="mobile-navbar-container flex flex-row items-center justify-center">
        <motion.div 
            className="mobile-navbar shiny-navbar navbar-radius shadow-lg block md:hidden"
        >
            <div className="shiny-stroke-mask navbar-radius">
                <ShinyAnim index={0} />
            </div>
            <motion.div className="flex flex-row gap-2 items-center justify-center gradient-text">
                <AnimatePresence>
                    {!open && (
                        <>
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <Image src="/theme-btn.png" alt="theme toggle button" width={54} height={54} />
                            </motion.div>
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                            >
                                <Image src="/home-btn.png" alt="home button" width={54} height={54} />
                            </motion.div>
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
                            >
                                <Image src="/contact-btn.png" alt="contact button" width={54} height={54} />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
                <motion.div 
                    layout 
                    className="z-100" 
                    onClick={handleOpen} 
                    whileTap={{ scale: 1.2 }}
                    style={{
                        touchAction: 'manipulation',
                        userSelect: 'none',
                        WebkitTouchCallout: 'none',
                        WebkitUserSelect: 'none'
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                >
                {open ? <Image src="/close-menu-btn.png" className="cursor-pointer z-100" alt="close menu button" width={54} height={54}/> : <Image src="/menu-btn.png" className="cursor-pointer z-100" alt="menu button" width={54} height={54}/>}
                </motion.div>
            </motion.div>
        </motion.div>
        </div>
        </>
    );
};

export default MobileNavbar;