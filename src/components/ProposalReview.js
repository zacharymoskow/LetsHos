import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, Info, Check, Star, Filter, ChevronDown, ChevronUp, Plus, X } from 'lucide-react'

const proposals = [
  { 
    id: 1, 
    vendorName: 'Party Planners Plus', 
    serviceDetails: 'Full event planning and coordination', 
    price: 1800, 
    capacity: 150, 
    availability: 'Available', 
    rating: 4.8,
    eventType: 'Wedding',
    location: 'New York',
    startTime: '14:00',
    endTime: '22:00'
  },
  { 
    id: 2, 
    vendorName: 'Gourmet Caterers', 
    serviceDetails: 'Catering for all dietary needs', 
    price: 2500, 
    capacity: 200, 
    availability: 'Available', 
    rating: 4.5,
    eventType: 'Corporate',
    location: 'Los Angeles',
    startTime: '12:00',
    endTime: '20:00'
  },
  { 
    id: 3, 
    vendorName: 'Decor Dreams', 
    serviceDetails: 'Custom event decorations', 
    price: 1200, 
    capacity: 100, 
    availability: 'Limited', 
    rating: 4.7,
    eventType: 'Birthday',
    location: 'Chicago',
    startTime: '18:00',
    endTime: '23:00'
  },
  { 
    id: 4, 
    vendorName: 'Sound Masters', 
    serviceDetails: 'Professional DJ and sound equipment', 
    price: 800, 
    capacity: 300, 
    availability: 'Available', 
    rating: 4.6,
    eventType: 'Corporate',
    location: 'Houston',
    startTime: '19:00',
    endTime: '01:00'
  },
  { 
    id: 5, 
    vendorName: 'Elegant Venues', 
    serviceDetails: 'Luxury event spaces', 
    price: 3000, 
    capacity: 250, 
    availability: 'Limited', 
    rating: 4.9,
    eventType: 'Wedding',
    location: 'Miami',
    startTime: '16:00',
    endTime: '00:00'
  },
]

export default function ProposalReview({ eventName }) {
  const [selectedColumns, setSelectedColumns] = useState(['vendorName', 'price', 'capacity', 'availability', 'actions'])
  const [expandedRows, setExpandedRows] = useState({})
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    capacity: [0, 300],
    minRating: 0,
    eventType: [],
    availability: [],
    location: '',
    startTime: '',
    endTime: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [showColumns, setShowColumns] = useState(false)
  const [openSections, setOpenSections] = useState({
    priceRange: true,
    capacity: false,
    rating: false,
    eventType: false,
    availability: false,
    location: false,
    time: false
  })
  const filtersRef = useRef(null)
  const columnsRef = useRef(null)
  const [showColumnLimit, setShowColumnLimit] = useState(false)
  const [activeEventDetails, setActiveEventDetails] = useState(null)

  const defaultFilters = {
    priceRange: [0, 5000],
    capacity: [0, 300],
    minRating: 0,
    eventType: [],
    availability: [],
    location: '',
    startTime: '',
    endTime: ''
  };

  const [isFilterActive, setIsFilterActive] = useState(false);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  const toggleColumn = (columnName) => {
    if (columnName === 'vendorName' || columnName === 'actions') return; // Prevent toggling Vendor and Actions columns
    setSelectedColumns(prev => {
      if (prev.includes(columnName)) {
        return prev.filter(col => col !== columnName && col !== 'actions').concat(['actions'])
      } else if (prev.length < 8) {
        return [...prev.filter(col => col !== 'actions'), columnName, 'actions']
      } else {
        setShowColumnLimit(true)
        setTimeout(() => setShowColumnLimit(false), 3000) // Hide message after 3 seconds
        return prev
      }
    })
  }

  const toggleRowExpansion = (proposalId) => {
    setExpandedRows(prev => ({
      ...prev,
      [proposalId]: !prev[proposalId]
    }))
  }

  const unselectAllColumns = () => {
    setSelectedColumns(['vendorName', 'actions']) // Always keep 'vendorName' and 'actions' selected
  }

  const allColumns = [
    { key: 'vendorName', label: 'Vendor' },
    { key: 'price', label: 'Price' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'availability', label: 'Availability' },
    { key: 'rating', label: 'Rating' },
    { key: 'eventType', label: 'Event Type' },
    { key: 'location', label: 'Location' },
    { key: 'startTime', label: 'Start Time' },
    { key: 'endTime', label: 'End Time' },
    { key: 'actions', label: 'Actions' }
  ]

  const handleRangeChange = (filterName, index, value) => {
    setFilters(prev => {
      const newRange = [...prev[filterName]]
      newRange[index] = parseInt(value)
      return { ...prev, [filterName]: newRange.sort((a, b) => a - b) }
    })
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false)
      }
      if (columnsRef.current && !columnsRef.current.contains(event.target)) {
        setShowColumns(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMessage = (proposalId) => {
    console.log(`Messaging vendor for proposal ${proposalId}`)
  }

  const handleConfirm = (proposalId) => {
    console.log(`Confirming proposal ${proposalId}`)
  }

  const filteredProposals = proposals.filter(proposal => {
    return (
      proposal.price >= filters.priceRange[0] &&
      proposal.price <= filters.priceRange[1] &&
      proposal.capacity >= filters.capacity[0] &&
      proposal.capacity <= filters.capacity[1] &&
      proposal.rating >= filters.minRating &&
      (filters.eventType.length === 0 || filters.eventType.includes(proposal.eventType)) &&
      (filters.availability.length === 0 || filters.availability.includes(proposal.availability)) &&
      (filters.location === '' || proposal.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.startTime === '' || proposal.startTime >= filters.startTime) &&
      (filters.endTime === '' || proposal.endTime <= filters.endTime)
    );
  });

  const clearAllFilters = () => {
    setFilters(defaultFilters);
  };

  useEffect(() => {
    const hasActiveFilter = Object.keys(filters).some(key => {
      if (Array.isArray(filters[key])) {
        return JSON.stringify(filters[key]) !== JSON.stringify(defaultFilters[key]);
      }
      return filters[key] !== defaultFilters[key];
    });
    setIsFilterActive(hasActiveFilter);
  }, [filters]);

  return (
    <div className="bg-white p-6 rounded-lg shadow relative">
      <h2 className="text-2xl font-bold mb-2">{eventName} - Proposal Review</h2>
      <p className="text-gray-600 mb-4">Compare and select vendor proposals for your event</p>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <div className="relative" ref={filtersRef}>
            <button 
              className="flex items-center px-4 py-2 bg-white border rounded-md text-sm font-medium"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            {showFilters && (
              <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="p-4 space-y-4">
                  <FilterSection 
                    title="Price Range" 
                    isOpen={openSections.priceRange} 
                    toggleOpen={() => toggleSection('priceRange')}
                  >
                    <div className="relative pt-2 pb-6 mt-4">
                      <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 rounded"></div>
                      <div 
                        className="absolute left-0 right-0 top-1/2 h-1 bg-blue-500 rounded" 
                        style={{
                          left: `${(filters.priceRange[0] / 5000) * 100}%`,
                          right: `${100 - (filters.priceRange[1] / 5000) * 100}%`
                        }}
                      ></div>
                      <input 
                        type="range" 
                        min="0" 
                        max="5000" 
                        value={filters.priceRange[0]} 
                        onChange={(e) => handleRangeChange('priceRange', 0, e.target.value)}
                        className="absolute top-1/2 left-0 w-full -mt-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow"
                      />
                      <input 
                        type="range" 
                        min="0" 
                        max="5000" 
                        value={filters.priceRange[1]} 
                        onChange={(e) => handleRangeChange('priceRange', 1, e.target.value)}
                        className="absolute top-1/2 left-0 w-full -mt-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow"
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <input 
                        type="number" 
                        value={filters.priceRange[0]} 
                        onChange={(e) => handleRangeChange('priceRange', 0, e.target.value)}
                        className="w-20 p-1 border rounded text-sm"
                      />
                      <input 
                        type="number" 
                        value={filters.priceRange[1]} 
                        onChange={(e) => handleRangeChange('priceRange', 1, e.target.value)}
                        className="w-20 p-1 border rounded text-sm"
                      />
                    </div>
                  </FilterSection>

                  <FilterSection 
                    title="Capacity" 
                    isOpen={openSections.capacity} 
                    toggleOpen={() => toggleSection('capacity')}
                  >
                    <div className="relative pt-2 pb-6 mt-4">
                      <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 rounded"></div>
                      <div 
                        className="absolute left-0 right-0 top-1/2 h-1 bg-blue-500 rounded" 
                        style={{
                          left: `${(filters.capacity[0] / 300) * 100}%`,
                          right: `${100 - (filters.capacity[1] / 300) * 100}%`
                        }}
                      ></div>
                      <input 
                        type="range" 
                        min="0" 
                        max="300" 
                        value={filters.capacity[0]} 
                        onChange={(e) => handleRangeChange('capacity', 0, e.target.value)}
                        className="absolute top-1/2 left-0 w-full -mt-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow"
                      />
                      <input 
                        type="range" 
                        min="0" 
                        max="300" 
                        value={filters.capacity[1]} 
                        onChange={(e) => handleRangeChange('capacity', 1, e.target.value)}
                        className="absolute top-1/2 left-0 w-full -mt-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow"
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <input 
                        type="number" 
                        value={filters.capacity[0]} 
                        onChange={(e) => handleRangeChange('capacity', 0, e.target.value)}
                        className="w-20 p-1 border rounded text-sm"
                      />
                      <input 
                        type="number" 
                        value={filters.capacity[1]} 
                        onChange={(e) => handleRangeChange('capacity', 1, e.target.value)}
                        className="w-20 p-1 border rounded text-sm"
                      />
                    </div>
                  </FilterSection>

                  <FilterSection 
                    title="Minimum Rating" 
                    isOpen={openSections.rating} 
                    toggleOpen={() => toggleSection('rating')}
                  >
                    <select 
                      value={filters.minRating} 
                      onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                      className="w-full p-2 border rounded bg-white"
                    >
                      {[0, 1, 2, 3, 4, 5].map(rating => (
                        <option key={rating} value={rating}>{rating} Stars</option>
                      ))}
                    </select>
                  </FilterSection>

                  <FilterSection 
                    title="Event Type" 
                    isOpen={openSections.eventType} 
                    toggleOpen={() => toggleSection('eventType')}
                  >
                    {['Wedding', 'Corporate', 'Birthday'].map(type => (
                      <label key={type} className="flex items-center mt-2">
                        <input 
                          type="checkbox" 
                          checked={filters.eventType.includes(type)}
                          onChange={() => {
                            const newEventTypes = filters.eventType.includes(type)
                              ? filters.eventType.filter(t => t !== type)
                              : [...filters.eventType, type]
                            handleFilterChange('eventType', newEventTypes)
                          }}
                          className="mr-2"
                        />
                        {type}
                      </label>
                    ))}
                  </FilterSection>

                  <FilterSection 
                    title="Availability" 
                    isOpen={openSections.availability} 
                    toggleOpen={() => toggleSection('availability')}
                  >
                    {['Available', 'Limited'].map(availability => (
                      <label key={availability} className="flex items-center mt-2">
                        <input 
                          type="checkbox" 
                          checked={filters.availability.includes(availability)}
                          onChange={() => {
                            const newAvailability = filters.availability.includes(availability)
                              ? filters.availability.filter(a => a !== availability)
                              : [...filters.availability, availability]
                            handleFilterChange('availability', newAvailability)
                          }}
                          className="mr-2"
                        />
                        {availability}
                      </label>
                    ))}
                  </FilterSection>

                  <FilterSection 
                    title="Location" 
                    isOpen={openSections.location} 
                    toggleOpen={() => toggleSection('location')}
                  >
                    <input 
                      type="text" 
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      placeholder="Enter location"
                      className="w-full p-2 border rounded"
                    />
                  </FilterSection>

                  <FilterSection 
                    title="Time" 
                    isOpen={openSections.time} 
                    toggleOpen={() => toggleSection('time')}
                  >
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Start Time</h4>
                        <input 
                          type="time" 
                          value={filters.startTime}
                          onChange={(e) => handleFilterChange('startTime', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">End Time</h4>
                        <input 
                          type="time" 
                          value={filters.endTime}
                          onChange={(e) => handleFilterChange('endTime', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  </FilterSection>
                </div>
              </div>
            )}
          </div>
          {isFilterActive && (
            <button 
              className="flex items-center px-4 py-2 bg-white border rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
              onClick={clearAllFilters}
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          )}
        </div>
        <div className="relative" ref={columnsRef}>
          <button 
            className="flex items-center px-4 py-2 bg-white border rounded-md text-sm font-medium"
            onClick={() => setShowColumns(!showColumns)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Columns
          </button>
          {showColumns && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="p-4 space-y-2">
                <button
                  onClick={unselectAllColumns}
                  className="flex items-center justify-between w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  Unselect All
                  <X className="w-4 h-4" />
                </button>
                <div className="border-t border-gray-200 my-2"></div>
                {allColumns.map((column) => (
                  <label 
                    key={column.key} 
                    className={`flex items-center py-1 ${column.key === 'vendorName' || column.key === 'actions' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(column.key)}
                      onChange={() => toggleColumn(column.key)}
                      disabled={column.key === 'vendorName' || column.key === 'actions'}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium">{column.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showColumnLimit && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Column Limit Reached</p>
          <p>A maximum of 8 columns can be added.</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col min-w-full">
          <div className="flex border-b">
            {selectedColumns.map(columnKey => {
              const column = allColumns.find(col => col.key === columnKey)
              return (
                <div key={columnKey} className="flex-1 p-2 font-semibold text-left min-w-[150px]">
                  {column.label}
                </div>
              )
            })}
          </div>
          {filteredProposals.map((proposal) => (
            <React.Fragment key={proposal.id}>
              <div className="flex border-b">
                {selectedColumns.map(columnKey => (
                  <div key={columnKey} className="flex-1 p-2 text-left min-w-[150px]">
                    {renderCellContent(
                      proposal, 
                      columnKey, 
                      () => toggleRowExpansion(proposal.id),
                      () => handleMessage(proposal.id),
                      () => handleConfirm(proposal.id)
                    )}
                  </div>
                ))}
              </div>
              {expandedRows[proposal.id] && (
                <div className="bg-gray-50 p-4 border-b">
                  <h4 className="font-semibold mb-2">Service Details:</h4>
                  <p>{proposal.serviceDetails}</p>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

function renderCellContent(proposal, columnKey, toggleInfo, handleMessage, handleConfirm) {
  switch (columnKey) {
    case 'vendorName':
      return proposal.vendorName
    case 'price':
      return `$${proposal.price}`
    case 'capacity':
      return `${proposal.capacity} guests`
    case 'availability':
      return proposal.availability
    case 'rating':
      return (
        <span className="flex items-center">
          {proposal.rating} <Star className="w-4 h-4 text-yellow-400 ml-1" />
        </span>
      )
    case 'eventType':
      return proposal.eventType
    case 'location':
      return proposal.location
    case 'startTime':
      return proposal.startTime
    case 'endTime':
      return proposal.endTime
    case 'actions':
      return (
        <div className="flex space-x-1">
          <button onClick={handleMessage} className="px-1 py-0.5 bg-gray-100 rounded-md text-xs flex items-center">
            <MessageCircle className="w-3 h-3 mr-0.5" /> Message
          </button>
          <button onClick={toggleInfo} className="px-1 py-0.5 bg-gray-100 rounded-md text-xs flex items-center">
            <Info className="w-3 h-3 mr-0.5" /> Info
          </button>
          <button onClick={handleConfirm} className="px-1 py-0.5 bg-black text-white rounded-md text-xs flex items-center">
            <Check className="w-3 h-3 mr-0.5" /> Confirm
          </button>
        </div>
      )
    default:
      return proposal[columnKey] || 'N/A'
  }
}

function FilterSection({ title, isOpen, toggleOpen, children }) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <button 
        className="flex justify-between items-center w-full text-left font-medium text-base"
        onClick={toggleOpen}
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  )
}
