import {
  AnimatePresence,
  motion,
  useInView,
  useAnimation,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FiExternalLink } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import { MdExpandMore } from "react-icons/md";

import Highlight from "./Highlight";
import useWindowDimensions from "./WindowDimensions";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { changeCursor } from "../slices/cursorSlice";

const Project = ({
  toRight,
  name,
  image,
  imageAlt,
  description,
  usedSkills,
  demo,
  code,
}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const animation = useAnimation();
  const { asPath } = useRouter();
  const { height, width } = useWindowDimensions();
  const isInView = useInView(ref, { once: true });

  const [focusDetails, setFocusDetails] = useState(false);
  const [focusImage, setFocusImage] = useState(true);
  const [focusStyle, setFocusStyle] = useState(
    `hover:delay-150 hover:scale-90`
  );
  const [nonFocusStyle, setNonFocusStyle] = useState(
    `cursor-s-resize scale-95 hover:translate-y-[50%]`
  );
  const [focusStyleDisabled, setFocusStyleDisabled] = useState(false);

  const [detailsIndex, setDetailsIndex] = useState(-1);
  const [imagesIndex, setImagesIndex] = useState(0);
  const [durationDetails, setDurationDetails] = useState(1000);
  const [durationImages, setDurationImages] = useState(300);

  const [imageBlur, setImageBlur] = useState(true);
  const [blur, setBlur] = useState(false);
  const [blurStrength, setBlurStrength] = useState(`blur-[1px]`);

  const [detailsExpand, setDetailsExpand] = useState(false); //true
  const [mySkillsArray, setMySkillsArray] = useState([]);

  const [firstLoad, setFirstLoad] = useState(true);
  const [disabledHover, setDisabledHover] = useState(false);

  useEffect(() => {
    setMySkillsArray(usedSkills);

    setTimeout(() => {
      setFirstLoad(false);
    }, 500);

    setTimeout(() => setImageBlur(false), 500);
  }, []);

  useEffect(() => {
    width < 1024 ? setDetailsExpand(true) : setDetailsExpand(false);
    if (width >= 1024) handleDetails();
  }, [width]);

  const handleDetails = () => {
    if (focusDetails) return;

    if (width >= 640) {
      setFocusStyleDisabled(true);
      setFocusDetails(true);
      setFocusImage(false);
      setDetailsExpand(false);
      setBlur(true);

      setTimeout(() => {
        setDetailsIndex(0);
        setTimeout(() => {
          setBlur(false);
          setImagesIndex(-1);
        }, 500);
      }, 500);

      setTimeout(() => {
        setDurationDetails(300);
        setDurationImages(1000);
        setFocusStyleDisabled(false);
      }, 2000);
      return;
    }

    setFocusStyleDisabled(true);
    setFocusDetails(true);
    setFocusImage(false);
    setDetailsExpand(false);
    setBlur(true);

    setTimeout(() => {
      setDetailsIndex(0);
      setTimeout(() => {
        setBlur(false);
        setImagesIndex(-1);
      }, 500);
    }, 500);

    setTimeout(() => {
      setDurationDetails(300);
      setDurationImages(1000);
      setFocusStyleDisabled(false);
    }, 2000);
  };

  const handleImages = () => {
    if (width >= 1060) return;
    if (focusImage) return;

    setFocusImage(true);
    setFocusDetails(false);
    setFocusStyleDisabled(true);
    setDisabledHover(true);
    setBlur(true);

    setTimeout(() => {
      setImagesIndex(0);
      setTimeout(() => {
        setBlur(false);
        setDetailsIndex(-1);
      }, 500);
    }, 500);

    setTimeout(() => {
      setDetailsExpand(true);
      setDurationImages(300);
      setDurationDetails(1000);
      setFocusStyleDisabled(false);
      setTimeout(() => setDisabledHover(false), 750);
    }, 2000);
  };

  const sortSkills = Array.isArray(mySkillsArray)
    ? mySkillsArray.sort((a, b) => (a.length < b.length ? 1 : 0))
    : usedSkills.sort((a, b) => (a.length < b.length ? 1 : 0));

  useEffect(() => {
    if (asPath.includes("#projects")) return;
    if (isInView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.25 },
      });
    }
    if (!isInView) animation.start({ opacity: 0.75, y: 30 });
  }, [isInView]);

  return (
    <motion.div
      animate={animation}
      className={`flex relative z-0 justify-center w-full duration-500 h-[19rem] sm:flex-row`}
      ref={ref}
    >
      <motion.div
        onMouseEnter={() => dispatch(changeCursor("image"))}
        onMouseLeave={() => dispatch(changeCursor("default"))}
        className={`absolute overflow-hidden bg-primary max-h-[353px] min-h-full w-full max-w-[529px] duration-${durationImages} z-[${imagesIndex}]
        sm:w-4/5 ${toRight ? `sm:left-0` : `sm:right-0`} sm:translate-y-0
        ${
          focusImage
            ? `${!focusStyleDisabled ? focusStyle : null} ${
                blur ? `${blurStrength}` : null
              }`
            : !focusStyleDisabled
            ? nonFocusStyle
            : null
        } 
        ${
          focusImage
            ? `
            ${
              disabledHover
                ? `hover:scale-100`
                : `md:hover:scale-95 hover:delay-700`
            }
            ${
              blur
                ? `sm:mt-0 translate-y-[110%] sm:translate-y-[0%] ${
                    toRight ? "images-left" : "images-right"
                  }
                `
                : `translate-y-[0%] sm:translate-x-[0%]`
            }
            
            `
            : `
            lg:scale-100 hover:delay-700
            ${focusStyleDisabled ? `delay-[2000ms]` : null} 
            translate-y-[25%]    ${
              toRight ? "sm:translate-x-[-2.5%]" : "sm:translate-x-[2.5%]"
            }  lg:translate-x-[0%] hover:sm:translate-y-0

            ${
              toRight
                ? "hover:sm:translate-x-[-7%]"
                : "hover:sm:translate-x-[7%]"
            }
            ${toRight ? "sm:cursor-w-resize" : "sm:cursor-e-resize"}
           `
        }
        
      `}
        onClick={() => handleImages()}
      >
        <AnimatePresence>
          {imageBlur && (
            <motion.div
              className="z-[1] backdrop-blur-[1px] w-full h-full absolute top-0 left-0"
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            ></motion.div>
          )}
        </AnimatePresence>

        <Image
          src={`/${image}`}
          fill
          object-fit="cover"
          alt={imageAlt}
          quality={100}
        />
      </motion.div>

      <motion.div
        className={`
         project-details ${
           toRight ? `sm:right-0` : `sm:left-0`
         }   duration-${durationDetails} z-[${detailsIndex}] 
        ${
          focusDetails
            ? `${!focusStyleDisabled && focusStyle} ${blur && blurStrength}`
            : !focusStyleDisabled && nonFocusStyle
        }
        ${
          focusDetails
            ? `
            hover:scale-100 sm:hover:scale-[85%]

            ${width < 1024 && `backdrop-blur`}
            ${
              blur
                ? `translate-y-[100%]  ${
                    toRight ? "details-right" : "details-left"
                  } 
                `
                : `translate-y-[0%] ${
                    toRight ? "sm:translate-x-[7.5%]" : "sm:translate-x-[-7.5%]"
                  }`
            }`
            : `
            sm:hover:delay-1000 sm:hover:scale-[87.5%] ${
              toRight ? "details-right-hover" : "details-left-hover"
            }
            ${
              firstLoad
                ? `translate-y-[0%] ${
                    toRight ? "sm:translate-x-[-50%]" : "sm:translate-x-[50%]"
                  } hover:delay-[0]`
                : `
                  ${!focusStyleDisabled && `translate-y-[25%]`}
                  ${
                    toRight ? "sm:translate-x-[7.5%]" : "sm:translate-x-[-7.5%]"
                  }`
            }
            ${toRight ? "sm:cursor-e-resize" : "sm:cursor-w-resize"}
            `
        }
        sm:translate-y-[-2.5%] sm:scale-[85%] sm:hover:translate-y-[-2.5%]  
        `}
        onClick={() => handleDetails()}
      >
        <div
          className={`text-2xl sm:text-[1.65rem] lg:text-3xl mb-4 font-semibold inline-flex justify-center w-full ${
            toRight
              ? `lg:justify-end ${detailsExpand ? `lg:pr-[3.5rem]` : "lg:pr-0"}`
              : `lg:justify-start ${detailsExpand ? `lg:pl-[2rem]` : "lg:pl-0"}`
          } duration-300`}
        >
          <Highlight
            duration={0.4}
            text={name}
            hide={true}
            small={true}
            dot={true}
          />
        </div>

        <div
          className={`sm:text-lg lg:text-xl mb-2.5 extra-small:mb-4 font-medium 
          lg:bg-opacity-100 lg:rounded lg:bg-dark-primary lg:py-4  ${
            toRight ? "lg:text-right" : "lg:text-left"
          }
          `}
          onMouseEnter={() => dispatch(changeCursor("text"))}
          onMouseLeave={() => dispatch(changeCursor("default"))}
        >
          {description}
        </div>
        <div
          className={`sm:text-[1.05rem] lg:text-lg mb-2.5 flex flex-wrap gap-x-1 ${
            toRight ? `lg:justify-end` : `lg:justify-start`
          }`}
        >
          <div
            className={`flex gap-x-2.5 items-center w-max flex-wrap ${
              toRight ? "lg:justify-end" : "lg:justify-start"
            }`}
            onMouseEnter={() => dispatch(changeCursor("text"))}
            onMouseLeave={() => dispatch(changeCursor("default"))}
          >
            {sortSkills.map((skill, i) => {
              let text = skill;
              let bracket, wordOne, wordTwo, seperator;

              if (skill.includes("(")) {
                [text, bracket] = skill.split(" ");
              }
              if (text.includes("/")) {
                [wordOne, wordTwo] = text.split("/");
                seperator = "/";
              }
              return (
                <div
                  key={i}
                  className="inline-flex items-center min-w-max font-medium text-gray-300"
                >
                  {wordOne ? (
                    <span className="flex items-center">
                      {wordOne}
                      <span className={`px-0.5 text-2xl opacity-50`}>
                        {seperator}
                      </span>
                      {wordTwo}
                    </span>
                  ) : (
                    text
                  )}{" "}
                  {bracket ? (
                    <span className="ml-1 text-base opacity-50">{bracket}</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`absolute sm:static bottom-2 tiny:bottom-6 flex items-center ${
            toRight ? "justify-end" : "justify-start"
          }`}
        >
          <span className="px-1.5 py-1 text-3xl duration-300 cursor-pointer hover:text-secondary">
            <Link href={code} target="_blank" rel="noreferrer noopener">
              <FiGithub />
            </Link>
          </span>
          {demo && (
            <span className="px-1.5 py-1 text-3xl duration-300 cursor-pointer hover:text-secondary">
              <Link href={demo} target="_blank" rel="noreferrer noopener">
                <FiExternalLink />
              </Link>
            </span>
          )}
        </div>
        <AnimatePresence>
          {detailsExpand && (
            <motion.span
              initial={
                width >= 640
                  ? {
                      top: 15,
                      width: "3rem",
                      height: "3rem",
                      rotate: toRight ? -90 : 90,
                      left:
                        width >= 768
                          ? toRight
                            ? `85%`
                            : `2.5%`
                          : toRight
                          ? "0%"
                          : "85%",
                      opacity: width >= 768 ? 0 : 1,
                    }
                  : { left: 0, bottom: 200 }
              }
              animate={
                width >= 640
                  ? {
                      left: toRight ? `85%` : `2.5%`,
                      opacity: 1,
                    }
                  : { bottom: width >= 360 ? 22.5 : 5, opacity: 1 }
              }
              exit={{ opacity: 0, transition: { duration: 1 } }}
              transition={{ duration: width >= 768 ? 0.5 : 1.5 }}
              className={`flex absolute justify-center w-full text-4xl z-[-1]`}
            >
              <span className="px-1.5 py-1 duration-300 cursor-pointer hover:text-secondary">
                <MdExpandMore />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Project;
