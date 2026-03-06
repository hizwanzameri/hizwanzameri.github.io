import React from 'react';
import { motion } from 'framer-motion';
import TagBadge from './tagbadge';

const HighlightCard = ({ title, description, minutesToRead }) => {
    return (
        <div className="shiny-card w-full card-radius border-light">
            <div className="flex flex-col gap-2 items-start w-full">
                <span className="section-title-text">Highlight</span>
                <div className="flex flex-row gap-2 items-center mt-50">
               <TagBadge tagname={"LiDAR"} />
               <TagBadge tagname={"Raspberry Pi"} />
               <TagBadge tagname={"Hobby Project"} />
               </div>
               <span className="card-title-text gradient-text">{title}</span>
               <span className="card-body-text">{description}</span>
               <span className="text-sm gradient-text">{minutesToRead} minutes to read</span>
            </div>
        </div>
    );
};

export default HighlightCard;