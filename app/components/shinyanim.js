import React from 'react';
import { motion } from 'framer-motion';

const ShinyAnim = ({ index }) => {
    return (
        <motion.div
        key={index}
        initial={{ opacity: 0.5, background: 'linear-gradient(120deg, rgba(238, 250, 255, 0.03) 0%, rgba(238, 250, 255, 0.5) 41%, rgba(238, 250, 255, 1) 54%, rgba(238, 250, 255, 0.63) 68%, rgba(238, 250, 255, 0.1) 100%)' }}
        whileHover={{ opacity: 1, background: 'linear-gradient(60deg, rgba(238, 250, 255, 0.03) 0%, rgba(238, 250, 255, 0.5) 41%, rgba(238, 250, 255, 1) 54%, rgba(238, 250, 255, 0.63) 68%, rgba(238, 250, 255, 0.1) 100%)' }}
        transition={{ duration: 2, type: "spring", ease: "easeInOut" }}
        className="shiny-anim"
        >
        </motion.div>
    );
};

export default ShinyAnim;