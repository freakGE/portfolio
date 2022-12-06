import { useState, useEffect } from "react";

function getWindowDimensions() {
  const width = typeof window !== "undefined" && window.innerWidth;
  const height = typeof window !== "undefined" && window.innerHeight;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    typeof window !== "undefined" &&
      window.addEventListener("resize", handleResize);
    return () =>
      typeof window !== "undefined" &&
      window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
