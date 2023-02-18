import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { BiErrorAlt } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";
import { IoPaperPlane } from "react-icons/io5";

import Link from "next/link";

import Topic from "./Topic";
import Highlight from "./Highlight";
// import dynamic from "next/dynamic";
// const Topic = dynamic(() => import("./Topic"));
// const Highlight = dynamic(() => import("./Highlight"));

import { changeCursor } from "../slices/cursorSlice";
import { useDispatch } from "react-redux";

const Contact = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const bottomRef = useRef(null);

  const isInView = useInView(ref, { once: true });
  const bottomOfContact = useInView(bottomRef, { once: true });

  const [formState, setFormState] = useState({});
  const [invalidEmail, setInvalidEmail] = useState(null);
  const [submitHover, setSubmitHover] = useState(false);
  const [messageAnimationDelay, setMessageAnimationDelay] = useState(0);
  const [catInAir, setCatInAir] = useState(false);

  const [failedMessage, setFailedMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const [emailTooltip, setEmailTooltip] = useState(false);
  const [messageTooltip, setMessageTooltip] = useState(false);

  const [messageSending, setMessageSending] = useState(false);
  const [planeAnimation, setPlaneAnimation] = useState(null);
  const [lastMessage, setLastMessage] = useState({});

  useEffect(() => {
    setMessage(null);
    setMessageSending(false);
    setPlaneAnimation(null);
  }, [formState]);

  useEffect(() => {
    if (!bottomOfContact) return;
    setTimeout(() => {
      setCatInAir(true);
      setTimeout(() => setCatInAir(false), 300);
    }, 500);
  }, [bottomOfContact]);

  useEffect(() => {
    if (!message || !messageSending) return;
    setPlaneAnimation(true);
    setTimeout(() => {
      setMessageSending(false);
      setPlaneAnimation(null);
    }, 1000);
  }, [message]);

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const changeHandler = e => {
    setFailedMessage(null);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (lastMessage === formState) return;
    if (invalidEmail === false) setMessageSending(true);

    try {
      if (invalidEmail)
        throw {
          status: 406,
          message: `Invalid email input`,
        };
      await fetch(`/api/mail`, {
        method: "POST",
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(res => {
        if (!res.ok) {
          throw {
            status: res.status,
            message: res.statusText,
          };
        }

        setMessage(`Message sent successfully`);
        setLastMessage(formState);
        setFailedMessage(false);

        return res.json();
      });
    } catch (err) {
      setFailedMessage(true);
      console.table(err);
      setMessage(err);
    }
  };

  return (
    <section
      className={`wrapper-container duration-500 ${
        isInView ? "opacity-100 blur-0" : "opacity-50 blur-sm"
      }`}
    >
      <div className="flex flex-col justify-center items-center wrapper contact">
        <Topic topic="Let's talk!" />

        <div className={`flex relative items-center mb-3 w-full duration-300`}>
          <div
            className={`duration-300 absolute ${
              formState.nameFocused || formState.name
                ? "text-sm text-dark-secondary translate-y-[-1.25rem]"
                : "text-primary py-1.5 text-xl"
            } `}
          >
            Name
          </div>
          <input
            type="text"
            name="name"
            className="input"
            onChange={changeHandler}
            onFocus={() => setFormState({ ...formState, nameFocused: true })}
            onBlur={() => setFormState({ ...formState, nameFocused: false })}
          />
          <AnimatePresence>
            {formState.nameFocused && (
              <motion.div
                initial={{ width: `0%` }}
                animate={{ width: `100%` }}
                exit={{ width: `0%`, transition: { duration: 0.2 } }}
                transition={{ duration: 0.2 }}
                className="w-full h-0.5 bg-secondary absolute bottom-0 z-[1]"
              />
            )}
          </AnimatePresence>
        </div>

        <div
          ref={ref}
          className={`flex relative items-center mb-3 w-full duration-300`}
        >
          <div
            className={`duration-300 absolute ${
              formState.emailFocused || formState.email
                ? `text-sm  translate-y-[-1.25rem] ${
                    invalidEmail === true && formState.email
                      ? "text-secondary"
                      : `text-dark-secondary`
                  }`
                : "text-primary py-1.5 text-xl"
            } `}
          >
            Email
          </div>
          <AnimatePresence>
            {((invalidEmail === true && formState.email) ||
              (failedMessage && !formState.email)) && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.4 }}
                onMouseDown={() => {
                  if (setEmailTooltip(true)) return;

                  setEmailTooltip(true);
                  setTimeout(() => setEmailTooltip(false), 2000);
                }}
                onMouseEnter={() => setEmailTooltip(true)}
                onMouseLeave={() => setEmailTooltip(false)}
                className="cursor-help absolute right-1.5 text-[1.75rem] text-secondary z-[1]"
              >
                <BiErrorAlt />
                <AnimatePresence>
                  {emailTooltip && (
                    <motion.div
                      initial={{
                        left:
                          formState.email && formState.email.length
                            ? `-4.5rem`
                            : `-3rem`,
                        top: `0.5rem`,
                        scale: 0,
                        opacity: 0,
                      }}
                      animate={{
                        left:
                          formState.email && formState.email.length
                            ? `-8.5rem`
                            : `-6.25rem`,
                        top: `2.05rem`,
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{
                        left:
                          formState.email && formState.email.length
                            ? `-4.5rem`
                            : `-3rem`,
                        top: `0.5rem`,
                        scale: 0,
                        opacity: 0,
                        transition: {
                          duration: 2,
                          type: "spring",
                          bounce: 0.25,
                        },
                      }}
                      transition={{
                        duration: 2.5,
                        type: "spring",
                        bounce: 0.25,
                      }}
                      className="flex absolute justify-center px-2 py-1 w-max text-base text-gray-300 rounded-md bg-dark-mixed"
                    >
                      {formState.email && formState.email.length > 0
                        ? `Invalid Email Address`
                        : `Email is required`}
                      <span className="absolute z-[-1] right-[1rem] top-[-0.3rem] w-3 h-3 bg-dark-mixed rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
          <input
            type="email"
            name="email"
            className={`duration-1000 input`}
            value={formState.email}
            onChange={changeHandler}
            onFocus={() => {
              setFormState({ ...formState, emailFocused: true });
              setInvalidEmail(false);
            }}
            onBlur={() => {
              const email = validateEmail(formState.email);
              setInvalidEmail(false);
              email
                ? setFormState({ ...formState, email: email[0] })
                : setInvalidEmail(true);

              setFormState({ ...formState, emailFocused: false });
            }}
          />
          <AnimatePresence>
            {formState.emailFocused && (
              <motion.div
                initial={{ width: `0%` }}
                animate={{ width: `100%` }}
                exit={{ width: `0%`, transition: { duration: 0.2 } }}
                transition={{ duration: 0.2 }}
                className="w-full h-0.5 bg-secondary absolute bottom-0 z-[1]"
              />
            )}
          </AnimatePresence>
        </div>

        <div
          className={`flex relative items-center mt-2 mb-3 w-full duration-300`}
        >
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1, y: -20, x: -1 }}
            transition={{ duration: 0.2 }}
            className={`px-2 duration-300 absolute top-[0.5rem] bg-dark-primary flex z-[1] mx-3 ${
              formState.messageFocused || formState.message
                ? "text-dark-secondary text-sm "
                : `text-primary text-base mx-5`
            } ${
              failedMessage && !formState.message
                ? "duration-500 pr-[2.1rem]"
                : null
            } `}
            onMouseEnter={() => dispatch(changeCursor("input"))}
            onMouseLeave={() => dispatch(changeCursor("default"))}
          >
            Your Message
            <AnimatePresence>
              {failedMessage && !formState.message && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, x: 35 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    x: 35,
                    transition: { duration: 0.3 },
                  }}
                  transition={{ duration: 0.4 }}
                  onMouseDown={() => {
                    if (setMessageTooltip(true)) return;

                    setMessageTooltip(true);
                    setTimeout(() => setMessageTooltip(false), 2000);
                  }}
                  onMouseEnter={() => setMessageTooltip(true)}
                  onMouseLeave={() => setMessageTooltip(false)}
                  className="cursor-help absolute right-1.5 inline-flex text-[1.5rem] text-secondary z-0"
                >
                  <BiErrorAlt />
                  <AnimatePresence>
                    {messageTooltip && (
                      <motion.div
                        initial={{ top: `0.3rem`, scale: 0, opacity: 0 }}
                        animate={{ top: `2rem`, scale: 1, opacity: 1 }}
                        exit={{
                          top: `0.3rem`,
                          scale: 0,
                          opacity: 0,
                          transition: {
                            duration: 2,
                            type: "spring",
                            bounce: 0.25,
                          },
                        }}
                        transition={{
                          duration: 2,
                          type: "spring",
                          bounce: 0.25,
                        }}
                        className="absolute rounded-md left-[-4.25rem] px-2 py-1 w-max text-base text-gray-300 bg-dark-mixed flex justify-center"
                      >
                        Message is required
                        <span className="absolute z-[-1] top-[-0.3rem] w-3 h-3 bg-dark-mixed rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <textarea
            type="text"
            name="message"
            className={`px-3 input textarea`}
            onChange={changeHandler}
            onFocus={() => {
              setFormState({ ...formState, messageFocused: true });
              setMessageAnimationDelay(1);
              setTimeout(() => setMessageAnimationDelay(2), 200);
            }}
            onBlur={() => {
              setFormState({ ...formState, messageFocused: false });
              setMessageAnimationDelay(1);
              setTimeout(() => setMessageAnimationDelay(0), 200);
            }}
          />
          <AnimatePresence>
            {messageAnimationDelay > 0 && (
              <>
                <motion.div
                  initial={{ width: `0%` }}
                  animate={{ width: `100%` }}
                  exit={{ width: `0%`, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-0.5 bg-secondary absolute top-0 z-[0]"
                />
                <motion.div
                  initial={{ height: `0%` }}
                  animate={{ height: `100%` }}
                  exit={{ height: `0%`, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.2 }}
                  className="h-full w-0.5 bg-secondary absolute left-0 top-0 z-[0]"
                />
                <AnimatePresence>
                  {messageAnimationDelay > 1 && (
                    <>
                      <motion.div
                        initial={{ width: `0%` }}
                        animate={{ width: `100%` }}
                        exit={{ width: `0%`, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-0.5 bg-secondary absolute bottom-0 z-[0]"
                      />
                      <motion.div
                        initial={{ height: `0%` }}
                        animate={{ height: `100%` }}
                        exit={{ height: `0%`, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.2 }}
                        className="h-full w-0.5 bg-secondary absolute right-0 top-0 z-[0]"
                      />
                    </>
                  )}
                </AnimatePresence>
              </>
            )}
          </AnimatePresence>
        </div>
        <div
          onMouseDown={() => {
            setSubmitHover(true);
            setTimeout(() => setSubmitHover(false), 650);
          }}
          onMouseEnter={() => setSubmitHover(true)}
          onMouseLeave={() => setSubmitHover(false)}
          onClick={handleSubmit}
          className="flex relative justify-center items-center mt-4 cursor-pointer"
        >
          <AnimatePresence>
            {messageSending === true && (
              <motion.span
                className={`absolute z-[1] text-[2rem] text-primary duration-500   ${
                  planeAnimation ? "animation-fly" : "animation-shake"
                }`}
              >
                <IoPaperPlane />
              </motion.span>
            )}
          </AnimatePresence>
          <motion.div
            className={`duration-[700ms] text-primary font-semibold px-4 py-[0.4rem] relative flex items-center overflow-hidden z-0 cursor-pointer text-xl ${
              messageSending === true && `text-transparent`
            }`}
          >
            Submit
            <motion.div
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className=" w-full h-full absolute -z-[1] "
            >
              <motion.span
                initial={{ scale: 1, x: 0 }}
                animate={
                  submitHover || messageSending
                    ? { scale: 3, rotate: 50 }
                    : { scale: 1, x: -72.5, rotate: 50 } //x -65
                }
                transition={{
                  duration: 0.5,
                }}
                className="-z-[1] absolute w-full h-full bg-secondary"
              />
              <motion.span
                initial={{ scale: 1, x: 250 }}
                animate={
                  submitHover || messageSending
                    ? { scale: 3, x: 0, rotate: 50 }
                    : { scale: 1, x: 42.5, rotate: 50 } //x 35
                }
                transition={{
                  duration: 0.5,
                }}
                className="-z-[1] absolute w-full h-full bg-secondary"
              />
            </motion.div>
          </motion.div>
        </div>
        <div className=" relative flex items-center flex-col w-full pt-[12.5rem] pb-[1.25rem] text-primary">
          <AnimatePresence>
            {failedMessage === false && (
              <motion.div
                initial={{
                  opacity: 0,
                  top: -10,
                  scale: 0.45,
                }}
                animate={{ opacity: 1, top: 20, scale: 1 }}
                exit={{
                  opacity: 0,
                  top: -10,
                  scale: 0.45,
                  transition: { duration: 0.25 },
                }}
                transition={{ duration: 0.5 }}
                className="absolute text-lg text-gray-300"
              >
                Message sent{" "}
                <span className="highlight-topic">
                  <Highlight
                    duration={0.4}
                    text="successfully"
                    small={true}
                    inLine={true}
                  />
                </span>{" "}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {message?.status >= 500 && (
              <motion.div
                initial={{
                  opacity: 0,
                  top: -10,
                  scale: 0.45,
                }}
                animate={{ opacity: 1, top: 20, scale: 1 }}
                exit={{
                  opacity: 0,
                  top: -10,
                  scale: 0.45,
                  transition: { duration: 0.25 },
                }}
                transition={{ duration: 0.5 }}
                className="absolute text-lg text-center text-gray-300"
              >
                Service is currently unavailable.
                <br />
                Please contact me at{" "}
                <Link href="mailto:esebua154@gmail.com" subject="Portfolio">
                  <span className="highlight-topic">
                    <Highlight
                      duration={0.4}
                      text="email"
                      small={true}
                      inLine={true}
                    />
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {bottomOfContact && (
              <motion.div
                initial={{ y: 55 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute bottom-0"
              >
                <span
                  className={`absolute bottom-[4.75rem] translate-x-[-50%] duration-300 hover:text-secondary cursor-pointer text-3xl flex justify-center ${
                    catInAir ? `translate-y-[-25%]` : `translate-y-[0%]`
                  }`}
                >
                  <Link
                    href={`https://github.com/freakGE`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FiGithub />
                  </Link>
                  <span className="ml-[0.08rem] w-[0.65rem] h-full absolute bottom-0  border-b-2 border-current rounded-sm z-[-1]" />
                </span>
                <span className="absolute bottom-0 h-[4.75rem] translate-x-[-50%] w-[1.5rem] bg-dark-secondary pipe-shadow"></span>
                <span className="absolute bottom-[4.75rem] translate-x-[-50%] w-[2rem] h-0.5 bg-dark-secondary"></span>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className="bg-dark-primary py-1.5 z-[0] relative flex items-center justify-center"
            ref={bottomRef}
          >
            <span
              className="duration-500 text-primary hover:text-secondary"
              onMouseEnter={() => dispatch(changeCursor("input"))}
              onMouseLeave={() => dispatch(changeCursor("default"))}
            >
              <Link href="mailto:esebua154@gmail.com">esebua154@gmail.com</Link>
            </span>
            <span className="absolute top-0 w-[1.6rem] h-0.5 bg-dark-secondary"></span>
            <span className="absolute bottom-0 w-[1.6rem] h-0.5 bg-dark-secondary"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
