import { useState } from "react";
import SeatRow from "../components/seatArrangement/SeatRow";
import SeatLegend from "../components/seatArrangement/SeatLegend";
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const rows = "ONMLKJIHGFEDCBA".split("");

const createSeats = (row, count, offset = 1) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${row}${i + offset}`,
    number: i + offset,
    status: Math.random() < 0.1 ? "BOOKED" : "AVAILABLE",
  }));

const SeatLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, theatre } = location.state || {}; // Get passed data

  const [layout, setLayout] = useState(
    rows.map((row, index) => {
      // Top 3 rows (Back) have smaller center section
      const isBackRow = index < 3;

      const left = createSeats(row, 4, 1); // 1-4
      const center = isBackRow
        ? createSeats(row, 8, 5) // 5-12
        : createSeats(row, 10, 5); // 5-14

      const rightStart = isBackRow ? 13 : 15;
      const right = createSeats(row, 3, rightStart); // 13-15 or 15-17

      return {
        row,
        left,
        center,
        right,
      };
    })
  );

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSeatClick = (clicked) => {
    if (clicked.status === "BOOKED") return;

    // Toggle logic
    const isSelected = clicked.status === "SELECTED";
    const newStatus = isSelected ? "AVAILABLE" : "SELECTED";

    // Update selected seats list
    if (isSelected) {
      setSelectedSeats(prev => prev.filter(id => id !== clicked.id));
    } else {
      setSelectedSeats(prev => [...prev, clicked.id]);
    }

    setLayout((prev) =>
      prev.map((r) => ({
        ...r,
        left: r.left.map((s) => s.id === clicked.id ? { ...s, status: newStatus } : s),
        center: r.center.map((s) => s.id === clicked.id ? { ...s, status: newStatus } : s),
        right: r.right.map((s) => s.id === clicked.id ? { ...s, status: newStatus } : s),
      }))
    );
  };

  const handleBooking = () => {
    if (!movie || !theatre) {
      toast.error("Please select a movie/theatre first!");
      navigate('/theaters');
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat.");
      return;
    }
    if (!customerName.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    setShowPaymentModal(true);
  };

  const confirmBooking = async () => {
    const bookingData = {
      moviename: movie.title,
      theatre: theatre.name,
      showTime: movie.time,
      seats: selectedSeats,
      totalAmount: selectedSeats.length * 150,
      date: new Date().toISOString(),
      customerName: customerName
    };

    try {
      const response = await axios.post('http://localhost:8080/tickets/create', bookingData);

      if (response.status === 200) {
        setShowPaymentModal(false);
        toast.success(`Booking Confirmed! ${selectedSeats.join(", ")} for ${movie.title}`);
        navigate('/my-bookings');
      } else {
        toast.error('Booking failed. Please try again.');
      }

    } catch (error) {
      console.error("Booking Error", error);
      toast.error('Server error. Could not book ticket.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 pb-12 flex flex-col md:flex-row gap-8">
      {/* LEFT: SEAT MAP */}
      <div className="flex-1">
        <div className="flex justify-center mb-12">
          <svg width="100%" height="120" viewBox="0 0 900 120" className="max-w-2xl">
            <path
              d="M 40 80 Q 450 0 860 80"
              stroke="url(#grad)"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
            />
            <text x="450" y="100" textAnchor="middle" fill="#ccc" fontSize="12">
              SCREEN
            </text>
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff9800" />
                <stop offset="100%" stopColor="#ff3d00" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex flex-col gap-2 items-center overflow-x-auto pb-4">
          {layout.map((row) => (
            <SeatRow
              key={row.row}
              rowLabel={row.row}
              left={row.left}
              center={row.center}
              right={row.right}
              onSeatClick={handleSeatClick}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <SeatLegend />
        </div>
      </div>

      {/* RIGHT: BOOKING SUMMARY */}
      <div className="w-full md:w-80 bg-gray-900 border border-gray-800 p-6 rounded-xl h-fit sticky top-24">
        <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Booking Summary</h3>

        <div className="mb-4">
          <p className="text-gray-400 text-sm">Movie Name:</p>
          <h2 className="text-xl font-bold text-yellow-500">{movie?.title || "No Selection"}</h2>
        </div>

        <div className="mb-4">
          <p className="text-gray-400 text-sm">Theatre:</p>
          <p className="font-semibold">{theatre?.name || "N/A"}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-400 text-sm">Show Time:</p>
          <p className="font-semibold text-blue-400">{movie?.time || "N/A"}</p>
        </div>

        <div className="mb-4">
          <label className="text-gray-400 text-sm block mb-1">Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-6">
          <p className="text-gray-400 text-sm">Selected Seats:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {selectedSeats.length > 0 ? (
              selectedSeats.map(seat => (
                <span key={seat} className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">{seat}</span>
              ))
            ) : <span className="text-gray-600 italic">None selected</span>}
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center border-t border-gray-700 pt-4">
          <span className="text-gray-400">Total Price:</span>
          <span className="text-2xl font-bold">₹ {selectedSeats.length * 150}</span>
        </div>

        <button
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
          className={`w-full py-3 rounded-lg font-bold transition ${selectedSeats.length > 0
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
        >
          Book Ticket
        </button>
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl max-w-sm w-full flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4">Scan to Pay</h3>
            <div className="border-4 border-black p-2 rounded-lg mb-4">
              <img src="/upi_qr.jpg" alt="UPI QR Code" className="w-48 h-auto" />
            </div>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Please scan the QR code to complete the payment of <span className="font-bold">₹{selectedSeats.length * 150}</span>
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
              >
                Payment Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatLayout;