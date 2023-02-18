import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import PreLoad from "../components/PreLoad";
import Home from "../components/Home";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
const Navbar = dynamic(() => import("../components/Navbar"));
const ArrowUp = dynamic(() => import("../components/ArrowUp"));

import { scrollToSection } from "../slices/routerSlice";
import { openHamburger } from "../slices/hamburgerSlice";

import { useRouter } from "next/router";
import Cursor from "../components/Cursor";

export default function Main() {
  const { asPath } = useRouter();
  const dispatch = useDispatch();

  const choosenSection = useSelector(state => state.section.choosenSection);
  const hamburgerIsOpen = useSelector(state => state.hamburger.hamburgerIsOpen);

  const [isPreLoading, setIsPreLoading] = useState(true);
  const [preloadIsVisible, setPreloadIsVisible] = useState(true);
  const [preLoadTimer, setPreLoadTimer] = useState(1500); //2500

  useEffect(() => {
    setTimeout(() => setPreloadIsVisible(false), preLoadTimer);
    setTimeout(() => setIsPreLoading(false), preLoadTimer + 800);
    setTimeout(() => {
      asPath.includes("#") && dispatch(scrollToSection(asPath.slice(2)));
    }, preLoadTimer + 1000);
  }, []);

  useEffect(() => {
    if (choosenSection === "") return;

    let scrollIntoSection;
    if (choosenSection === "about") scrollIntoSection = 622;
    if (choosenSection === "projects") scrollIntoSection = 1550;
    if (choosenSection === "contact") scrollIntoSection = 5000;

    if (hamburgerIsOpen) {
      dispatch(openHamburger(false));

      setTimeout(() => {
        window.scroll({
          top: scrollIntoSection,
          left: 0,
          behavior: "smooth",
        });
      }, 1250); //750
      dispatch(scrollToSection(""));
      return;
    }

    setTimeout(() => {
      window.scroll({
        top: scrollIntoSection,
        left: 0,
        behavior: "smooth",
      });
    }, 250);

    dispatch(scrollToSection(""));
  }, [choosenSection]);

  return (
    <>
      <Head>
        <title>Saba Esebua</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* Description */}
        <meta name="author" content="Saba Esebua" />
        <meta
          name="description"
          content="Front-End Developer Portfolio Website."
        />
        <meta
          name="keywords"
          content="saba, esebua, saba esebua, portfolio, front-end developer"
        />
        {/* Open Graph data */}
        <meta property="og:title" content="Saba Esebua" />
        <meta
          property="og:description"
          content="Front-End Developer Portfolio Website."
        />
        <meta
          property="og:image"
          content="https://portfolio-freakge.vercel.app/thumbnail-portfolio.png"
        />
      </Head>
      {isPreLoading ? (
        <PreLoad isVisible={preloadIsVisible} />
      ) : (
        <div className={`${hamburgerIsOpen ? "h-screen overflow-clip" : null}`}>
          <Cursor />
          <Navbar />

          <Home />

          {!hamburgerIsOpen ? (
            <>
              <About />
              <Projects />
              <Contact />
            </>
          ) : null}

          <ArrowUp />
        </div>
      )}
    </>
  );
}
