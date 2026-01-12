import React from 'react';
import Image from 'next/image';
import ShinyAnim from './shinyanim';

const QuickButtons = () => {
    return (
        <div className="bottom-quick-buttons shiny-navbar navbar-radius shadow-lg hidden md:block">
            <div className="shiny-stroke-mask navbar-radius">
                <ShinyAnim index={0} />
            </div>
            <div className="flex flex-row gap-2 items-center justify-center gradient-text">
                <Image src="/contact-btn.png" alt="contact button" width={54} height={54} />
                <Image src="/theme-btn.png" alt="theme toggle button" width={54} height={54} />
            </div>
        </div>
    );
};

export default QuickButtons;