import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'

export default function PhoneSignup({ onSubmit, initialData, userSelections }) {
  const [phoneNumber, setPhoneNumber] = useState(initialData || '')

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(phoneNumber);
  };

  const formatPhoneNumber = (value) => {
    const phone = value.replace(/[^\d]/g, '');
    if (phone.length < 4) return phone;
    if (phone.length < 7) return `${phone.slice(0, 3)}-${phone.slice(3)}`;
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
  };

  return (
    <div className="min-h-[40vh] flex items-center justify-center p-4">
      <div className="rounded-3xl shadow-2xl max-w-md w-full p-8 space-y-6 border-4 border-transparent bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 bg-clip-padding">
        <div className="bg-white rounded-2xl p-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Event</h2>
            <p className="text-gray-600">Enter your phone number to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your phone number
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  +1
                </span>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(555) 555-5555"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
            >
              Continue
              <ChevronRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
          </form>
          
          <p className="text-xs text-center text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
