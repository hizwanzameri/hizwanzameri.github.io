import React from 'react';

const ShinyCard = ({ title, description }) => {
    return (
        <div className="shiny-card w-full card-radius shadow-lg">
            <div className="shiny-stroke-mask card-radius">
                <div className="shiny-bg"></div>
            </div>
            <div className="flex flex-col gap-2 items-start w-full">
               <span className="card-title-text gradient-text">{title}</span>
               <span className="card-body-text">{description}</span>
            </div>
        </div>
    );
};

export default ShinyCard;