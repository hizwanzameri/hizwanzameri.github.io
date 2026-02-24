import React from 'react';
import ShinyAnim from './shinyanim';
import Image from 'next/image';

const ShinyCard = ({ title, description, icon }) => {
    return (
        <div className="shiny-card w-full card-radius shadow-lg h-100">
            <div className="shiny-stroke-mask card-radius">
                <ShinyAnim index={0} />
            </div>
            <div className="flex flex-col gap-2 items-start w-full">
                <Image src={icon} alt={title} width={54} height={54} />
               <span className="card-title-text gradient-text">{title}</span>
               <span className="card-body-text">{description}</span>
            </div>
        </div>
    );
};

export default ShinyCard;