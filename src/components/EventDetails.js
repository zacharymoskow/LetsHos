import React from 'react'
import { Calendar, MapPin, Users, DollarSign, Tag, Sparkles, Clock } from 'lucide-react'

export default function EventDetails({ event }) {
  console.log('Event details received:', event); // Add this line
  if (!event) return null;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
          <div className="flex items-start space-x-3">
            <Calendar className="text-sky-600 mt-1 flex-shrink-0" size={20} />
            <div className="text-left">
              <h3 className="font-semibold text-sky-800">Date & Time</h3>
              <p className="text-sm text-sky-700">
                {event.startDate}, {event.startTime} - {event.endTime}
              </p>
              {event.endDate !== event.startDate && (
                <p className="text-sm text-sky-700">to {event.endDate}</p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <div className="flex items-start space-x-3">
            <MapPin className="text-emerald-600 mt-1 flex-shrink-0" size={20} />
            <div className="text-left">
              <h3 className="font-semibold text-emerald-800">Location</h3>
              <p className="text-sm text-emerald-700">{event.location}</p>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <div className="flex items-start space-x-3">
            <Users className="text-amber-600 mt-1 flex-shrink-0" size={20} />
            <div className="text-left">
              <h3 className="font-semibold text-amber-800">Guests</h3>
              <p className="text-sm text-amber-700">{event.guestCount}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-left">Event Details</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <DollarSign className="text-green-600 mt-1 flex-shrink-0" size={18} />
              <div>
                <span className="font-semibold text-gray-700">Budget:</span>
                <span className="text-gray-600 ml-1">${event.budget.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Tag className="text-blue-600 mt-1 flex-shrink-0" size={18} />
              <div>
                <span className="font-semibold text-gray-700">Event Type:</span>
                <span className="text-gray-600 ml-1">{event.occasion}</span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="text-purple-600 mt-1 flex-shrink-0" size={18} />
              <div>
                <span className="font-semibold text-gray-700">Activity:</span>
                <span className="text-gray-600 ml-1">{event.activity || 'Not specified'}</span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="text-orange-600 mt-1 flex-shrink-0" size={18} />
              <div>
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="text-gray-600 ml-1">{event.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-left">Description</h2>
          <p className="text-gray-600 text-left">{event.description}</p>
        </div>
      </div>
    </div>
  )
}
