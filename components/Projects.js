import Project from "./Project";
import Topic from "./Topic";

const Projects = () => {
  return (
    <section className="wrapper-container min-h-[20rem]">
      <div className="wrapper topic projects-container">
        <Topic topic="Some Things I've Built" />
        <div className="flex flex-col gap-y-36 mt-7 sm:gap-y-8 lg:gap-y-16">
          <Project
            toRight={true}
            name="Michelangelo Exhibition"
            image={`thumbnail-michelangelo.png`}
            imageAlt={"Michelangelo exhibition thumbnail"}
            description=" The idea was to create a website dedicated to the Michelangelo exhibition. The project includes his biography and art collection."
            usedSkills={[
              "Next.js",
              "TypeScript",
              "TailwindCSS",
              "Framer-Motion",
              "Redux (toolkit)",
            ]}
            code="https://github.com/freakGE/michelangelo-exibition"
            demo="https://michelangelo-exibition.vercel.app/"
          />
          <Project
            toRight={false}
            name="BookWorm"
            image={`thumbnail-bookworm.png`}
            imageAlt={"bookWorm thumbnail"}
            description="A web app where users can sort books by categories, search by author or title, read details, add them to favorites, etc."
            usedSkills={[
              "React.js",
              "Framer-Motion",
              "Styled-Components",
              "Redux (toolkit)",
            ]}
            code="https://github.com/freakGE/bookworm"
            demo="https://superb-genie-9f4542.netlify.app/"
          />
          <Project
            toRight={true}
            name="CLI Launcher"
            image={`thumbnail-dayz-cli-launcher.png`}
            imageAlt={"DayZ CLI launcher thumbnail"}
            description="This is a CLI-Launcher for DayZ Standalone on Linux when running the game via Proton."
            usedSkills={["Node.js", "API", "CLI", "shell (JS)"]}
            code="https://github.com/freakGE/dayz-linux-cli-launcher"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
