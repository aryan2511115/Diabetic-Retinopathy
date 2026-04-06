import { create } from 'zustand';

const useStore = create((set) => ({
  image: null,
  imagePreview: null,
  isAnalyzing: false,
  result: null,
  error: null,
  setImage: (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        set({ image: file, imagePreview: reader.result, result: null, error: null });
      };
      reader.readAsDataURL(file);
    } else {
      set({ image: null, imagePreview: null, result: null, error: null });
    }
  },
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setResult: (result) => set({ result, isAnalyzing: false }),
  setError: (error) => set({ error, isAnalyzing: false }),
  reset: () => set({ image: null, imagePreview: null, isAnalyzing: false, result: null, error: null }),
}));

export default useStore;
