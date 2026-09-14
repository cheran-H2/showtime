import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/tickets/all');
        if (response.status === 200) {
          setBookings(response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8">My Bookings</h2>
        <p className="text-gray-400">No bookings found.</p>
        <button
          onClick={() => navigate('/movies')}
          className="mt-4 bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Book a Movie
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 pb-12">
      <h2 className="text-3xl font-bold mb-8 text-center">My Bookings</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {bookings.map((booking) => (
          <div key={booking.id || booking._id} className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold text-yellow-500">{booking.moviename || booking.movie}</h3>
              {booking.customerName && (
                <p className="text-white text-sm mt-1 font-semibold">Customer: {booking.customerName}</p>
              )}
              <p className="text-gray-300 mt-1">{booking.theatre}</p>
              <p className="text-blue-400 text-sm mt-1">{booking.showTime}</p>
              <p className="text-gray-500 text-xs mt-2">Booked on: {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                {booking.seats && Array.isArray(booking.seats) && booking.seats.length > 0 ? (
                  booking.seats.map(seat => (
                    <span key={seat} className="bg-gray-700 px-2 py-1 rounded text-xs font-mono text-white">
                      {seat}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">Seats: {booking.seatnumber}</span>
                )}
              </div>
              <p className="text-xl font-bold">₹ {booking.totalAmount}</p>
              <span className="text-green-500 text-sm border border-green-500 px-2 py-0.5 rounded">Confirmed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;