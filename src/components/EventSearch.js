import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  MapPin, 
  Users, 
  Wallet, 
  Calendar, 
  Clock, 
  Wand2, 
  ChevronUp, 
  ChevronDown, 
  Check, 
  X,
  Cake,
  Star,
  Briefcase,
  Tent,
  Sparkles
} from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO } from 'date-fns';

export default function EventSearch({ onSubmit, initialData }) {
  const [page, setPage] = useState('occasion');
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [eventDetails, setEventDetails] = useState(initialData || {
    occasion: "",
    eventType: "",
    activity: "",
    guestCount: "",
    budget: "",
    date: "",
    startTime: "",
    duration: ""
  });
  const [time, setTime] = useState(initialData?.startTime || { hour: '08', minute: '00', period: 'PM' });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeConfirmed, setTimeConfirmed] = useState(false);
  const [errors, setErrors] = useState({}); // Add this line

  const occasions = [
    { id: 'birthday', name: 'Birthday', icon: Cake },
    { id: 'special', name: 'Special Occasion', icon: Star },
    { id: 'business', name: 'Business', icon: Briefcase },
    { id: 'popup', name: 'Pop-Up', icon: Tent },
    { id: 'other', name: 'Other', icon: Sparkles },
  ];

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];
  const periods = ['PM', 'AM'];

  const handleOccasionSelect = (occasion) => {
    setSelectedOccasion(occasion);
    setEventDetails(prev => ({ ...prev, occasion: occasion }));
    setPage('eventDetails');
  };

  const handleInputChange = (field, value) => {
    setEventDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!eventDetails.date) {
      newErrors.date = "Please select a date";
    }
    // ... validate other fields ...

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      onSubmit(eventDetails);
    }
  };

  const handleTimeChange = (type, value) => {
    setTime(prev => {
      let newTime = { ...prev, [type]: value };
      if (type === 'hour') {
        // Ensure the hour stays within 1-12 range
        newTime.hour = value === '00' ? '12' : value;
      }
      return newTime;
    });
  };

  const handleTimeConfirm = () => {
    const formattedTime = `${time.hour}:${time.minute} ${time.period}`;
    handleInputChange('startTime', formattedTime);
    setTimeConfirmed(true);
    setShowTimePicker(false);
  };

  const TimePickerColumn = ({ options, value, onChange, type }) => (
    <div className="flex flex-col items-center">
      <button onClick={() => onChange(type, options[(options.indexOf(value) + 1) % options.length])}>
        <ChevronUp className="h-4 w-4" />
      </button>
      <div className="my-2 text-lg font-semibold">{value}</div>
      <button onClick={() => onChange(type, options[(options.indexOf(value) - 1 + options.length) % options.length])}>
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );

  useEffect(() => {
    if (initialData?.startTime) {
      setTime(initialData.startTime);
    }
  }, [initialData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showTimePicker && !event.target.closest('.time-picker-container')) {
        handleTimeConfirm();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTimePicker]);

  const inputClassName = (value) => `
    mt-1 block w-full pl-3 pr-10 py-2 text-sm 
    border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md
    ${!value ? 'text-gray-400 italic' : 'text-gray-900'}
  `;

  const placeholderText = (field) => `Select ${field}`;

  const DatePicker = ({ selectedDate, onChange }) => {
    const [currentMonth, setCurrentMonth] = useState(selectedDate ? parseISO(selectedDate) : new Date());
    const [isOpen, setIsOpen] = useState(false);
    const datePickerRef = useRef(null);

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth)
    });

    const handleDateClick = (day) => {
      onChange(format(day, 'yyyy-MM-dd'));
      setIsOpen(false);
    };

    const toggleCalendar = () => setIsOpen(!isOpen);

    const placeholderText = "Select a date (MM/DD/YYYY)";

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className="relative" ref={datePickerRef}>
        <div className="flex items-center">
          <input
            type="text"
            value={selectedDate ? format(parseISO(selectedDate), 'MM/dd/yyyy') : ''}
            onClick={toggleCalendar}
            readOnly
            placeholder={placeholderText}
            className={`w-full pl-3 pr-10 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${!selectedDate ? 'text-gray-400 italic' : 'text-gray-900'}`}
          />
          <button
            onClick={toggleCalendar}
            className="absolute right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            type="button"
          >
            <Calendar size={20} />
          </button>
        </div>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg">
            <div className="p-2">
              <div className="flex justify-between items-center mb-2">
                <button onClick={prevMonth} type="button" className="p-1"><ChevronLeft size={20} /></button>
                <span className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
                <button onClick={nextMonth} type="button" className="p-1"><ChevronRight size={20} /></button>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500">{day}</div>
                ))}
                {days.map(day => {
                  const isSelected = selectedDate && isSameDay(parseISO(selectedDate), day);
                  return (
                    <button
                      key={day.toString()}
                      onClick={() => handleDateClick(day)}
                      type="button"
                      className={`
                        p-2 text-center text-sm rounded-full
                        ${!isSameMonth(day, currentMonth) ? 'text-gray-300' : 'text-gray-700'}
                        ${isSelected ? 'bg-indigo-600 text-white' : ''}
                        hover:bg-gray-100
                      `}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const OccasionPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
            Describe your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">dream event</span>,
            <br className="hidden sm:inline" /> we'll make it happen
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-700">Select your occasion to get started</p>
          
          <div className="w-full">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {occasions.map((occasion) => {
                const IconComponent = occasion.icon;
                return (
                  <div key={occasion.id} className="aspect-square">
                    <button
                      onClick={() => handleOccasionSelect(occasion.name)}
                      className={`w-full h-full flex flex-col items-center justify-center rounded-full transition-all duration-300 border ${
                        selectedOccasion === occasion.name
                          ? 'border-blue-600 text-blue-600'
                          : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700'
                      }`}
                    >
                      <IconComponent className="w-1/3 h-1/3 mb-1" />
                      <span className="text-xs sm:text-sm font-medium">{occasion.name}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center">
          <img 
            src="/HomePageHeroPartyIPhone.png" 
            alt="Event Planning Hero" 
            className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px] h-auto"
          />
        </div>
      </div>
    </div>
  );

  const EventDetailsPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => setPage('occasion')}
        className="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center"
      >
        <ChevronLeft className="mr-2" size={18} />
        Back to Occasions
      </button>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Tell us about your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500">{selectedOccasion}</span> event
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
          <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <MapPin size={16} className="mr-2" />
            What are we doing?
          </label>
          <select 
            id="activity"
            value={eventDetails.activity}
            onChange={(e) => handleInputChange('activity', e.target.value)}
            className={inputClassName(eventDetails.activity)}
          >
            <option value="" disabled hidden>{placeholderText('activity')}</option>
            <option value="Happy Hour">Happy Hour</option>
            <option value="Dinner">Dinner</option>
            <option value="Going Out">Going Out</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
          <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Users size={16} className="mr-2" />
            Guest Count
          </label>
          <select
            id="guestCount"
            value={eventDetails.guestCount}
            onChange={(e) => handleInputChange('guestCount', e.target.value)}
            className={inputClassName(eventDetails.guestCount)}
          >
            <option value="" disabled hidden>{placeholderText('guest count')}</option>
            <option value="Under 10">Under 10</option>
            <option value="10-20">10-20</option>
            <option value="20-50">20-50</option>
            <option value="50-100">50-100</option>
            <option value="100-250">100-250</option>
            <option value="250+">250+</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Wallet size={16} className="mr-2" />
            Budget
          </label>
          <select
            id="budget"
            value={eventDetails.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className={inputClassName(eventDetails.budget)}
          >
            <option value="" disabled hidden>{placeholderText('budget range')}</option>
            <option value="Under $1,000">Under $1,000</option>
            <option value="$1,000-$2,500">$1,000-$2,500</option>
            <option value="$2,500-$5,000">$2,500-$5,000</option>
            <option value="$5,000-$10,000">$5,000-$10,000</option>
            <option value="$10,000-$25,000">$10,000-$25,000</option>
            <option value="$25,000-$50,000">$25,000-$50,000</option>
            <option value="$50,000+">$50,000+</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Calendar size={16} className="mr-2" />
            Date
          </label>
          <DatePicker
            selectedDate={eventDetails.date}
            onChange={(date) => handleInputChange('date', date)}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Clock size={16} className="mr-2" />
            Start Time
          </label>
          <input
            type="text"
            id="startTime"
            value={`${time.hour}:${time.minute} ${time.period}`}
            onClick={() => setShowTimePicker(true)}
            readOnly
            className={inputClassName(timeConfirmed ? `${time.hour}:${time.minute} ${time.period}` : '')}
          />
          {showTimePicker && (
            <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg time-picker-container">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <TimePickerColumn options={hours} value={time.hour} onChange={handleTimeChange} type="hour" />
                  <TimePickerColumn options={minutes} value={time.minute} onChange={handleTimeChange} type="minute" />
                  <TimePickerColumn options={periods} value={time.period} onChange={handleTimeChange} type="period" />
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={handleTimeConfirm} className="text-blue-600">
                    <Check className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Clock size={16} className="mr-2" />
            Duration
          </label>
          <select
            id="duration"
            value={eventDetails.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            className={inputClassName(eventDetails.duration)}
            required
          >
            <option value="" disabled hidden>{placeholderText('duration')}</option>
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
            <option value="3">3 hours</option>
            <option value="4">4 hours</option>
            <option value="5+">5+ hours</option>
          </select>
        </div>

        <div className="col-span-2 mt-6">
          <button type="submit" className="w-full inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Wand2 className="mr-2" size={16} />
            Set the Scene
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      {page === 'occasion' ? <OccasionPage /> : <EventDetailsPage />}
    </div>
  );
}
