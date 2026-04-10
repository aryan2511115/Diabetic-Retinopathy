import React from 'react';
import { Activity, ShieldCheck, Microscope } from 'lucide-react';

export const Navbar = () => (
  <nav className="flex justify-between items-center px-8 py-6 glass sticky top-0 z-50 shadow-lg backdrop-blur-md">
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="p-2 glass rounded-lg bg-medical-primary/20 group-hover:bg-medical-primary/40 transition-all duration-300">
        <Microscope className="w-6 h-6 text-medical-primary" />
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white mb-0 mt-0">Retina<span className="text-medical-primary">AI</span></h1>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-[-2px]">Diagnostic Intelligence</p>
      </div>
    </div>
    <div className="flex gap-8 items-center text-sm font-medium text-gray-300">
      <a href="#" className="hover:text-medical-primary transition-colors flex items-center gap-1.5 uppercase tracking-tighter">
        <Activity className="w-4 h-4" /> Reports
      </a>
      <a href="#" className="hover:text-medical-primary transition-colors flex items-center gap-1.5 uppercase tracking-tighter">
        <ShieldCheck className="w-4 h-4" /> Compliance
      </a>

    </div>
  </nav>
);

export const Footer = () => (
  <footer className="py-12 border-t border-medical-border mt-20">
    <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Microscope className="w-5 h-5 text-medical-primary" />
          <span className="text-lg font-bold">RetinaAI</span>
        </div>
        <p className="text-sm text-gray-400 max-w-xs">
          Advanced retinal image analysis powered by state-of-the-art deep learning for early detection of diabetic retinopathy.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold uppercase tracking-widest text-gray-300">Diagnostics</span>
        <a href="#" className="text-sm text-gray-500 hover:text-medical-primary transition-colors">Screening Protocols</a>
        <a href="#" className="text-sm text-gray-500 hover:text-medical-primary transition-colors">Case Studies</a>
        <a href="#" className="text-sm text-gray-500 hover:text-medical-primary transition-colors">AI Research</a>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold uppercase tracking-widest text-gray-300">Privacy & Security</span>
        <p className="text-xs text-gray-500">HIPAA Compliant Infrastructure</p>
        <p className="text-xs text-gray-500">256-bit AES Encryption</p>
        <div className="flex gap-4 mt-2">
            <span className="px-2 py-1 glass rounded-md text-[10px] text-gray-400">GDPR</span>
            <span className="px-2 py-1 glass rounded-md text-[10px] text-gray-400">ISO 27001</span>
        </div>
      </div>
    </div>
    <div className="text-center mt-12 pt-8 border-t border-medical-border text-xs text-gray-600">
      &copy; {new Date().getFullYear()} RetinaAI Medical Systems. All professional use only.
    </div>
  </footer>
);
