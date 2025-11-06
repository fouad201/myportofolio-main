import servicesData from "../data/servicesData.jsx";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="services"
      className="min-h-screen bg-app pt-20 pb-20"
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
            {servicesData.sectionTitle.title}
          </h2>
          <p className="text-lg text-muted">
            {servicesData.sectionTitle.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesData.services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-[var(--surface)] border border-soft rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Icon with gradient background */}
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: `linear-gradient(135deg, ${service.color}20, ${service.color}40)`
                }}
              >
                <i 
                  className={`${service.icon} text-4xl`}
                  style={{ color: service.color }}
                ></i>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[var(--text)] mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {service.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-white/10 text-[var(--text)] border border-soft"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Decorative bottom bar */}
              <div 
                className="h-1 w-full rounded mt-4"
                style={{
                  background: `linear-gradient(90deg, ${service.color}, transparent)`
                }}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

