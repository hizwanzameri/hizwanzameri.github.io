import { motion } from 'framer-motion';
import Image from 'next/image';

const TimelineItem = ({ index, year = "2024", icon = "/file-check.svg", title = 'Assignment 1', subtitle = "20/1/2024", startDate = "N/A", endDate = "", duration = "", location = "N/A", end = false }) => {
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "spring", delay: index * 0.4 }}
        className="flex flex-row w-full min-h-32 gap-4">
        <div className={`flex flex-col items-center justify-start `}>
          <span className="text-[10px] border-1 border-white/30 rounded-full px-2 py-1">{year}</span>
          {end ? false :
            <motion.div 
              className="bg-white/30 h-full w-px"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.8, delay: index * 0.4 + 0.2 }}
            ></motion.div>
          }
        </div>
        <div className="w-full flex flex-col">
          <h1 className="font-bold">{title}</h1>
          <span className="text-sm">{subtitle}</span>
          <span className="text-xs">{startDate} - {endDate} · {duration}</span>
          <div className="text-xs">{location}</div>
        </div>
      </motion.div>
  
    )
  }

export default TimelineItem;