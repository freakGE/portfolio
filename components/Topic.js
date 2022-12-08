import { motion } from "framer-motion";
import Highlight from "./Highlight";
import useWindowDimensions from "../components/WindowDimensions";

const Topic = ({ topic }) => {
  const { height, width } = useWindowDimensions();

  const mediumWidth = 768;

  return (
    <motion.div className="overflow-hidden title-container">
      <h1 className="relative title md:ml-[3rem]">
        <Highlight text={topic} hide={true} title={true} />
        <div className="absolute bottom-2.5 z-[-1] w-full border border-dark-primary" />
      </h1>
      <motion.div
        initial={width >= mediumWidth ? { x: -750 } : { scaleX: 0 }}
        animate={width >= mediumWidth ? { x: 0 } : { scaleX: 1 }}
        transition={{ duration: 3 }}
        className="title-line"
      ></motion.div>
    </motion.div>
  );
};

export default Topic;
