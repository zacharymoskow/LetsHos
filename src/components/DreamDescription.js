import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Lightbulb, Music, User, Sparkles, Rocket } from 'lucide-react'
import './DreamDescription.css'

export default function DreamDescription({ onSubmit, initialData }) {
  const [dreamDescription, setDreamDescription] = useState(initialData || '')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    let timer
    if (dreamDescription.length > 0 && !isAnimating) {
      timer = setTimeout(() => {
        setIsAnimating(true)
      }, 10000) // 10 second delay
    } else if (dreamDescription.length === 0) {
      setIsAnimating(false)
      clearTimeout(timer)
    }
    return () => clearTimeout(timer)
  }, [dreamDescription, isAnimating])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsAnimating(false)
    onSubmit(dreamDescription)
  }

  const features = [
    { icon: Star, text: 'Michelin star food', color: 'bg-yellow-100 text-yellow-600' },
    { icon: Lightbulb, text: 'Bright lights', color: 'bg-blue-100 text-blue-600' },
    { icon: Music, text: 'Disco balls', color: 'bg-pink-100 text-pink-600' },
    { icon: User, text: 'Red carpet', color: 'bg-red-100 text-red-600' },
  ]

  return (
    <motion.div 
      className="max-w-2xl mx-auto mt-10 bg-white rounded-3xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="p-6 bg-purple-600">
        <h2 className="text-3xl font-bold mb-2 text-white flex items-center">
          <span className="mr-2">✨</span>
          Describe Your Dream Event
        </h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-left text-gray-600">
            <p className="mb-2">Describe your dream event in vivid detail. What sights, sounds, and experiences do you envision?</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {features.map((feature, index) => (
              <div key={index} className={`flex items-center px-3 py-1 rounded-full ${feature.color}`}>
                <feature.icon size={16} className="mr-2" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
          <textarea
            value={dreamDescription}
            onChange={(e) => setDreamDescription(e.target.value)}
            placeholder="Start describing your dream event here..."
            className="w-full p-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows="5"
          />
          <div className="mt-3 text-left text-xs text-gray-400">
            <p className="font-medium mb-1">Need inspiration? Consider describing:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>The atmosphere and mood you want to create</li>
              <li>Any specific themes or color schemes</li>
              <li>Special activities or entertainment</li>
              <li>Unique venue features or location preferences</li>
              <li>Catering ideas or special menu requests</li>
            </ul>
          </div>
          <div className="relative mt-4">
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-lg hover:from-green-500 hover:to-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center space-x-2 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
            >
              <Sparkles className="w-5 h-5" />
              <span>Transform Dream into Reality</span>
              <Rocket className="w-5 h-5" />
            </button>
            {isAnimating && <div className="loading-bar"></div>}
          </div>
        </form>
      </div>
    </motion.div>
  )
}
