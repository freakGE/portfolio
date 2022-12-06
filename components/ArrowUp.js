import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ArrowUp = () => {
  const hamburgerIsOpen = useSelector(state => state.hamburger.hamburgerIsOpen);
  const [currentScroll, setCurrentScroll] = useState(0);

  const [arrow, setArrow] = useState(false);
  let openArrowDuration = 1000; //1500
  let durationTime = 0.2; //0.25

  useEffect(() => {
    setTimeout(() => {
      setArrow(true);
    }, openArrowDuration);
  }, []);

  useEffect(() => {
    if (!hamburgerIsOpen && currentScroll <= 250) setArrow(false);

    if (!hamburgerIsOpen && currentScroll >= 250)
      setTimeout(() => {
        setArrow(true);
      }, openArrowDuration);

    const handleScroll = () => setCurrentScroll(scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentScroll]);

  return (
    <>
      <AnimatePresence>
        {!hamburgerIsOpen && currentScroll >= 250 && (
          <motion.div
            onClick={() => {
              window.scroll({ top: 0, left: 0, behavior: "smooth" });
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: 100,
              opacity: 0,
              transition: { duration: 1, delay: durationTime },
            }}
            transition={{
              duration: 1.2,
              type: "spring",
              bounce: 0.4,
            }}
            className={`flex fixed bottom-4 justify-center items-center w-12 h-12 rounded-full cursor-pointer select-none arrowUp z-[50] bg-secondary`}
          >
            <motion.div
              className={`flex relative justify-center items-center w-10 h-8`}
            >
              <motion.div className="line-y bg-primary" />
              {arrow && (
                <>
                  <motion.div
                    className="line-y-sm bg-primary"
                    initial={{ rotate: 0, marginRight: 0 }}
                    animate={{ rotate: 45, marginRight: "0.875rem" }}
                    exit={{
                      rotate: 0,
                      marginRight: 0,
                      transition: { duration: durationTime },
                    }}
                    transition={{ duration: durationTime }}
                  />
                  <motion.div
                    className="line-y-sm bg-primary"
                    initial={{ rotate: 0, marginLeft: 0 }}
                    animate={{ rotate: -45, marginLeft: "0.875rem" }}
                    exit={{
                      rotate: 0,
                      marginLeft: 0,
                      transition: { duration: durationTime },
                    }}
                    transition={{ duration: durationTime }}
                  />
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArrowUp;
