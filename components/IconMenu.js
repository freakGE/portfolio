import { motion } from "framer-motion";

const IconMenu = props => {
  let array = Array(3).fill(0);

  return (
    <div
      className={`flex flex-col justify-between w-full h-full cursor-pointer duration-300 border-secondary border-x-[0.325rem] ${
        props.hover ? `rotate-90 border-secondary` : `border-transparent`
      }`}
    >
      {array.map((line, i) => {
        i++;
        return (
          <motion.div
            key={i}
            className={`duration-300 ${
              props.size ? props.size : "h-1"
            } bg-secondary`}
            initial={{ x: 5000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              y: -500,
              transition: { duration: props.scrollUp ? 0.5 : 2 },
            }}
            transition={{ duration: props.scrollUp ? i * 0.5 : i }}
          ></motion.div>
        );
      })}
    </div>
  );
};

export default IconMenu;
