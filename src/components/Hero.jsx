import { useState, useEffect } from "react";
import homeData from "../data/homeData.jsx";
import Tippy from "@tippyjs/react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Home = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const titles = homeData.typingTexts;
    const currentTitle = titles[currentIndex];

    const typeSpeed = isDeleting ? 100 : 150;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentTitle.length) {
          setCurrentText(currentTitle.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen bg-app pt-20 overflow-hidden"
      data-aos-duration="1000"
      data-aos="fade-down"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)] py-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)]"
                data-aos-dely="600"
                data-aos="fade-down"
              >
                {homeData.title}
              </h1>
              <h2
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[var(--text)] flex items-center"
                data-aos-delay="600"
                data-aos="fade-right"
              >
                <span className="typing-text">
                  {currentText}
                  <span
                    className={`cursor ${
                      showCursor ? "opacity-100" : "opacity-0"
                    } transition-all duration-200`}
                  >
                    |
                  </span>
                </span>
              </h2>
            </div>

            <p
              className="text-lg text-[var(--text)] leading-relaxed max-w-lg"
              data-aos-delay="600"
              data-aos="fade-left"
            >
              {homeData.description}
            </p>

            <div
              className="flex items-center space-x-4"
              data-aos-delay="600"
              data-aos="fade-down"
            >
              <span className="text-[var(--text)] font-medium">
                Follow me on:
              </span>
              <div className="flex space-x-3">
                {homeData.socialMedia.map((social, index) => (
                  <Tippy content={social.platform} key={index} placement="top">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[var(--surface-2)] text-white rounded-full flex items-center shadow-2xl justify-center hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      aria-label={`Visit ${social.platform}`}
                    >
                      <i className={`${social.icon} text-lg`}></i>
                    </a>
                  </Tippy>
                ))}
              </div>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4"
              data-aos-delay="600"
              data-aos="fade-down"
            >
              {homeData.buttons.map((btn, index) => (
                <Tippy content={btn.label} key={index} placement="top">
                  {btn.href && btn.href !== "#" ? (
                    <a
                      href={btn.href}
                      className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                        btn.type === "primary"
                          ? "btn-gradient"
                          : "border-2 border-[var(--primary)] text-[var(--text)] hover:bg-white/10"
                      }`}
                      target={btn.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                    >
                      <i
                        className={`bx ${
                          btn.type === "primary" ? "bx-download" : "bx-envelope"
                        } mr-2`}
                      />
                      {btn.label}
                    </a>
                  ) : (
                    <button
                      onClick={() =>
                        Swal.fire({
                          title: "Not Available Yet 😅",
                          text: "This feature or file is not ready yet. Please check back later!",
                          icon: "info",
                          confirmButtonColor: "#1F2937",
                          confirmButtonText: "Alright",
                        })
                      }
                      className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                        btn.type === "primary"
                          ? "btn-gradient"
                          : "border-2 border-[var(--primary)] text-[var(--text)] hover:bg-white/10"
                      }`}
                      aria-label={btn.label}
                    >
                      <i
                        className={`bx ${
                          btn.type === "primary" ? "bx-download" : "bx-envelope"
                        } mr-2`}
                      />
                      {btn.label}
                    </button>
                  )}
                </Tippy>
              ))}
            </div>

            {/* Quick Stats removed by request */}
          </div>

          <div
            className="relative flex justify-center items-center"
            data-aos-delay="600"
            data-aos="fade-up"
          >
            <div className="relative z-10">
              <img
                src={homeData.img}
                alt="Hizkia Siahaan Profile"
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl dark:shadow-gray-800 border-8 border-white dark:border-gray-800 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
              />
            </div>

            {homeData.floatingIcons.map((tech, index) => {
              const positions = [
                "top-0 left-16 sm:left-20",
                "top-0 right-0",
                "bottom-0 left-8 sm:left-10",
                "bottom-8 sm:bottom-10 right-10 sm:right-12",
              ];
              return (
                <Tippy
                  key={index}
                  content={tech.label}
                  placement="top"
                  animation="shift-away"
                  delay={[0, 0]}
                >
                  <motion.div
                    className={`absolute ${
                      positions[index % positions.length]
                    } w-12 h-12 sm:w-16 sm:h-16 bg-[var(--surface-2)] text-white rounded-full drop-shadow-2xl shadow-lg flex items-center justify-center cursor-pointer`}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <i className={`${tech.icon} text-xl sm:text-2xl`}></i>
                  </motion.div>
                </Tippy>
              );
            })}
          </div>
        </div>

        <style>{`
          .shadow-3xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
          }
          .dark .shadow-3xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
          }
          .typing-text {
            display: inline-block;
          }
          .cursor {
            font-weight: 600;
            color: #1f2937;
          }
          .dark .cursor {
            color: #d1d5db;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Home;
