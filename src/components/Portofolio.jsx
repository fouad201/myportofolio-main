import { useState } from "react";
import { portfolioData } from "../data/portofolioData.jsx";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section
      id="portofolio"
      className="min-h-screen pb-20 bg-app pt-20"
      data-aos-duration="1000"
      data-aos="fade-down"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Subtitle */}
        <div
          className="text-center mb-12 text-[var(--text)]"
          data-aos-delay="600"
          data-aos="fade-down"
        >
          <h2 className="text-5xl font-bold mb-2 gradient-text">
            {portfolioData.sectionTitle.title}
          </h2>
          <p className="text-lg text-muted">
            {portfolioData.sectionTitle.subtitle}
          </p>
        </div>

        {/* Tabs Menu */}
        <div
          className="flex justify-center mb-8 gap-4 flex-wrap"
          data-aos-delay="600"
          data-aos="fade-down"
        >
          {[
            { value: "projects", label: "Projects", icon: "bx bx-briefcase" },
            { value: "tech", label: "Tech Stack", icon: "bx bx-code-alt" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
                activeTab === tab.value
                  ? "btn-gradient text-white"
                  : "bg-[var(--surface)] text-[var(--text)] border border-soft hover:bg-white/5"
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tabs Content */}
        <div>
          {/* Projects Tab */}
          {activeTab === "projects" && (
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {portfolioData.tabs.projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 5,
                    rotateX: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-[var(--surface)] border border-soft rounded-lg p-6 shadow-lg"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted mb-2">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-[var(--text)] mb-4">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/10 text-xs rounded-full text-[var(--text)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Tippy content="View Demo" placement="top">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center w-full items-center gap-2 px-4 py-2 btn-gradient rounded-lg font-medium transition-all hover:-translate-y-1"
                    >
                      <span className="flex items-center gap-1">
                        <span>Demo</span>
                        <i className="bx bx-link-external"></i>
                      </span>
                    </a>
                  </Tippy>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Certificates Tab removed by request */}

          {/* Tech Stack Tab */}
          {activeTab === "tech" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {portfolioData.tabs.techStacks.map((tech) => (
                <motion.div
                  key={tech.id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.4 }
                  }}
                  className="bg-[var(--surface)] border border-soft rounded-lg p-6 shadow-lg flex flex-col items-center justify-center gap-4"
                >
                  <i
                    className={`${tech.icon}  text-6xl`}
                    style={{ color: tech.color }}
                  ></i>
                  <span className="text-lg font-medium text-[var(--text)]">
                    {tech.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
