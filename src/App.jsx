import Navbar from './components/Navbar';
import Home from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Education from './components/Education';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import SoundToggle, { SoundProvider } from './components/SoundToggle';
import { motion } from 'framer-motion';

function App() {
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <SoundProvider>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <motion.div {...pageTransition}>
        <Home />
        <About />
        <Services />
        <Education />
        <Portfolio />
        <Contact />
        <Footer />
      </motion.div>
      <ScrollToTop />
      <SoundToggle />
    </SoundProvider>
  )
}

export default App
