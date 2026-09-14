import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, SearchIcon, XIcon, TicketPlus, MapPin, Navigation, ChevronDown } from 'lucide-react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useLocationContext } from '../context/LocationContext';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const { selectedCity, setSelectedCity, availableCities, detectLocation, isDetecting } = useLocationContext();

  return (
    <>
      <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-black/60 backdrop-blur-md border-b border-white/10'>
        <Link to='/home' className='max-mid:flex-1'>
          <img src={assets.company7} alt="logo" className='w-36 h-9' />
        </Link>
        <div className={`max-md:absolute max-md:top-0 max-md:left-0   
    max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row 
    items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full 
    backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 
    overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

          <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={() => setOpen(!isOpen)} />
          <Link onClick={() => { scrollTo(0, 0); setOpen(false); }} to='/home'>Home</Link>
          <Link onClick={() => { scrollTo(0, 0); setOpen(false); }} to='/movies'>Movies</Link>
          <Link onClick={() => { scrollTo(0, 0); setOpen(false); }} to='/theaters'>Theaters</Link>
          <Link onClick={() => { scrollTo(0, 0); setOpen(false); }} to='/favourites'>Favourites</Link>
          <Link onClick={() => { scrollTo(0, 0); setOpen(false); }} to='/map'>Map</Link>

        </div>

        <div className='flex items-center gap-4 md:gap-6'>
          {/* Location Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800/80 hover:bg-gray-700 text-white text-xs md:text-sm font-medium transition border border-gray-700 cursor-pointer shadow-sm"
              title="Select City"
            >
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span className="max-w-[100px] truncate">{selectedCity}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {showLocationDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-150">
                <div className="p-2 border-b border-gray-800">
                  <button
                    onClick={() => {
                      detectLocation();
                      setShowLocationDropdown(false);
                    }}
                    disabled={isDetecting}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-semibold rounded-lg transition border border-red-500/30 cursor-pointer"
                  >
                    <Navigation className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
                    {isDetecting ? 'Detecting...' : 'Detect My Location'}
                  </button>
                </div>

                <div className="py-1 max-h-60 overflow-y-auto">
                  <p className="px-3 py-1 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Select City</p>
                  {availableCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition flex items-center justify-between hover:bg-gray-800 ${
                        selectedCity === city ? 'text-red-400 font-bold bg-gray-800/50' : 'text-gray-300'
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <SearchIcon className='max-md:hidden w-5 h-5 cursor-pointer text-gray-300 hover:text-white transition' />

          {
            !user ? (
              <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-1.5 rounded-full text-sm font-medium transition-all shadow-md shadow-red-600/20 cursor-pointer" onClick={openSignIn}>
                Login
              </button>
            ) : (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action label="My Booking" labelIcon={<TicketPlus width={15} />} onClick={() => navigate("/my-bookings")} />
                </UserButton.MenuItems>
              </UserButton>
            )
          }
        </div>
        <MenuIcon className='max-md:ml-4 md:hidden w-7 h-7 cursor-pointer' onClick={() => setOpen(!isOpen)} />
      </div>
    </>
  );
};

export default Navbar;