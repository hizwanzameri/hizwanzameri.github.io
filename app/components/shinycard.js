import React from 'react';
import ShinyAnim from './shinyanim';
import Image from 'next/image';

const ShinyCard = ({ title, description, icon, cta }) => {
    return (
        <div className="shiny-card w-full card-radius shadow-lg h-100 flex flex-col">
            <div className="shiny-stroke-mask card-radius">
                <ShinyAnim index={0} />
            </div>
            <div className="relative z-10 flex flex-col gap-2 items-start w-full h-full">
                {icon && (
                  <Image src={icon} alt={title} width={54} height={54} />
                )}
               <span className="card-title-text gradient-text">{title}</span>
               <span className="card-body-text">{description}</span>
               {cta && (
                 <span className="mt-auto pt-4 text-sm gradient-text underline underline-offset-4 decoration-white/40">
                   {cta}
                 </span>
               )}
            </div>
        </div>
    );
};

export default ShinyCard;
