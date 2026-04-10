import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, AlertTriangle, CheckCircle, Info, ArrowLeft, ArrowRight, Activity, Microscope } from 'lucide-react';

const STAGES = [
  {
    id: 0,
    title: "No Diabetic Retinopathy",
    description: "The retina appears healthy. No microaneurysms or hemorrhages are present.",
    symptoms: ["Clear vision", "No visible retinal changes"],
    risk: "Low",
    icon: <CheckCircle className="w-8 h-8 text-emerald-400" />
  },
  {
    id: 1,
    title: "Mild NPDR",
    description: "The earliest stage. Small areas of swelling (microaneurysms) appear in the retinal blood vessels.",
    symptoms: ["Often asymptomatic", "Small red dots in fundus image"],
    risk: "Minor",
    icon: <Info className="w-8 h-8 text-yellow-400" />
  },
  {
    id: 2,
    title: "Moderate NPDR",
    description: "Blood vessels that nourish the retina may swell and distort. They also may lose their ability to transport blood.",
    symptoms: ["Mildly blurred vision", "Vessel distortion"],
    risk: "Moderate",
    icon: <Activity className="w-8 h-8 text-orange-400" />
  },
  {
    id: 3,
    title: "Severe NPDR",
    description: "Many blood vessels are blocked, depriving several areas of the retina with their blood supply. These areas secrete growth factors that signal the retina to grow new blood vessels.",
    symptoms: ["Blurred vision", "Floaters", "Significant blocking"],
    risk: "High",
    icon: <AlertTriangle className="w-8 h-8 text-red-500" />
  },
  {
    id: 4,
    title: "Proliferative DR (PDR)",
    description: "New, abnormal blood vessels grow in the retina. These vessels are fragile and prone to leaking, potentially causing severe vision loss or detachment.",
    symptoms: ["Severe vision loss", "Floaters", "Retinal scarring"],
    risk: "Critical",
    icon: <Microscope className="w-8 h-8 text-rose-600" />
  }
];

export default function Documentation({ onBack }) {
  const goBack = () => {
    if (typeof onBack === 'function') {
      onBack();
      return;
    }
    document.getElementById('detection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-20"
    >
      <button 
        onClick={goBack}
        className="flex items-center gap-2 text-gray-500 hover:text-medical-primary transition-colors mb-12 uppercase text-xs font-bold tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Analysis
      </button>

      <div className="flex flex-col items-center mb-20 text-center">
        <div className="p-4 glass rounded-3xl bg-medical-primary/10 mb-6">
            <BookOpen className="w-10 h-10 text-medical-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Clinical Documentation</h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Understanding the progression of Diabetic Retinopathy is vital for early intervention. 
            Our AI model classifies retinal images into five internationally recognized clinical stages.
        </p>
      </div>

      <div className="grid gap-8">
        {STAGES.map((stage, idx) => (
          <motion.div 
            key={stage.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-[2.5rem] border-medical-border border shadow-lg flex flex-col md:flex-row gap-10 items-center hover:border-medical-primary/30 transition-all group"
          >
            <div className="p-6 glass rounded-full bg-white/5 group-hover:scale-110 transition-transform">
                {stage.icon}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-4 mb-2">
                 <span className="text-sm font-mono text-medical-primary">STAGE 0{stage.id}</span>
                 <span className="px-2 py-0.5 glass rounded text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Risk: {stage.risk}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{stage.title}</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {stage.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {stage.symptoms.map((sym, si) => (
                    <span key={si} className="px-3 py-1 glass rounded-full text-xs text-medical-primary border-medical-primary/20">
                        {sym}
                    </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 glass p-12 rounded-[3rem] border-medical-border border text-center bg-gradient-to-br from-medical-primary/5 to-transparent">
         <h3 className="text-3xl font-bold text-white mb-6">Ready to Run a Diagnostic?</h3>
         <p className="text-gray-400 mb-10 max-w-lg mx-auto">
            Our enterprise-grade AI is ready to assist in detecting signs across all clinical stages with high precision.
         </p>
         <button 
           onClick={goBack}
           className="px-10 py-5 bg-medical-primary text-white rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all flex items-center gap-2 mx-auto uppercase text-sm tracking-widest"
         >
            Start Analysis <ArrowRight className="w-5 h-5" />
         </button>
      </div>
    </motion.div>
  );
}
