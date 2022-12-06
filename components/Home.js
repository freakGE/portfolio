import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

import Highlight from "../components/Highlight";
import useWindowDimensions from "../components/WindowDimensions";

const Home = () => {
  const { height, width } = useWindowDimensions();
  const mobileWidth = 530;

  const hamburgerIsOpen = useSelector(state => state.hamburger.hamburgerIsOpen);

  const [nicknameShown, setNicknameShown] = useState(true);
  const [seperatorShown, setSeperatorShown] = useState(false);
  const [titleShown, setTitleShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNicknameShown(false);
      setSeperatorShown(true);
      setTitleShown(true);
    }, 3000);
  }, []);

  return (
    <section
      className={`${
        hamburgerIsOpen && width <= mobileWidth
          ? "bg-opacity-0"
          : "bg-dark-primary"
      } wrapper-container home `}
    >
      <div className={`flex items-center h-full duration-1000 wrapper`}>
        <AnimatePresence>
          {!(hamburgerIsOpen && width <= mobileWidth) && (
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -500, transition: { duration: 2 } }}
              transition={{ duration: 2 }}
            >
              <header
                className={`flex flex-col items-start mb-3 max-w-3xl text-4xl tiny:text-[2.5rem] extra-small:text-5xl lg:mb-0 text-primary lg:items-center lg:flex-row`}
              >
                <AnimatePresence>
                  <div
                    className={`${seperatorShown ? "pr-0" : "pr-5"} ${
                      hamburgerIsOpen ? "static" : "relative"
                    } flex items-center text-left lg:text-right xl:w-full lg:w-32 `}
                  >
                    Hi, I’m Saba
                    {/* <AnimatePresence> */}
                    {nicknameShown && (
                      <motion.span
                        className="absolute -bottom-5 right-6 h-full duration-200 xl:static lg:h-fit lg:-right-28 lg:bottom-0 lg:absolute sm:static"
                        initial={{ x: -150, opacity: 0, scale: 0.5 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{
                          position: "absolute",
                          opacity: 0,
                          transition: { duration: 0.5 },
                        }}
                        transition={{ duration: 1 }}
                      >
                        <span className="inline-flex text-lg lg:text-2xl text-dark-secondary">
                          the Builder
                        </span>
                      </motion.span>
                    )}
                    {/* </AnimatePresence> */}
                    {seperatorShown && (
                      <motion.div
                        className="hidden seperator-y lg:block"
                        initial={{ x: -200, opacity: 0, scale: 0.5 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      ></motion.div>
                    )}
                  </div>
                  {titleShown && (
                    <motion.div
                      className={`${
                        hamburgerIsOpen ? "hidden extra-small:flex" : "flex"
                      } highlight mt-1 flex-wrap xl:flex-nowrap  xl:w-full lg:w-64 w-min`}
                      initial={{ x: 400, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -250, opacity: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <Highlight text="Front-End Developer" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </header>
              <div className="px-0 w-full lg:px-32 xl:px-0">
                <p className="w-4/5 text-xl text-gray-300 sm:w-3/5 lg:w-3/5 lg:ml-2 xl:ml-0 xl:w-3/5">
                  I like to code things from scratch, and enjoy bringing ideas
                  to life in the browser.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Home;
