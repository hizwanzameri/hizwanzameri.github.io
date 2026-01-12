import React from 'react';
import ShinyAnim from './shinyanim';

const DarkTooltip = ({ text, className }) => {
    return (
        <div className={`dark-tooltip shiny-navbar navbar-radius shadow-lg flex flex-row gap-2 items-center justify-center ${className}`}>
            <div className="shiny-stroke-mask navbar-radius">
                <ShinyAnim index={0} />
            </div>
            <span className="text-sm gradient-text">{text}</span>
        </div>
    );
};

export default DarkTooltip;