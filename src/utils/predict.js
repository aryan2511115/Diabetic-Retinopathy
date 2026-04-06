/**
 * Simulated DR Prediction API
 * Result mapping:
 * 0 → No DR
 * 1 → Mild
 * 2 → Moderate
 * 3 → Severe
 * 4 → Proliferative DR
 */

const LABELS = [
  { id: 0, label: "No Diabetic Retinopathy", description: "Healthy retina, no signs of diabetic damage.", color: "green" },
  { id: 1, label: "Mild Non-Proliferative DR", description: "Small areas of swelling in the retinal blood vessels.", color: "yellow" },
  { id: 2, label: "Moderate Non-Proliferative DR", description: "Blood vessels that nourish the retina may swell and distort.", color: "orange" },
  { id: 3, label: "Severe Non-Proliferative DR", description: "Many blood vessels are blocked, depriving the retina of blood supply.", color: "red" },
  { id: 4, label: "Proliferative DR", description: "Advanced stage where new, abnormal blood vessels grow in the retina.", color: "dark-red" },
];

export const predictImage = async (imageFile) => {
  // Simulate API delay (1.5 to 2.5 seconds)
  const delay = Math.floor(Math.random() * 1000) + 1500;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Logic: If random prediction
      const classId = Math.floor(Math.random() * 5);
      const confidence = (Math.random() * (99.9 - 75.0) + 75.0).toFixed(2);
      
      resolve({
        id: classId,
        ...LABELS[classId],
        confidence: parseFloat(confidence),
        timestamp: new Date().toISOString()
      });
    }, delay);
  });
};
