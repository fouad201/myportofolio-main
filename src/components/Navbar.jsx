import { useState, useEffect } from "react";
import navbarData from "../data/navbarData.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "./SoundToggle";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { playSound } = useSound();

  
    const currentYear = () => new Date().getFullYear();

  
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 }
        );

        navbarData.forEach((item) => {
            const section = document.getElementById(item.id);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

  
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

   
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (
            savedTheme === "dark" ||
            (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

   
    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newMode ? "dark" : "light");
        playSound('click');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        playSound('click');
    };

    const handleClick = (id) => {
        setActiveId(id);
        setIsMenuOpen(false);
        playSound('click');
    };
    return (
        <>
            <nav className="bg-[var(--surface)] fixed top-0 left-0 w-full z-50 p-1.5 overflow-hidden shadow-lg transition-all duration-300" data-aos-duration="1000" data-aos="fade-down">
                <div className="container">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-4">
                            <a href="#" className="flex items-center gap-2">
                                <i className="bx bx-code-alt text-2xl text-[var(--text)]"></i>
                                <h1 className="text-2xl font-semibold text-[var(--text)]">
                                    My Portfolio
                                </h1>
                            </a>


                            <button
                                className="md:hidden text-[var(--text)] focus:outline-none"
                                onClick={toggleMenu}
                                aria-label="Toggle menu"
                            >
                                <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
                            </button>

                            {/* Desktop Menu */}
                            <ul className="hidden md:flex items-center gap-6">
                                {navbarData.map((item) => (
                                    <li key={item.id}>
                                        <a
                                            href={`#${item.id}`}
                                            onClick={() => handleClick(item.id)}
                                            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${activeId === item.id
                                                ? "bg-gradient-to-r from-[var(--grad-from)] to-[var(--grad-to)] text-white shadow-2xl"
                                                : "text-[var(--text)] hover:text-[var(--primary)]"
                                                }`}>
                                            <i className={`bx ${item.icon}`}></i>
                                            <span>{item.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Off-Canvas Mobile Menu */}
            <AnimatePresence>
            {isMenuOpen && (
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-70 bg-[var(--surface)] shadow-xl z-50 md:hidden"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-soft">
                        <div className="flex items-center gap-2">
                            <i className="bx bx-code-alt text-2xl text-[var(--text)]"></i>
                            <h2 className="text-lg font-semibold text-[var(--text)]">Navigation</h2>
                        </div>
                        <button
                            className="text-[var(--text)] focus:outline-none hover:bg-white/5 p-2 rounded-lg transition-colors duration-200"
                            onClick={toggleMenu}
                            aria-label="Close menu"
                        >
                            <i className="bx bx-x text-2xl"></i>
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 overflow-y-auto py-6">
                        <ul className="flex flex-col gap-2 px-6">
                            {navbarData.map((item, index) => (
                                <motion.li
                                    key={item.id}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ 
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 24
                                    }}
                                >
                                    <a
                                        href={`#${item.id}`}
                                        onClick={() => handleClick(item.id)}
                                        className={`flex items-center gap-3 text-lg font-medium px-4 py-3 rounded-lg transition-all duration-200 ${activeId === item.id
                                            ? "bg-gradient-to-r from-[var(--grad-from)] to-[var(--grad-to)] text-white shadow-lg"
                                            : "text-[var(--text)] hover:text-[var(--primary)] hover:bg-white/5"
                                            }`}
                                    >
                                        <i className={`bx ${item.icon} text-xl`}></i>
                                        <span>{item.label}</span>
                                        <motion.i 
                                            className="bx bx-chevron-right ml-auto text-xl"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ 
                                                repeat: Infinity,
                                                duration: 1.5,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-soft">
                        <div className="text-center text-sm text-muted">
                            © {currentYear()} Fouad Mohamed. All rights reserved
                        </div>
                    </div>
                </div>
            </motion.div>
            )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;