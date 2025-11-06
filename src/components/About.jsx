import aboutData from "../data/aboutData.jsx";
import Tippy from '@tippyjs/react';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSound } from "./SoundToggle";


const About = () => {
    const { playSound } = useSound();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const resumeButtonClasses = `inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${aboutData.resume.type === "primary"
        ? "bg-gray-800 dark:bg-white text-white dark:text-gray-800 hover:bg-gray-800 dark:hover:bg-gray-100"
        : "border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-800"
        }`;

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.2
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
            id="about"
            className="min-h-screen bg-app pt-20 overflow-hidden"
            data-aos="fade-down"
            data-aos-duration="1000"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <header className="text-center text-[var(--text)] mb-12">
                    <h2 className="text-5xl font-bold mb-2 gradient-text">{aboutData.title}</h2>
                    <p className="text-lg text-[var(--text)]">{aboutData.subtitle}</p>
                </header>

                {/* Content Grid */}
                <motion.div 
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center py-12 min-h-[calc(100vh-5rem)]"
                >
                    {/* Profile Image */}
                    <motion.div 
                        variants={itemVariants}
                        className="w-full flex justify-center lg:justify-start"
                    >
                        <motion.img
                            src={aboutData.image}
                            alt="About Me"
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-md rounded-xl shadow-lg object-cover 
                             border-8 border-white dark:border-gray-800"
                        />

                    </motion.div>

                    {/* Biodata Section */}
                    <motion.div 
                        variants={itemVariants}
                        className="w-full text-[var(--text)]"
                    >
                        {/* About Narrative - Two Columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8" data-aos-delay="600" data-aos="fade-down">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-12 h-12 p-4 flex items-center justify-center rounded-lg shadow-lg bg-[var(--surface-2)] text-white">
                                        <i className={`bx ${aboutData.aboutNarrative.whoAmI.icon} text-xl`}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text)]">Who Am I</h3>
                                </div>
                                <p className="text-muted">
                                    {aboutData.aboutNarrative.whoAmI.text}
                                </p>
                            </div>


                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--surface-2)] p-4 shadow-lg text-white">
                                        <i className={`bx ${aboutData.aboutNarrative.approach.icon} text-xl`}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text)]">My Approach</h3>
                                </div>
                                <p className="text-muted">
                                    {aboutData.aboutNarrative.approach.text}
                                </p>
                            </div>

                        </div>
                        {/* Personal Info Heading */}
                        <div className="flex items-center gap-2 mb-4" data-aos-delay="600" data-aos="fade-down">
                            <i className="bx bx-info-circle text-2xl text-[var(--text)]" aria-hidden="true"></i>
                            <h2 className="text-2xl font-semibold text-[var(--text)]">Personal Info</h2>
                        </div>

                        {/* Biodata Grid - 2x2 Layout */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto lg:mx-0" data-aos-delay="600" data-aos="fade-down">
                            {aboutData.biodata.map((item, index) => (
                                <li key={index} className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 p-4 rounded-lg bg-[var(--surface-2)] shadow-lg text-white">
                                        <i className={`${item.icon} text-xl`} aria-hidden="true"></i>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-sm text-[var(--text)]">{item.label}:</span>
                                        <span className="text-sm text-muted"> {item.value}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>



                        <Tippy content="Download My Resume">
                            {aboutData.resume.href ? (
                                <a
                                    href={aboutData.resume.href}
                                    download
                                    onClick={() => playSound('click')}
                                    className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 btn-gradient`}
                                    aria-label="Download Resume"
                                    data-aos-delay="600"
                                    data-aos="fade-down"
                                >
                                    <i className={`${aboutData.resume.icon} text-lg mr-2`} aria-hidden="true"></i>
                                    {aboutData.resume.label}
                                </a>
                            ) : (
                                <button
                                    onClick={() => {
                                        playSound('click');
                                        Swal.fire({
                                            title: "Not Available Yet 😅",
                                            text: "My resume is still in progress. Please check back later!",
                                            icon: "info",
                                            confirmButtonColor: "#1F2937",
                                            confirmButtonText: "Alright",
                                        });
                                    }}
                                    className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 btn-gradient`}
                                    aria-label="Download Resume"
                                    data-aos-delay="600"
                                    data-aos="fade-down"
                                >
                                    <i className={`${aboutData.resume.icon} text-lg mr-2`} aria-hidden="true"></i>
                                    {aboutData.resume.label}
                                </button>
                            )}
                        </Tippy>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;