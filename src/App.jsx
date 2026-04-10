import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Footer } from './components/Layout';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ResultCard from './components/ResultCard';
import Documentation from './components/Documentation';


function App() {

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen bg-medical-bg selection:bg-medical-primary selection:text-white">
      {/* Scroll indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-medical-primary to-medical-accent z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <nav className="flex justify-between items-center px-8 py-6 glass sticky top-0 z-50 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 glass rounded-lg bg-medical-primary/20 group-hover:bg-medical-primary/40 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-microscope w-6 h-6 text-medical-primary"><path d="M6 18h8"/><path d="M3 22h18"/><path d="m14 22-.767-2.044a.5.5 0 0 0-.466-.323h-1.534a.5.5 0 0 0-.466.323L10 22"/><path d="M15 12a3 3 0 1 0-6 0"/><path d="M12 9V5"/><path d="M12 3a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z"/><path d="M9 20H5a2 2 0 0 1-2-2V5"/><path d="M11 15h2"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white mb-0 mt-0">Retina<span className="text-medical-primary">AI</span></h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-[-2px]">Diagnostic Intelligence</p>
          </div>
        </div>
        <div className="flex gap-8 items-center text-sm font-medium text-gray-300">
          <a href="#detection" className="hover:text-medical-primary transition-colors flex items-center gap-1.5 uppercase tracking-tighter text-medical-primary">
             Diagnostic
          </a>
          <a href="#documentation" className="hover:text-medical-primary transition-colors flex items-center gap-1.5 uppercase tracking-tighter">
             Documentation
          </a>
        </div>
      </nav>

      <div className="relative">
          {/* Background visuals */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-20">
             <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-medical-primary/5 rounded-full blur-[150px]" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-medical-accent/5 rounded-full blur-[150px]" />
          </div>

              <Hero />
              
              <div id="detection" className="container mx-auto px-6 py-20">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-1.5 glass rounded-full text-xs font-bold uppercase tracking-widest text-medical-primary mb-6 border-medical-border border">
                      The Detection Workflow
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-0 mt-0 text-white leading-tight">Advanced Diagnostic <br /> Suite</h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto italic">
                        "Enabling high-precision retinal screenings through state-of-the-art neural networks."
                    </p>
                </motion.div>

                <UploadSection />
                <ResultCard />
              </div>

              <section id="documentation" className="pb-20">
                <Documentation />
              </section>
      </div>

      <Footer />
    </main>
  );
}

export default App;

