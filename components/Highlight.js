import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Highlight = props => {
  const [fullHeight, setFullHeight] = useState(false);

  if (!props.text) return;

  const text = props.hide ? [props.text] : props.text.split(" ");

  return text.map((word, i) => {
    return (
      <div key={i}>
        <AnimatePresence>
          <motion.div
            className={`${(props.title || props.navbar) && "text-white"} ${
              word !== text[0] && props.title === undefined
                ? "xl:ml-0 ml-6"
                : null
            } ${
              !props.navbar && props.title === undefined ? "lg:w-56" : null
            } relative ${
              props.title === undefined ? "mr-3" : null
            } duration-150 z-0  flex justify-center items-center
            ${props.small !== undefined ? "max-w-max" : null}
            ${props.inLine === true ? "mr-0" : ""}
            `}
            onMouseEnter={() => setFullHeight(word)}
            onMouseLeave={() => setFullHeight(null)}
            onMouseDown={() => {
              setFullHeight(word);
              setTimeout(() => setFullHeight(null), 300);
            }}
          >
            {word}
            <motion.span
              initial={props.small ? { scale: 0 } : { x: 400, opacity: 0 }}
              animate={props.small ? { scale: 1 } : { x: 0, opacity: 1 }}
              exit={props.small ? { scale: 0 } : { x: -250, opacity: 0 }}
              transition={{ duration: props.duration ? props.duration : 0.75 }}
              className={`${
                props.small !== undefined
                  ? `left-1 h-[5%] bottom-0.5 ${
                      fullHeight === word ? "w-[25%]" : "w-full"
                    }`
                  : fullHeight === word
                  ? `scale-x-110 w-full ${
                      props.navbar !== undefined
                        ? "h-3/5"
                        : "h-3/4 xl:h-full lg:h-3/4"
                    }`
                  : "h-2/5 w-11/12"
              } ${
                fullHeight === word && word === text[0] && text.length > 1
                  ? "rounded-l-xl"
                  : null
              } ${
                fullHeight === word &&
                word === text[text.length - 1] &&
                text.length > 1
                  ? "rounded-r-xl ml-1"
                  : null
              } 
              ${
                props.small !== undefined
                  ? `duration-200 left-1 h-[5%] bottom-0.5 ${
                      fullHeight === word ? "w-[25%]" : "w-11/12"
                    }`
                  : null
              }
              absolute -z-[1] bottom-0 bg-secondary duration-200`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  });
};

export default Highlight;
