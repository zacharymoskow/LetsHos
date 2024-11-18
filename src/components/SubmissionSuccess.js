import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, Users, DollarSign, Star, Phone, Image, Mail, Clock } from 'lucide-react';

const humanReadable = (value) => {
  if (!value) return 'Not specified';
  if (typeof value === 'string' && value.includes('hour')) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function SubmissionSuccess({ eventDetails, onBackToHome }) {
  console.log('Event Details:', eventDetails);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto text-center"
    >
      <div className="mb-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <Check className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Thank You for Your Submission!</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
        <p className="text-blue-700">
          We've received your event details. Our team will review them and get back to you within 24-48 hours with personalized recommendations.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2">
          <h3 className="text-xl font-semibold text-white">Your Event Summary</h3>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start">
            <Star className="w-5 h-5 mr-2 text-indigo-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <span className="font-semibold text-gray-700">Occasion:</span>
              <p className="text-gray-600">{humanReadable(eventDetails.setScene.occasion)}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Calendar className="w-5 h-5 mr-2 text-indigo-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <span className="font-semibold text-gray-700">Activity:</span>
              <p className="text-gray-600">{humanReadable(eventDetails.setScene.activity)}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Users className="w-5 h-5 mr-2 text-indigo-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <span className="font-semibold text-gray-700">Guest Count:</span>
              <p className="text-gray-600">{humanReadable(eventDetails.setScene.guestCount)}</p>
            </div>
          </div>
          <div className="flex items-start">
            <DollarSign className="w-5 h-5 mr-2 text-indigo-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <span className="font-semibold text-gray-700">Budget:</span>
              <p className="text-gray-600">{humanReadable(eventDetails.setScene.budget)}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Calendar className="w-5 h-5 mr-2 text-indigo-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <span className="font-semibold text-gray-700">Date:</span>
              <p className="text-gray-600">{humanReadable(eventDetails.setScene.date)}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="w-5 h-5 mr-2 text-indigo-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <span className="font-semibold text-gray-700">Start Time:</span>
              <p className="text-gray-600">{humanReadable(eventDetails.setScene.startTime)}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="w-5 h-5 mr-2 text-indigo-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <span className="font-semibold text-gray-700">Duration:</span>
              <p className="text-gray-600">{humanReadable(eventDetails.setScene.duration)} hours</p>
            </div>
          </div>
          <div className="flex items-start">
            <Image className="w-5 h-5 mr-2 text-indigo-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <span className="font-semibold text-gray-700">Inspiration:</span>
              <p className="text-gray-600">
                {eventDetails.inspiration.selectedTheme ? eventDetails.inspiration.selectedTheme.name : 
                 eventDetails.inspiration.uploadedPhoto ? 'Custom photo uploaded' : 'Not provided'}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Phone className="w-5 h-5 mr-2 text-indigo-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <span className="font-semibold text-gray-700">Contact Number:</span>
              <p className="text-gray-600">{eventDetails.phone || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Need to Make Changes?</h3>
        <div className="flex items-center space-x-2 text-gray-600">
          <Mail className="w-5 h-5 text-indigo-500" />
          <p className="text-sm">
            Email us at <a href="mailto:changes@letshost.com" className="text-indigo-600 hover:underline">changes@letshost.com</a>
          </p>
        </div>
      </div>
      
      <button 
        onClick={onBackToHome}
        className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out"
      >
        Back to Home
      </button>
    </motion.div>
  );
}
