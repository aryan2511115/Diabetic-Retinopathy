import React, { useCallback, useState } from 'react';
import { Upload, X, ShieldAlert, MonitorCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import { predictImage } from '../utils/predict';

export default function UploadSection() {
  const {
    image,
    setImage,
    imagePreview,
    isAnalyzing,
    error,
    setAnalyzing,
    setResult,
    setError,
  } = useStore();
  const [isDragActive, setIsDragActive] = useState(false);

  const onFileSelect = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      return;
    }

    if (file) {
      setError('Please upload a valid image file.');
    }
  }, [setImage, setError]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const startAnalysis = async () => {
    if (!image || !imagePreview) {
      setError('Upload an image before running detection.');
      return;
    }

    setError(null);
    setAnalyzing(true);

    try {
      const result = await predictImage(image);
      setResult(result);
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (e) {
      setError('Analysis failed. Please try again.');
    }
  };

  return (
    <section id="upload-section" className="py-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto glass p-10 rounded-[2.5rem] border-medical-border text-center overflow-hidden relative border shadow-2xl">
        <div className="flex flex-col items-center gap-6">
          <div className="p-4 glass rounded-3xl bg-medical-primary/10 mb-2">
            <Upload className="w-10 h-10 text-medical-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-0 mt-0 text-white">Diagnostic Upload</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Select or drag a retinal fundus image for comprehensive automated analysis.
          </p>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`w-full h-[350px] rounded-3xl border-2 border-dashed transition-all duration-300 relative group cursor-pointer flex flex-col items-center justify-center gap-4 overflow-hidden shadow-inner ${
              isDragActive
                ? 'border-medical-primary bg-medical-primary/10'
                : 'border-medical-border hover:border-gray-500 hover:bg-white/5'
            }`}
            onClick={() => document.getElementById('file-input').click()}
          >
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => onFileSelect(e.target.files[0])}
            />

            {!imagePreview ? (
              <>
                <Upload className="w-16 h-16 text-gray-700 group-hover:text-medical-primary transition-colors" />
                <span className="text-gray-500 font-medium tracking-wide">
                  DROP IMAGE HERE OR <span className="text-medical-primary underline underline-offset-4 decoration-2">BROWSE</span>
                </span>
                <div className="flex gap-4 mt-8 opacity-40">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500"><ShieldAlert className="w-3.5 h-3.5" /> DICOM Support</span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500"><MonitorCheck className="w-3.5 h-3.5" /> High Res</span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500"><HelpCircle className="w-3.5 h-3.5" /> Encrypted</span>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full p-4">
                <img src={imagePreview} className="w-full h-full object-contain rounded-2xl shadow-xl" alt="Preview" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setImage(null);
                    setError(null);
                  }}
                  className="absolute top-8 right-8 p-3 glass bg-red-500/80 hover:bg-red-600 rounded-full text-white shadow-lg transition-transform hover:scale-110 border-red-400 group"
                >
                  <X className="w-5 h-5" />
                </button>
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
                    <div className="w-1/2 h-1 bg-gray-800 rounded-full overflow-hidden relative mb-6">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-0 left-0 bottom-0 bg-medical-primary shadow-[0_0_15px_rgba(14,165,233,0.8)]"
                      />
                    </div>
                    <div className="text-medical-primary font-bold uppercase tracking-[0.2em] text-sm animate-pulse flex items-center gap-3">
                      Scanning Retinal Layers...
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="scanner-line absolute top-0 left-0 right-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <AnimatePresence>
            {error ? (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-sm text-red-400"
              >
                {error}
              </motion.p>
            ) : null}
          </AnimatePresence>

          <button
            disabled={!imagePreview || isAnalyzing}
            onClick={startAnalysis}
            className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 transform shadow-xl uppercase tracking-widest text-sm ${
              !imagePreview || isAnalyzing
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed scale-95'
                : 'bg-gradient-to-r from-medical-primary to-blue-600 text-white hover:scale-105 hover:shadow-medical-primary/30'
            }`}
          >
            {isAnalyzing ? (
              'Analysis In Progress...'
            ) : (
              <>
                Run Diagnostic <MonitorCheck className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
