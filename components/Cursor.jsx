import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cursor = () => {
  const variant = useSelector(state => state.cursor.cursorVariant);
  const [cursorVisibility, setCursorVisibility] = useState("hidden");

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const transparentVariants = ["default", "navbar", "highlight", "input"];

  const [cursorSize, setCursorSize] = useState(40);

  const variants = {
    default: {
      zIndex: 0,
      height: `${cursorSize}px`,
      width: `${cursorSize}px`,
      x: mousePosition.x - cursorSize / 2,
      y: mousePosition.y - cursorSize / 2,
    },
    input: {
      zIndex: 51,
      height: `${cursorSize}px`,
      width: `${cursorSize}px`,
      x: mousePosition.x - cursorSize / 2,
      y: mousePosition.y - cursorSize / 2,
    },
    text: {
      zIndex: 51,
      backgroundColor: "#EDEDED",
      height: `${cursorSize}px`,
      width: `${cursorSize}px`,
      x: mousePosition.x - cursorSize / 2,
      y: mousePosition.y - cursorSize / 2,
    },
    navbar: {
      height: `${cursorSize * 1.25}px`,
      width: `${cursorSize * 1.25}px`,
      x: mousePosition.x - (cursorSize * 1.25) / 2,
      y: mousePosition.y - (cursorSize * 1.25) / 2,
    },
    header: {
      zIndex: 51,
      backgroundColor: "#EDEDED",
      height: `${cursorSize * 2}px`,
      width: `${cursorSize * 2}px`,
      x: mousePosition.x - (cursorSize * 2) / 2,
      y: mousePosition.y - (cursorSize * 2) / 2,
    },
    highlight: {
      height: `${cursorSize * 1.25}px`,
      width: `${cursorSize * 1.25}px`,
      x: mousePosition.x - (cursorSize * 1.25) / 2,
      y: mousePosition.y - (cursorSize * 1.25) / 2,
    },
    image: {
      zIndex: 51,
      backgroundColor: "#EDEDED",
      height: `${cursorSize * 4}px`,
      width: `${cursorSize * 4}px`,
      x: mousePosition.x - (cursorSize * 4) / 2,
      y: mousePosition.y - (cursorSize * 4) / 2,
    },
  };

  useEffect(() => {
    const handleMouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      setTimeout(() => setCursorVisibility("visible"), 250);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <motion.span
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 8 / 2,
          y: mousePosition.y - 8 / 2,
        }}
        style={{
          visibility: cursorVisibility,
          opacity: transparentVariants.includes(variant) ? 100 : 0,
        }}
      />
      <motion.span
        className="cursor-circle"
        variants={variants}
        animate={variant}
        transition={{
          type: "spring",
        }}
        style={{
          visibility: cursorVisibility,
          borderWidth: transparentVariants.includes(variant) ? 1 : 0,
        }}
      />
    </>
  );
};

export default Cursor;
