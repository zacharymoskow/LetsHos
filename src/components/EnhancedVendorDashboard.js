import React, { useState, useMemo } from 'react'
import { Bell, Calendar, DollarSign, Users, Eye, MessageCircle, XCircle, ChevronUp, ChevronDown, Search, Menu, MapPin, Clock, Send, Plus, Star, Check, Info, Tag, Activity, Filter } from 'lucide-react'

export default function EnhancedVendorDashboard() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Summer Wedding",
      date: "2023-08-15",
      startTime: "16:00",
      endTime: "23:00",
      budget: { min: 5000, max: 7000 },
      guestCount: { min: 50, max: 100 },
      location: "Beachside Resort, Miami",
      daysLeft: 5,
      specialRequirements: "Catering Required",
      inspirationImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      eventType: "Wedding",
      activity: "Not specified",
      status: "Pending",
      description: "Beachfront wedding ceremony followed by a reception under the stars. Looking for full-service catering, floral arrangements, and a live band."
    },
    {
      id: 2,
      name: "Corporate Gala",
      date: "2023-09-22",
      budget: { min: 10000, max: 15000 },
      guestCount: { min: 100, max: 250 },
      location: "Downtown Convention Center, New York",
      daysLeft: 2,
      specialRequirements: "AV Equipment Needed",
      inspirationImage: "https://images.unsplash.com/photo-1497366811353-661eb04b3739?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Birthday Bash",
      date: "2023-07-30",
      budget: { min: 2000, max: 3000 },
      guestCount: { min: 20, max: 50 },
      location: "Central Park, New York",
      daysLeft: 10,
      specialRequirements: "DJ Needed",
      inspirationImage: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80"
    },
  ]);

  const [activeProposals, setActiveProposals] = useState([
    {
      id: 1,
      eventName: "Summer Wedding",
      hostName: "Emily Johnson",
      date: "2023-08-15",
      price: 6000,
      status: "Pending",
      details: "Full-service catering for 100 guests",
      inspirationImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      eventName: "Corporate Gala",
      hostName: "TechCorp Inc.",
      date: "2023-09-22",
      price: 12000,
      status: "Accepted",
      details: "Full event planning and execution for 200 guests",
      inspirationImage: "https://images.unsplash.com/photo-1497366811353-661eb04b3739?auto=format&fit=crop&w=600&q=80"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewOpportunities, setShowNewOpportunities] = useState(true);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [expandedProposalId, setExpandedProposalId] = useState(null);
  const [proposalForm, setProposalForm] = useState({ 
    eventId: null, 
    price: '', 
    capacity: '',
    details: '' 
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState({
    eventType: '',
    budget: '',
    guestCount: '',
  });

  const [proposalSortConfig, setProposalSortConfig] = useState({ key: null, direction: 'ascending' });
  const [proposalFilters, setProposalFilters] = useState({
    status: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleProposalSort = (key) => {
    let direction = 'ascending';
    if (proposalSortConfig.key === key && proposalSortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setProposalSortConfig({ key, direction });
  };

  const filteredAndSortedEvents = useMemo(() => {
    let filteredEvents = events.filter(event => 
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.eventType === '' || event.eventType === filters.eventType) &&
      (filters.budget === '' || (
        filters.budget === '0-1000' && event.budget.max <= 1000 ||
        filters.budget === '1000-2500' && event.budget.min >= 1000 && event.budget.max <= 2500 ||
        filters.budget === '2500-5000' && event.budget.min >= 2500 && event.budget.max <= 5000 ||
        filters.budget === '5000-7500' && event.budget.min >= 5000 && event.budget.max <= 7500 ||
        filters.budget === '7500-10000' && event.budget.min >= 7500 && event.budget.max <= 10000 ||
        filters.budget === '10000+' && event.budget.min >= 10000
      )) &&
      (filters.guestCount === '' || (
        filters.guestCount === '0-50' && event.guestCount.max <= 50 ||
        filters.guestCount === '51-100' && event.guestCount.min >= 51 && event.guestCount.max <= 100 ||
        filters.guestCount === '101-200' && event.guestCount.min >= 101 && event.guestCount.max <= 200 ||
        filters.guestCount === '201+' && event.guestCount.min >= 201
      ))
    );

    if (sortConfig.key !== null) {
      filteredEvents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return filteredEvents;
  }, [events, searchTerm, filters, sortConfig]);

  const filteredAndSortedProposals = useMemo(() => {
    let filteredProposals = activeProposals.filter(proposal => 
      (proposalFilters.status === '' || proposal.status === proposalFilters.status) &&
      (proposalFilters.minPrice === '' || proposal.price >= Number(proposalFilters.minPrice)) &&
      (proposalFilters.maxPrice === '' || proposal.price <= Number(proposalFilters.maxPrice))
    );

    if (proposalSortConfig.key !== null) {
      filteredProposals.sort((a, b) => {
        if (a[proposalSortConfig.key] < b[proposalSortConfig.key]) return proposalSortConfig.direction === 'ascending' ? -1 : 1;
        if (a[proposalSortConfig.key] > b[proposalSortConfig.key]) return proposalSortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return filteredProposals;
  }, [activeProposals, proposalFilters, proposalSortConfig]);

  const toggleEventDetails = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  const toggleProposalDetails = (id) => {
    setExpandedProposalId(expandedProposalId === id ? null : id);
  };

  const handleProposalSubmit = (eventId) => {
    // Here you would typically send this data to your backend
    console.log('Submitting proposal for event', eventId, proposalForm);
    // Reset form after submission
    setProposalForm({ eventId: null, price: '', details: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Vendor Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Opportunities</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search events..."
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={filters.eventType}
                onChange={(e) => setFilters({...filters, eventType: e.target.value})}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Event Types</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate</option>
                <option value="Birthday">Birthday</option>
                <option value="Other">Other</option>
              </select>
              <select
                value={filters.budget}
                onChange={(e) => setFilters({...filters, budget: e.target.value})}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Budgets</option>
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000+">$10,000+</option>
              </select>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              onClick={() => setShowNewOpportunities(!showNewOpportunities)}
            >
              {showNewOpportunities ? 'Hide Opportunities' : 'Show Opportunities'}
            </button>
          </div>
          {showNewOpportunities && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposals</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedEvents.map((event) => (
                    <React.Fragment key={event.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">{event.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">{event.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">{event.startTime} - {event.endTime}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">{event.proposalsReceived} received</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            event.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                          <button 
                            onClick={() => toggleEventDetails(event.id)} 
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 hover:bg-blue-200 transition-colors duration-300"
                          >
                            {expandedEventId === event.id ? 'Hide Details' : 'View Details'}
                          </button>
                          <button 
                            onClick={() => setProposalForm({ ...proposalForm, eventId: event.id })} 
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors duration-300"
                          >
                            Submit Proposal
                          </button>
                        </td>
                      </tr>
                      {expandedEventId === event.id && (
                        <tr>
                          <td colSpan="7" className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Date & Time
                                </h4>
                                <p className="text-sm text-gray-600">{event.date}, {event.startTime} - {event.endTime}</p>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  Location
                                </h4>
                                <p className="text-sm text-gray-600">{event.location}</p>
                              </div>
                              <div className="bg-yellow-50 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center">
                                  <Users className="w-4 h-4 mr-2" />
                                  Guests
                                </h4>
                                <p className="text-sm text-gray-600">{event.guestCount.min} - {event.guestCount.max}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white p-4 rounded-lg border">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Event Details</h4>
                                <ul className="space-y-2">
                                  <li className="flex items-center text-sm text-gray-600">
                                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                                    Budget: ${event.budget.min} - ${event.budget.max}
                                  </li>
                                  <li className="flex items-center text-sm text-gray-600">
                                    <Tag className="w-4 h-4 mr-2 text-blue-500" />
                                    Event Type: {event.eventType || 'Not specified'}
                                  </li>
                                  <li className="flex items-center text-sm text-gray-600">
                                    <Activity className="w-4 h-4 mr-2 text-purple-500" />
                                    Activity: {event.activity || 'Not specified'}
                                  </li>
                                  <li className="flex items-center text-sm text-gray-600">
                                    <Clock className="w-4 h-4 mr-2 text-orange-500" />
                                    Status: {event.status || 'Pending'}
                                  </li>
                                </ul>
                              </div>
                              <div className="bg-white p-4 rounded-lg border">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Description</h4>
                                <p className="text-sm text-gray-600">{event.description || 'No description provided.'}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                      {proposalForm.eventId === event.id && (
                        <tr>
                          <td colSpan="7" className="px-6 py-4">
                            <div className="bg-white shadow rounded-lg p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-4">Submit Proposal for {event.name}</h3>
                              <form onSubmit={(e) => { e.preventDefault(); handleProposalSubmit(event.id); }} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Details</label>
                                    <textarea
                                      placeholder="Describe your services and why you're a great fit for this event..."
                                      value={proposalForm.details}
                                      onChange={(e) => setProposalForm({ ...proposalForm, details: e.target.value })}
                                      className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                                      rows="5"
                                    ></textarea>
                                  </div>
                                  <div className="space-y-6">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                                      <input
                                        type="number"
                                        placeholder="Maximum number of guests you can accommodate"
                                        value={proposalForm.capacity}
                                        onChange={(e) => setProposalForm({ ...proposalForm, capacity: e.target.value })}
                                        className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD)</label>
                                      <input
                                        type="number"
                                        placeholder="Your proposed price for the event"
                                        value={proposalForm.price}
                                        onChange={(e) => setProposalForm({ ...proposalForm, price: e.target.value })}
                                        className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end mt-8">
                                  <button
                                    type="submit"
                                    className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 shadow-md"
                                  >
                                    Submit Proposal
                                  </button>
                                </div>
                              </form>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Active Proposals</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedProposals.map((proposal) => (
                  <React.Fragment key={proposal.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">{proposal.eventName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">{proposal.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">{proposal.startTime} - {proposal.endTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">${proposal.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          proposal.status === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {proposal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button 
                          onClick={() => toggleProposalDetails(proposal.id)} 
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition-colors duration-300"
                        >
                          {expandedProposalId === proposal.id ? 'Hide Details' : 'View Details'}
                        </button>
                      </td>
                    </tr>
                    {expandedProposalId === proposal.id && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Date & Time
                              </h4>
                              <p className="text-sm text-gray-600">{proposal.date}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                                <Users className="w-4 h-4 mr-2" />
                                Host
                              </h4>
                              <p className="text-sm text-gray-600">{proposal.hostName}</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                              <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center">
                                <DollarSign className="w-4 h-4 mr-2" />
                                Price
                              </h4>
                              <p className="text-sm text-gray-600">${proposal.price}</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border">
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Proposal Details</h4>
                            <p className="text-sm text-gray-600">{proposal.details}</p>
                          </div>
                          <div className="mt-4">
                            <img src={proposal.inspirationImage} alt="Inspiration" className="w-full max-w-xs h-auto rounded-lg shadow-md" />
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
