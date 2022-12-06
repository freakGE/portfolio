import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const NotFound = () => {
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section className="flex overflow-hidden flex-col justify-center items-center w-screen h-screen bg-dark-primary text-primary">
      <div className="w-[25rem] flex justify-center items-center flex-col gap-y-2">
        <motion.div className="flex relative justify-center text-9xl duration-500  h-[8rem] w-full">
          <motion.span
            initial={{ x: -42.5 }}
            animate={{ x: -77.5 }}
            transition={{
              delay: 2.5,
              duration: 2,
              type: "spring",
              bounce: 0.25,
            }}
            className="absolute"
          >
            4
          </motion.span>
          <motion.span
            initial={{ lineHeight: "1rem" }}
            animate={{ lineHeight: "8rem" }}
            transition={{
              delay: 1.5,
              duration: 2,
              type: "spring",
              bounce: 0.5,
            }}
            className="absolute"
          >
            0
          </motion.span>
          <motion.span
            initial={{ x: 42.5, rotateY: 180 }}
            animate={{ x: 75, rotateY: 0 }}
            transition={{
              delay: 2.5,
              duration: 2,
              type: "spring",
              bounce: 0.25,
            }}
            className="absolute"
          >
            4
          </motion.span>
        </motion.div>
        <div className="flex relative justify-center items-center text-3xl extra-small:text-4xl md:text-5xl">
          <span className="z-[1] bg-dark-primary px-3">Page Not Found</span>
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: `125%` }}
            transition={{ duration: 2, type: "spring", bounce: 0.25 }}
            className="z-[0] absolute h-1 bg-dark-mixed"
          ></motion.span>
        </div>

        <Link href="/">
          <motion.div
            onMouseDown={() => {
              setBtnHover(true);
              setTimeout(() => setBtnHover(false), 650);
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            className="mt-4 duration-[700ms] text-primary font-semibold px-4 py-[0.4rem] relative flex items-center overflow-hidden z-0 cursor-pointer text-2xl"
          >
            HOME
            <motion.div
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className=" w-full h-full absolute -z-[1] "
            >
              <motion.span
                initial={{ scale: 1, x: 0 }}
                animate={
                  btnHover
                    ? { scale: 3, rotate: 50 }
                    : { scale: 1, x: -77.5, rotate: 50 } //x -72.5
                }
                transition={{
                  duration: 0.5,
                }}
                className="-z-[1] absolute w-full h-full bg-secondary"
              />
              <motion.span
                initial={{ scale: 1, x: 250 }}
                animate={
                  btnHover
                    ? { scale: 3, x: 0, rotate: 50 }
                    : { scale: 1, x: 46, rotate: 50 } //x 42.5
                }
                transition={{
                  duration: 0.5,
                }}
                className="-z-[1] absolute w-full h-full bg-secondary"
              />
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
