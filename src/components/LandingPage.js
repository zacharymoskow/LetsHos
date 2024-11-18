import React, { useState } from 'react'
import EventSearch from './EventSearch'
import DreamDescription from './DreamDescription'
import InspirationUpload from './InspirationUpload'
import PhoneSignup from './PhoneSignup'
import SubmissionSuccess from './SubmissionSuccess'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'

export default function LandingPage() {
  const [step, setStep] = useState('setScene')
  const [eventDetails, setEventDetails] = useState({
    setScene: {
      occasion: '',
      eventType: '',
      activity: '',
      guestCount: '',
      budget: '',
      date: '',
      startTime: '',
      duration: ''
    },
    dream: '',
    inspiration: { selectedTheme: null, uploadedPhoto: null },
    phone: ''
  })

  const handleSetSceneSubmit = (details) => {
    setEventDetails(prev => ({ ...prev, setScene: details }))
    setStep('dream')
  }

  const handleDreamSubmit = (dreamDescription) => {
    setEventDetails(prev => ({ ...prev, dream: dreamDescription }))
    setStep('inspiration')
  }

  const handleInspirationSubmit = (inspiration) => {
    setEventDetails(prev => ({ ...prev, inspiration }))
    setStep('phone')
  }

  const handlePhoneSubmit = (phoneNumber) => {
    setEventDetails(prev => ({ ...prev, phone: phoneNumber }))
    setStep('success')
  }

  const handleBack = () => {
    switch(step) {
      case 'dream':
        setStep('setScene')
        break
      case 'inspiration':
        setStep('dream')
        break
      case 'phone':
        setStep('inspiration')
        break
      case 'success':
        setStep('phone')
        break
      default:
        break
    }
  }

  const handleBackToHome = () => {
    // Reset the form and go back to the first step
    setEventDetails({
      setScene: {
        occasion: '',
        eventType: '',
        activity: '',
        guestCount: '',
        budget: '',
        date: '',
        startTime: '',
        duration: ''
      },
      dream: '',
      inspiration: { selectedTheme: null, uploadedPhoto: null },
      phone: ''
    })
    setStep('setScene')
  }

  const getMainClassName = () => {
    if (step === 'success') {
      return "px-4 sm:px-6 lg:px-8 text-center";
    }
    return "px-4 sm:px-6 lg:px-8 mt-8 sm:mt-16 text-center";
  };

  return (
    <main className={`${getMainClassName()} max-w-7xl mx-auto`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={step === 'success' ? 'pt-4' : ''} // Added small top padding only for success step
      >
        {step !== 'setScene' && step !== 'success' && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={24} />
            <span className="hidden sm:inline">Back</span>
          </button>
        )}
        
        {step === 'setScene' && (
          <EventSearch onSubmit={handleSetSceneSubmit} initialData={eventDetails.setScene} />
        )}
        {step === 'dream' && <DreamDescription onSubmit={handleDreamSubmit} initialData={eventDetails.dream} />}
        {step === 'inspiration' && <InspirationUpload onSubmit={handleInspirationSubmit} initialData={eventDetails.inspiration} />}
        {step === 'phone' && <PhoneSignup onSubmit={handlePhoneSubmit} initialData={eventDetails.phone} userSelections={eventDetails} />}
        {step === 'success' && (
          <SubmissionSuccess 
            eventDetails={eventDetails} 
            onBackToHome={handleBackToHome} 
          />
        )}
      </motion.div>
    </main>
  )
}
