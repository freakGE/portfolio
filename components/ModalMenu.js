import Link from "next/link";
import Highlight from "./Highlight";
import { AnimatePresence, motion } from "framer-motion";

import useWindowDimensions from "./WindowDimensions";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { openHamburger } from "../slices/hamburgerSlice";
import { scrollToSection } from "../slices/routerSlice";

const ModalMenu = ({ isVisible }) => {
  const dispatch = useDispatch();

  const { height, width } = useWindowDimensions();
  const mobileWidth = 410;

  const [resumeHover, setResumeHover] = useState(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: 500,
            transition: { duration: 2 },
          }}
          transition={{ duration: 1.5 }}
          className={`${
            width <= mobileWidth ? "w-full" : "w-80"
          }  absolute -z-50 right-0 top-0 h-screen bg-dark-mixed`}
        >
          <div
            className={`flex relative flex-col gap-5 justify-center items-center h-full text-3xl z-[100]`}
          >
            <Link
              href="#about"
              onClick={() => {
                dispatch(scrollToSection("about"));
              }}
            >
              <Highlight text="About" duration="3" navbar={true} />
            </Link>
            <Link
              href="#projects"
              onClick={() => {
                dispatch(scrollToSection("projects"));
              }}
            >
              <Highlight text="Projects" duration="2" navbar={true} />
            </Link>
            <Link
              href="#contact"
              onClick={() => {
                dispatch(scrollToSection("contact"));
              }}
            >
              <Highlight text="Contact" duration="1.5" navbar={true} />
            </Link>
            <Link
              href="Resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => {
                dispatch(openHamburger(false));
              }}
            >
              <motion.div
                onMouseDown={() => {
                  setResumeHover(true);
                  setTimeout(() => setResumeHover(false), 650);
                }}
                onMouseEnter={() => setResumeHover(true)}
                onMouseLeave={() => setResumeHover(false)}
                className="duration-[700ms] text-primary font-semibold px-2 py-1 relative flex items-center overflow-hidden z-0"
              >
                Resume
                <motion.div
                  initial={{ x: 400, opacity: 0.8 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className=" w-full h-full absolute -z-[1] "
                >
                  <motion.span
                    initial={{ x: 0 }}
                    animate={
                      resumeHover
                        ? { scale: 3, rotate: 45 }
                        : { scale: 1, x: -80, rotate: 45 }
                    }
                    transition={{ duration: 0.5 }}
                    className="-z-[1] absolute w-full h-full bg-secondary"
                  />
                </motion.div>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalMenu;
