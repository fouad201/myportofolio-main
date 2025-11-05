import Navbar from './components/Navbar';
import Home from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import Contact from './components/Contact';
import Portfolio from './components/Portofolio';
function App() {

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Home />
      <About />
      <Education />
      <Portfolio />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
