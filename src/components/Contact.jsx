import { useState } from "react";
import contactData from "../data/contactData.jsx";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import aboutData from "../data/aboutData.jsx";
import confetti from "canvas-confetti";
import { useSound } from "./SoundToggle";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const { playSound } = useSound();
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
        duration: 0.5
      }
    }
  };

  // derive email from aboutData
  const emailEntry = aboutData?.biodata?.find?.((b) => (b.label || "").toLowerCase() === "email");
  const emailAddress = emailEntry?.value || "";

  const whatsappLink = contactData.socials.find((s) => s.label.toLowerCase().includes("whatsapp"))?.href;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (!emailAddress) return;
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      
      // Play success sound and trigger confetti
      playSound('success');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#61DAFB']
      });
    } catch (_) {}
  };

  const handleContactClick = () => {
    // Play click sound and trigger confetti
    playSound('click');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#a855f7', '#61DAFB', '#F59E0B']
    });
  };

  return (
    <section id="contact" className="bg-app pt-20 pb-8" data-aos-duration="1000" data-aos="fade-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Subtitle */}
        <div className="text-center mb-12 text-[var(--text)]" data-aos-delay="600" data-aos="fade-down">
          <h2 className="text-5xl font-bold mb-2 gradient-text">{contactData.title}</h2>
          <p className="text-lg text-muted">{contactData.subtitle}</p>
        </div>

        {/* Tabs Menu */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap" data-aos-delay="600" data-aos="fade-down">
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
              activeTab === "contact"
                ? "btn-gradient text-white"
                : "bg-[var(--surface)] text-[var(--text)] border border-soft hover:bg-white/5"
            }`}
          >
            <i className="bx bx-envelope"></i>
            Contact Me
          </button>
        </div>

        {/* Tabs Content */}
        <div>
          {activeTab === "contact" && (
            <motion.div 
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 gap-8"
            >
              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 justify-center">
                <a
                  href={emailAddress ? `mailto:${emailAddress}?subject=Hello%20Fouad&body=Hi%20Fouad,` : "#"}
                  onClick={handleContactClick}
                  className="px-5 py-3 rounded-lg btn-gradient text-white font-medium shadow-lg hover:-translate-y-0.5 transition"
                >
                  <i className="bx bx-envelope" />
                  <span className="ml-2">Email Me</span>
                </a>
                {whatsappLink && (
                  <a
                    href={`${whatsappLink}?text=Hi%20Fouad!%20I%20found%20your%20portfolio%20and%20would%20love%20to%20connect.`}
                    target="_blank" rel="noopener noreferrer"
                    onClick={handleContactClick}
                    className="px-5 py-3 rounded-lg bg-[var(--surface)] text-[var(--text)] border border-soft font-medium shadow hover:-translate-y-0.5 transition"
                  >
                    <i className="bx bxl-whatsapp" />
                    <span className="ml-2">WhatsApp</span>
                  </a>
                )}
                {emailAddress && (
                  <button onClick={handleCopy}
                    className="px-5 py-3 rounded-lg bg-[var(--surface)] text-[var(--text)] border border-soft font-medium shadow hover:-translate-y-0.5 transition"
                    type="button"
                  >
                    <i className="bx bx-copy" />
                    <span className="ml-2">{copied ? "Copied" : "Copy Email"}</span>
                  </button>
                )}
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {contactData.socials.map((item, index) => (
                  <motion.a
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 px-7 w-full  py-7 border border-soft rounded-lg shadow-lg bg-[var(--surface)] text-[var(--text)]"
                    aria-label={item.label}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 flex items-center justify-center shadow-lg rounded-lg bg-[var(--surface-2)] text-white shrink-0">
                        <i className={`${item.icon} text-xl`} />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-semibold text-2xl leading-tight">{item.label}</span>
                        <span className="text-sm text-[var(--text)] leading-snug">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  <i className="bx bx-chevron-right text-2xl text-[var(--text)]" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Contact;