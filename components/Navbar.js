import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openHamburger } from "../slices/hamburgerSlice";
import { scrollToSection } from "../slices/routerSlice";

import Highlight from "./Highlight";
import IconMenu from "./IconMenu";
import Logo from "./Logo";
import ModalMenu from "./ModalMenu";
import useWindowDimensions from "./WindowDimensions";

const Navbar = () => {
  const { height, width } = useWindowDimensions();

  const [mobileWidth, setMobileWidth] = useState(410);
  const [breakWidth, setBreakWidth] = useState(768);
  const [smallScreen, setSmallScreen] = useState(false);
  const dispatch = useDispatch();

  const hamburgerIsOpen = useSelector(state => state.hamburger.hamburgerIsOpen);
  const choosenSection = useSelector(state => state.section.choosenSection);

  const [hamburgerHover, setHamburgerHover] = useState(false);
  const [hamburgerClick, setHamburgerClick] = useState(false);
  // !
  const [currentScroll, setCurrentScroll] = useState(0);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrollUp, setScrollUp] = useState(false);
  const [resumeHover, setResumeHover] = useState(false);
  const [resumeTimeout, setResumeTimeout] = useState(true);

  useEffect(() => {
    if (scrollUp || currentScroll <= 20) setResumeTimeout(true);

    function handleScroll() {
      setCurrentScroll(scrollY);

      let smooth = 0;
      if (currentScroll + smooth > lastScroll) {
        setScrollUp(false);
      } else {
        setScrollUp(true);
      }
    }
    setLastScroll(scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentScroll]);

  useEffect(() => {
    if (!resumeTimeout) return;
    setTimeout(() => {
      setResumeTimeout(false);
    }, 2500);
  }, [resumeTimeout]);

  useEffect(() => {
    setBreakWidth(768);
    setMobileWidth(410);
  }, []);

  useEffect(() => {
    width <= breakWidth ? setSmallScreen(true) : setSmallScreen(false);
  }, [width, breakWidth]);

  useEffect(() => {
    dispatch(openHamburger(hamburgerClick));
    if (width <= breakWidth) return;
    dispatch(openHamburger(false));
    setHamburgerClick(false);
  }, [hamburgerClick, width]);

  const [swapping, setSwapping] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => setFirstLoad(false), 2500);
  }, []);

  const handleHamburger = () => {
    dispatch(openHamburger(!hamburgerIsOpen));
    setSwapping(true);
    setHamburgerHover(true);
    setTimeout(() => {
      setSwapping(false);
      setHamburgerHover(false);
    }, 700);
  };

  return (
    <nav className="wrapper-container">
      <AnimatePresence>
        {(scrollUp || currentScroll <= 20) && (
          <motion.nav
            className={`flex sticky top-0 justify-between items-center py-4 duration-300 navbar-wrapper`}
            initial={{ y: -500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={
              hamburgerIsOpen && width <= mobileWidth
                ? { x: -500, transition: { duration: 2 } }
                : { y: -500, transition: { duration: 1 } }
            }
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <motion.div>
                <Logo
                  size="5"
                  navbar={true}
                  isVisible={scrollUp || currentScroll === 0}
                />
              </motion.div>
            </Link>
            <div className="hidden gap-3 items-end text-xl font-medium md:flex">
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
              <Link href="Resume.pdf" target="_blank" rel="noreferrer noopener">
                <motion.div
                  onMouseEnter={() => {
                    setResumeHover(true);
                  }}
                  onMouseLeave={() => {
                    setResumeHover(false);
                    setResumeTimeout(false);
                  }}
                  className="duration-[700ms] text-primary font-semibold px-2 py-1 relative flex items-center overflow-hidden z-0"
                >
                  Resume
                  <motion.div
                    initial={{ y: 150 }}
                    animate={{ y: 0 }}
                    transition={{ duration: resumeTimeout ? 4 : 2.25 }}
                    className=" w-full h-full absolute -z-[1] "
                  >
                    <motion.span
                      initial={{ scale: 6, x: 0 }}
                      animate={
                        resumeHover
                          ? { scale: 3, rotate: 45 }
                          : { scale: 1, x: -60, rotate: 45 }
                      }
                      transition={{
                        duration:
                          resumeTimeout === true && resumeHover === false
                            ? 5
                            : 0.5,
                      }}
                      className="-z-[1] absolute w-full h-full bg-secondary"
                    />
                  </motion.div>
                </motion.div>
              </Link>
            </div>
            {smallScreen ? (
              <div
                className={`absolute z-[-51]  top-0 left-0 h-screen w-screen m-0 p-0 duration-1000 ${
                  hamburgerIsOpen
                    ? "backdrop-blur-sm backdrop-opacity-100 delay-500 sm:backdrop-opacity-0 extra-small:backdrop-opacity-30"
                    : `delay-1000 backdrop-blur-0`
                }`}
              >
                <ModalMenu isVisible={hamburgerIsOpen} />
              </div>
            ) : null}

            {smallScreen && (
              <motion.div
                className="w-[3rem] h-[3rem] cursor-pointer relative flex items-center justify-center duration-500 z-[2] "
                onClick={() => handleHamburger()}
                onMouseEnter={() => setHamburgerHover(true)}
                onMouseLeave={() => setHamburgerHover(false)}
              >
                <div
                  className={`absolute ${
                    hamburgerHover ? `w-4/6` : `w-5/6`
                  } h-4/6 duration-300
                  ${
                    hamburgerIsOpen
                      ? `
                    ${
                      swapping
                        ? `translate-x-[-0.75rem] translate-y-[0.75rem] h-full w-full scale-75`
                        : `z-[0] ${
                            hamburgerHover
                              ? `translate-x-[0.125rem] translate-y-[-0.125rem]`
                              : `translate-x-[0.25rem] translate-y-[-0.25rem]`
                          }`
                    }`
                      : `
                      ${
                        swapping
                          ? `translate-x-[0.75rem] translate-y-[-0.75rem] scale-75`
                          : ` z-[1]
                          ${
                            hamburgerHover
                              ? `translate-x-[-0.125rem] translate-y-[0.125rem] scale-75`
                              : `translate-x-[-0.25rem] translate-y-[0.25rem]`
                          }
                          `
                      }
                     
                      `
                  }`}
                >
                  <IconMenu
                    hover={hamburgerHover}
                    scrollUp={scrollUp}
                    size={"h-[0.325rem]"}
                  />
                </div>
                <motion.div
                  className={`absolute w-4/6 h-4/6 bg-white duration-300
                  ${
                    !hamburgerIsOpen
                      ? `
                      ${
                        swapping
                          ? `translate-x-[-0.75rem] translate-y-[0.75rem] h-full w-full scale-75`
                          : `z-[0]
                          ${
                            hamburgerHover
                              ? `translate-x-[0.125rem] translate-y-[-0.125rem] `
                              : `translate-x-[0.25rem] ${
                                  firstLoad
                                    ? "translate-y-[-4.25rem]"
                                    : `translate-y-[-0.25rem]`
                                }`
                          }
                          `
                      }`
                      : `${
                          swapping
                            ? `translate-x-[0.75rem] translate-y-[-0.75rem] scale-75`
                            : `z-[1] ${
                                hamburgerHover
                                  ? `translate-x-[-0.125rem] translate-y-[0.125rem] scale-75`
                                  : `translate-x-[-0.25rem] translate-y-[0.25rem]`
                              }`
                        }`
                  }
                  `}
                />
              </motion.div>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
