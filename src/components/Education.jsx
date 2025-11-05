import { educationData } from "../data/educationData.jsx";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="education" className="min-h-screen bg-app pt-20" data-aos-duration="1000" data-aos="fade-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 text-[var(--text)]" data-aos-delay="600" data-aos="fade-down">
          <h2 className="text-5xl font-bold mb-2 gradient-text">Education</h2>
          <p className="text-lg text-muted">My academic background and certifications</p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div 
            className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-white/15"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <motion.ul 
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {educationData.map((item, idx) => (
              <motion.li 
                key={idx} 
                variants={itemVariants}
                className="relative pl-12 sm:pl-16"
              >
                {/* Dot */}
                <motion.span 
                  className="absolute left-3.5 sm:left-5 top-2 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[var(--primary)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.2 + 0.3, duration: 0.3 }}
                />

                <motion.div 
                  className="bg-[var(--surface)] border border-soft rounded-lg p-6 shadow-lg"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="h-1 w-20 bg-gradient-to-r from-[var(--grad-from)] to-[var(--grad-to)] rounded mb-4"></div>
                  <div className="flex items-start gap-4 mb-2">
                    {item.logo ? (
                      <img src={item.logo} alt={`${item.institution} logo`} className="w-12 h-12 rounded-md object-cover border border-soft" />
                    ) : (
                      <div className="w-12 h-12 rounded-md bg-[var(--surface-2)] text-white flex items-center justify-center border border-soft">
                        <i className="bx bx-building-house"></i>
                      </div>
                    )}
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-xl font-semibold text-[var(--text)]">{item.institution}</h3>
                      <span className="text-sm text-muted">{item.startYear} – {item.endYear}</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-muted">{item.degree} — {item.field}</p>
                  {item.description && (
                    <p className="mt-3 text-sm text-[var(--text)] leading-relaxed">{item.description}</p>
                  )}
                  {Array.isArray(item.skills) && item.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.skills.map((s, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded-full bg-white/10 text-[var(--text)] border border-soft">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  {Array.isArray(item.achievements) && item.achievements.length > 0 && (
                    <ul className="mt-3 space-y-1 text-sm text-[var(--text)]">
                      {item.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <i className="bx bx-check-circle text-[var(--primary)] translate-y-[2px]"></i>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.certificateLink && (
                    <div className="mt-4">
                      <a href={item.certificateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-gradient text-white px-3 py-2 rounded-md text-sm">
                        <i className="bx bx-link-external"></i>
                        View Certificate
                      </a>
                    </div>
                  )}
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default Education;

