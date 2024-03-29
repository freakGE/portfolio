import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const Logo = props => {
  const [fill, setFill] = useState(false);
  const fontSize = Math.round(props.size);

  const [translateValue, setTranslateValue] = useState(20);
  const [textIsVisible, setTextIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setTextIsVisible(true), 900);
  }, []);

  return (
    <AnimatePresence>
      {props.isVisible && (
        <motion.div
          onMouseEnter={() => setFill(true)}
          onMouseDown={() => {
            setFill(true);
            setTimeout(() => {
              setFill(false);
            }, 500);
          }}
          onMouseLeave={() => setFill(false)}
          className={`${
            fontSize ? `text-${fontSize}xl` : "text-6xl"
          }  duration-200 m-0 p-0  text-secondary relative w-max flex justify-center items-center`}
        >
          <motion.div className="text-secondary w-[3rem] h-full relative flex justify-center items-center">
            <span className="w-full h-full">
              <svg
                id="svgHexagon"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className={`rotate-[210deg] overflow-visible duration-500 ${
                  fill ? "fill-secondary" : "fill-transparent"
                }`}
              >
                <polygon
                  // id="hexagon-navbar"
                  stroke="currentColor"
                  strokeWidth="12.5"
                  points="148,183.138438763306 52,183.138438763306 4,100 52,16.8615612366939 148,16.8615612366939 196,100"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <AnimatePresence>
              {textIsVisible && (
                <motion.div className="flex absolute justify-center items-center w-full h-full text-white">
                  {/* top */}
                  <motion.span
                    className="absolute w-4/12"
                    initial={{
                      opacity: 0,
                      translateX: -translateValue,
                      translateY: -translateValue,
                    }}
                    animate={{
                      opacity: 1,
                      translateX: 0,
                      translateY: 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      viewBox="0 0 141 194"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="translate(0,0)"
                    >
                      <path
                        id="logoText"
                        style={{
                          clipPath: `polygon(0 0, 100% 0%, 100% 30%, 0 75%)`,
                        }}
                        d="M8.64 164.448V148.064H27.84V158.048L40.128 170.592H101.568L114.368 157.536V117.344L101.568 104.8H32.704L9.152 81.248V32.352L32.704 8.79999H107.968L131.52 32.352V48.992H112.576V38.752L99.776 26.208H41.152L28.352 38.752V74.848L41.152 87.392H110.016L133.568 110.944V163.936L109.504 188H32.192L8.64 164.448Z"
                        fill="currentColor"
                      />
                    </svg>
                  </motion.span>
                  {/* bottom */}
                  <motion.span
                    className="absolute w-4/12"
                    initial={{
                      opacity: 0,
                      translateX: translateValue,
                      translateY: translateValue,
                    }}
                    animate={{
                      opacity: 1,
                      translateX: 0,
                      translateY: 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      viewBox="0 0 141 194"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="translate(0,0)"
                    >
                      <path
                        id="logoText"
                        style={{
                          clipPath: `polygon(0 80%, 100% 20%, 100% 100%, 0 100%)`,
                        }}
                        d="M8.64 164.448V148.064H27.84V158.048L40.128 170.592H101.568L114.368 157.536V117.344L101.568 104.8H32.704L9.152 81.248V32.352L32.704 8.79999H107.968L131.52 32.352V48.992H112.576V38.752L99.776 26.208H41.152L28.352 38.752V74.848L41.152 87.392H110.016L133.568 110.944V163.936L109.504 188H32.192L8.64 164.448Z"
                        fill="currentColor"
                      />
                    </svg>
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Logo;
