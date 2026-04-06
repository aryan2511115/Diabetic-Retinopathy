import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Info, Activity, History, Share2, ShieldCheck } from 'lucide-react';
import useStore from '../store/useStore';
import { jsPDF } from 'jspdf';

const COLOR_MAP = {
  "green": "from-emerald-400 to-green-600 shadow-emerald-500/20 text-emerald-400",
  "yellow": "from-yellow-300 to-amber-500 shadow-yellow-500/20 text-yellow-300",
  "orange": "from-orange-400 to-red-500 shadow-orange-500/20 text-orange-400",
  "red": "from-red-500 to-rose-700 shadow-red-500/20 text-red-500",
  "dark-red": "from-rose-800 to-red-950 shadow-rose-950/20 text-rose-800",
};

const SUGGESTIONS = {
  0: ["Routine annual comprehensive eye exams recommended.", "Maintain optimal glycemic control (HbA1c < 7%).", "Consistent monitoring of blood pressure and cholesterol levels.", "Healthy lifestyle and balanced nutrition for retinal health."],
  1: ["Schedule follow-up eye exam within 6–12 months.", "Review diabetes management plan with primary care physician.", "Monitor for any new visual symptoms like floaters or blurred vision.", "Aqueous humor dynamics monitoring might be considered."],
  2: ["Ophthalmologist consultation required within 3–6 months.", "Strict control of blood glucose and blood pressure is critical.", "High-resolution OCT imaging recommended for macular edema baseline.", "Patient education on signs of vision-threatening progression."],
  3: ["Urgent referral to a Vitreoretinal specialist within 1 month.", "Consider intravitreal injections if macular edema is present.", "Evaluation for pan-retinal photocoagulation (PRP) therapy.", "Frequent monitoring (every 1–3 months) as directed by specialist."],
  4: ["Immediate specialist consultation (within 1 week).", "Prepare for possible laser treatment or anti-VEGF therapy.", "Surgical intervention (vitrectomy) may be necessary if hemorrhages occur.", "Aggressive management of systemic risk factors required."]
};

export default function ResultCard() {
  const { result, imagePreview } = useStore();

  if (!result) return null;

  const downloadReport = () => {
    const doc = new jsPDF();
    const primaryColor = [14, 165, 233]; // #0ea5e9
    
    // Header Branding
    doc.setFillColor(3, 7, 18); // Dark background
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("RetinaAI Diagnostics", 20, 22);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("CLINICAL ANALYSIS REPORT v2.0", 20, 30);
    
    // Colorful Main Heading
    doc.setFontSize(18);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Diabetic Retinopathy Classification", 20, 55);
    
    // Divider
    doc.setDrawColor(230, 230, 230);
    doc.line(20, 60, 190, 60);
    
    // Patient/Analysis Metadata
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date(result.timestamp).toLocaleString()}`, 20, 70);
    doc.text(`Analysis ID: RAI-992-PX8`, 130, 70);
    
    // Results Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Assessment Outcome:", 20, 85);
    
    doc.setFontSize(22);
    // Dynamic color for output
    const statusColors = { "green": [16, 185, 129], "yellow": [245, 158, 11], "orange": [249, 115, 22], "red": [239, 68, 68], "dark-red": [153, 27, 27] };
    const resColor = statusColors[result.color];
    doc.setTextColor(resColor[0], resColor[1], resColor[2]);
    doc.text(result.label, 20, 98);
    
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`Confidence Score: ${result.confidence}%`, 20, 108);
    
    // Add Retinal Image
    if (imagePreview) {
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(130, 82, 60, 45); // Image frame
      doc.addImage(imagePreview, 'JPEG', 132, 84, 56, 41);
      doc.setFontSize(8);
      doc.text("scanned_fundus_image.jpg", 132, 131);
    }
    
    // Clinical Description
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Clinical Finding:", 20, 140);
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    const splitDesc = doc.splitTextToSize(result.description, 170);
    doc.text(splitDesc, 20, 148);
    
    // Recommendations Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129); // Green tint
    doc.text("Recommendations & Guidelines:", 20, 175);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    let yPos = 185;
    SUGGESTIONS[result.id].forEach(sug => {
      doc.text("• " + sug, 25, yPos);
      yPos += 8;
    });
    
    // Footer Legal
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.line(20, 275, 190, 275);
    doc.text("Disclaimer: This tool is intended for screening assistance and does not replace medical consultation.", 20, 282);
    doc.text("Generated by RetinaAI Enterprise Intelligence.", 145, 282);
    
    doc.save(`RetinaAI_Diagnostic_${result.label.replace(/ /g, '_')}.pdf`);
  };

  return (
    <motion.section 
      id="result-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-24 container mx-auto px-6"
    >
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
        {/* Main Result Card */}
        <div className="glass p-10 rounded-[2.5rem] border-medical-border flex flex-col justify-between shadow-2xl relative overflow-hidden group border">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-xl font-bold uppercase tracking-widest text-gray-400 mb-0 mt-0 flex items-center gap-2">
                <Activity className="w-5 h-5 text-medical-primary" /> Analysis Report
            </h2>
            <div className="p-2 glass border-medical-border rounded-lg text-gray-500 hover:text-white cursor-pointer transition-colors shadow-sm">
                <HelpCircle className="w-4 h-4" />
            </div>
          </div>

          <div className="mb-10 text-center">
            <h3 className={`text-4xl md:text-5xl font-black mb-4 ${COLOR_MAP[result.color].split(' ')[0]} bg-gradient-to-br ${COLOR_MAP[result.color].split(' ').slice(0,2).join(' ')} bg-clip-text text-transparent`}>
                {result.label}
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed px-4">
                {result.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-end mb-1">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-500">Confidence Score</span>
                <span className={`font-mono text-lg font-bold ${COLOR_MAP[result.color].split(' ').pop()}`}>{result.confidence}%</span>
            </div>
            <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className={`h-full bg-gradient-to-r ${COLOR_MAP[result.color].split(' ').slice(0,2).join(' ')} shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                />
            </div>
            <p className="text-[10px] text-gray-600 uppercase tracking-tighter text-center italic">
                Processed on: {new Date(result.timestamp).toLocaleString()} • Model: RetinaAI-v2.0
            </p>
          </div>
          
          <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 -z-10 rounded-full transition-all group-hover:scale-150 ${COLOR_MAP[result.color].split(' ').slice(0,2).join(' ')}`} />
        </div>

        {/* Action & Stats Side */}
        <div className="space-y-6 flex flex-col">
          <div className="glass p-8 rounded-3xl border-medical-border flex-1 border shadow-lg group hover:border-medical-primary/50 transition-all duration-300">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                <Info className="w-4 h-4 text-medical-primary" /> Diagnostic Actions
            </h4>
            <div className="grid gap-3">
               <button 
                onClick={downloadReport}
                className="w-full py-4 glass border-medical-border rounded-2xl text-sm font-bold hover:bg-medical-primary hover:text-white transition-all flex items-center justify-center gap-3 group/btn"
               >
                  Download PDF Report <Share2 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
               </button>
               <button className="w-full py-4 glass border-medical-border rounded-2xl text-sm font-bold hover:bg-medical-accent hover:text-white transition-all flex items-center justify-center gap-3 group/btn">
                  View Historical Data <History className="w-4 h-4 group-hover/btn:-rotate-12 transition-transform" />
               </button>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border-medical-border border shadow-lg relative overflow-hidden">
             <div className="flex items-center gap-4">
                 <div className="w-12 h-12 glass rounded-2xl bg-white/5 flex items-center justify-center">
                    <span className="text-xl font-black text-medical-primary">DR</span>
                 </div>
                 <div>
                    <h5 className="font-bold text-white mb-0 mt-0">RetinaAI Professional</h5>
                    <p className="text-xs text-gray-500 mt-[-2px]">Enterprise Clinical License</p>
                 </div>
             </div>
             <div className="mt-8 pt-6 border-t border-medical-border flex justify-between items-center">
                <span className="text-xs text-gray-500">Status: <span className="text-emerald-400 font-bold ml-1 uppercase">Active</span></span>
                <span className="text-xs text-gray-500 font-mono tracking-tighter">ID: RAI-992-PX8</span>
             </div>
          </div>
        </div>
      </div>

      {/* Clinical Suggestions Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 max-w-4xl mx-auto glass p-8 rounded-3xl border-medical-border border shadow-xl"
      >
        <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-white">
            <ShieldCheck className="w-6 h-6 text-emerald-400" /> Clinical Recommendations
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
            {SUGGESTIONS[result.id].map((suggestion, index) => (
                <div key={index} className="flex gap-4 p-4 glass rounded-2xl border-medical-border/50 items-start">
                    <div className="mt-1 w-2 h-2 rounded-full bg-medical-primary flex-shrink-0" />
                    <p className="text-sm text-gray-400 leading-relaxed italic">
                        {suggestion}
                    </p>
                </div>
            ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
