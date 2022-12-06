/* eslint-disable react/no-unescaped-entities */
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Highlight from "./Highlight";
import Topic from "./Topic";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [mySkillsArray, setMySkillsArray] = useState([]);

  const mySkills = [
    "JavaScript (ES6+)",
    "HTML",
    "CSS/SCSS",
    "Tailwind CSS",
    "React",
    "Redux (Toolkit)",
    "Node.js",
  ];
  useEffect(() => setMySkillsArray(mySkills), []);

  const sortSkills = Array.isArray(mySkillsArray)
    ? mySkillsArray.sort((a, b) => (a.length < b.length ? 1 : 0))
    : mySkills.sort((a, b) => (a.length < b.length ? 1 : 0));

  return (
    <section
      className={`wrapper-container about duration-500 ${
        isInView
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-50 blur-sm translate-y-5"
      }`}
    >
      <div className={`wrapper topic`}>
        <Topic topic="About Me" />

        <div className="text-lg text-gray-300">
          My name is Saba Esebua, and I'm a{" "}
          <span className="highlight-topic">
            <Highlight duration={0.4} text="React" small={true} inLine={true} />
          </span>{" "}
          developer with a year and a half of experience. My goals for now are
          to maximize skills in{" "}
          <span className="highlight-topic" ref={ref}>
            <Highlight
              duration={0.4}
              text="Front-End"
              small={true}
              inLine={true}
            />
          </span>{" "}
          development and, in the meantime, get a solid understanding of{" "}
          <span className="highlight-topic">
            <Highlight
              duration={0.4}
              text="Back-End"
              small={true}
              dot={true}
              inLine={true}
            />
          </span>
          <span className="dot">.</span>
        </div>

        <div className="flex flex-col mt-4 text-lg text-gray-300">
          <p>Here are a few technologies I’ve been working with recently:</p>
          <div className="flex justify-center sm:justify-start sm:ml-4">
            <ul className="grid grid-cols-2 gap-x-7 w-max extra-small:gap-x-10">
              {sortSkills.map((skill, i) => {
                let text = skill;
                let bracket, wordOne, wordTwo;
                if (skill.includes("(")) {
                  [text, bracket] = skill.split(" ");
                }

                if (text.includes("/")) {
                  [wordOne, wordTwo] = text.split("/");
                }

                return (
                  <li key={i} className="list-[square] text-secondary">
                    <div className="inline-flex items-center font-medium text-gray-300">
                      {wordOne ? (
                        <span className="flex items-center">
                          {wordOne}
                          <span className="px-0.5 text-2xl text-dark-secondary">
                            /
                          </span>
                          {wordTwo}
                        </span>
                      ) : (
                        text
                      )}{" "}
                      {bracket ? (
                        <span className="ml-1 text-base text-dark-secondary">
                          {bracket}
                        </span>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
