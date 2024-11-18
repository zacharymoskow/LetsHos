import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'

const inspirationThemes = [
  { id: 1, name: 'Sleek & Modern', src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Bright & Open', src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Cozy & Rustic', src: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Fancy & Luxe', src: 'https://images.unsplash.com/photo-1551516594-56cb78394645?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Dark & Intimate', src: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Retro & Vintage', src: 'https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?auto=format&fit=crop&w=600&q=80' },
]

export default function InspirationUpload({ onSubmit, initialData }) {
  const [selectedTheme, setSelectedTheme] = useState(initialData?.selectedTheme || null);
  const [uploadedPhoto, setUploadedPhoto] = useState(initialData?.uploadedPhoto || null);
  const fileInputRef = useRef(null);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setUploadedPhoto(null); // Clear uploaded photo when a theme is selected
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result);
        setSelectedTheme(null); // Clear selected theme when a photo is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSubmit({ selectedTheme, uploadedPhoto });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6">Choose Your Event Style</h2>
      
      {/* Theme selection grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-4">
        {inspirationThemes.map((theme) => (
          <motion.div
            key={theme.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`cursor-pointer overflow-hidden rounded-lg ${
                selectedTheme?.id === theme.id ? 'ring-4 ring-pink-500' : ''
              }`}
              onClick={() => handleThemeSelect(theme)}
            >
              <div className="aspect-square relative">
                <img src={theme.src} alt={theme.name} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 flex items-end p-1 ${
                  selectedTheme?.id === theme.id ? 'bg-pink-500 bg-opacity-50' : 'bg-black bg-opacity-40'
                }`}>
                  <h3 className="font-semibold text-xs text-white">{theme.name}</h3>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Uploaded photo preview */}
      {uploadedPhoto && (
        <div className="mb-4 relative">
          <img src={uploadedPhoto} alt="Uploaded inspiration" className="max-w-full h-auto rounded-lg" />
          <button
            onClick={() => setUploadedPhoto(null)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* File upload button */}
      {!uploadedPhoto && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-auto">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="bg-white text-blue-600 rounded-lg p-3 flex items-center transition-all duration-300 hover:bg-blue-50 shadow-md">
                <Upload size={24} />
                <span className="ml-2 font-semibold text-sm">Upload your own photo</span>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        className="w-full md:w-auto bg-green-500 text-white hover:bg-green-600 transition-colors py-3 px-6 rounded-lg text-sm font-semibold shadow-md mt-4"
        onClick={handleSubmit}
      >
        Finish Planning
      </button>
    </motion.div>
  );
}
