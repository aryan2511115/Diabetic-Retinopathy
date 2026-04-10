import React from 'react';
import { motion } from 'framer-motion';
import Eye3D from './Eye3D';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 items-center min-h-[60vh] gap-12 text-left">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 mb-0 mt-0 text-white">
            <span className="bg-gradient-to-r from-medical-primary to-medical-accent bg-clip-text text-transparent">
              Diabetic Retinopathy
            </span>
            Detection
          </h1>
          <p className="text-lg text-gray-400 mb-10 max-w-lg">
            Upload high-resolution retinal fundus images and receive instant, 
            AI-driven assessments of diabetic retinopathy severity with therapeutic-grade precision.
          </p>
            <div className="flex gap-4">
            <button 
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-medical-primary text-white rounded-xl font-bold shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] transform hover:scale-105 transition-all duration-300"
            >
              Analyze Now
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <Eye3D />
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-medical-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
