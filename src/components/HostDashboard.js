import React, { useState } from 'react'
import { Calendar, Search, Bell, Info, FileText } from 'lucide-react'
import ProposalReview from './ProposalReview'
import EventDetails from './EventDetails'
import { format } from 'date-fns';

const initialEvents = [
  { 
    id: 1, 
    name: 'Summer Wedding', 
    startDate: '2023-08-15', 
    endDate: '2023-08-15', 
    startTime: '16:00', 
    endTime: '23:00', 
    proposalsReceived: 3, 
    status: 'Pending', 
    occasion: 'Wedding', 
    eventType: 'Social',
    location: 'Sunset Beach Resort, 123 Coastal Hwy, Miami, FL',
    guestCount: '150',
    budget: 25000,
    description: 'Beachfront wedding ceremony followed by a reception under the stars. Looking for full-service catering, floral arrangements, and a live band.'
  },
  { 
    id: 2, 
    name: 'Annual Tech Conference', 
    startDate: '2023-10-05', 
    endDate: '2023-10-07', 
    startTime: '09:00', 
    endTime: '18:00', 
    proposalsReceived: 4, 
    status: 'Confirmed', 
    occasion: 'Conference', 
    eventType: 'Corporate',
    location: 'Silicon Valley Convention Center, 789 Innovation Blvd, San Jose, CA',
    guestCount: '500',
    budget: 100000,
    description: 'Three-day tech conference with keynote speakers, breakout sessions, and networking events. Requires AV equipment, catering for all meals, and event app development.'
  },
  { 
    id: 3, 
    name: '30th Birthday Bash', 
    startDate: '2023-09-22', 
    endDate: '2023-09-23', 
    startTime: '20:00', 
    endTime: '02:00', 
    proposalsReceived: 2, 
    status: 'Pending', 
    occasion: 'Birthday', 
    eventType: 'Social',
    location: 'Skyline Lounge, 456 High St, New York, NY',
    guestCount: '75',
    budget: 8000,
    description: 'Rooftop party with city views. Seeking a DJ, finger foods catering, and themed decorations for a "Night Under the Stars" concept.'
  },
]

const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  return format(new Date(2000, 0, 1, hours, minutes), 'h:mm a');
};

export default function HostDashboard() {
  const [events] = useState(initialEvents)
  const [activeEvent, setActiveEvent] = useState(null)
  const [activeEventDetails, setActiveEventDetails] = useState(null)
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEventSelect = (eventId) => {
    setActiveEvent(activeEvent === eventId ? null : eventId)
    setActiveEventDetails(null) // Close event details when opening proposals
  }

  const handleEventDetails = (eventId) => {
    setActiveEventDetails(activeEventDetails === eventId ? null : eventId)
    setActiveEvent(null) // Close proposals when opening event details
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex flex-col sm:flex-row items-center mb-8 mt-4">
        <Calendar className="w-10 h-10 text-indigo-600 mr-2" />
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mt-2 sm:mt-0">Host Dashboard</h1>
      </div>

      <div className="mb-8 text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">My Events</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full px-4 py-2 border rounded-md pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <button className="p-2 bg-white border rounded-md">
              <Bell className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-sm font-medium w-full sm:w-auto"
            onClick={() => {/* ... existing onClick handler ... */}}
          >
            Create New Event
          </button>
        </div>
      </div>

      {/* Mobile view (card layout) */}
      <div className="md:hidden space-y-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white shadow rounded-lg p-4 mx-auto max-w-sm">
            <h3 className="font-bold text-lg mb-2">{event.name}</h3>
            <p className="text-sm text-gray-600 mb-1">Date: {event.startDate}</p>
            <p className="text-sm text-gray-600 mb-1">Time: {formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
            <p className="text-sm text-gray-600 mb-2">Proposals: {event.proposalsReceived} received</p>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                event.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {event.status}
              </span>
              <div className="flex space-x-2">
                <button 
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-2 py-1 rounded text-xs flex items-center"
                  onClick={() => handleEventDetails(event.id)}
                >
                  <Info className="w-3 h-3 mr-1" />
                  Details
                </button>
                <button 
                  className="bg-green-100 text-green-800 hover:bg-green-200 px-2 py-1 rounded text-xs flex items-center"
                  onClick={() => handleEventSelect(event.id)}
                >
                  <FileText className="w-3 h-3 mr-1" />
                  Proposals
                </button>
              </div>
            </div>
            {activeEventDetails === event.id && (
              <div className="mt-4 border-t pt-4">
                <EventDetails event={event} />
              </div>
            )}
            {activeEvent === event.id && (
              <div className="mt-4 border-t pt-4">
                <ProposalReview eventName={event.name} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop view (table layout) */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposals</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEvents.map((event) => (
              <React.Fragment key={event.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{event.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{event.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{formatTime(event.startTime)} - {formatTime(event.endTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">{event.proposalsReceived} received</td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      event.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    <div className="flex space-x-2">
                      <button 
                        className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-2 py-1 rounded text-xs flex items-center"
                        onClick={() => handleEventDetails(event.id)}
                      >
                        <Info className="w-3 h-3 mr-1" />
                        Details
                      </button>
                      <button 
                        className="bg-green-100 text-green-800 hover:bg-green-200 px-2 py-1 rounded text-xs flex items-center"
                        onClick={() => handleEventSelect(event.id)}
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Proposals
                      </button>
                    </div>
                  </td>
                </tr>
                {activeEventDetails === event.id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4">
                      <EventDetails event={event} />
                    </td>
                  </tr>
                )}
                {activeEvent === event.id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4">
                      <ProposalReview eventName={event.name} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
