import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovies } from '../api/movieApi';
import { dummyShowsData, assets } from '../assets/assets';
import { StarIcon, Calendar, Clock, MapPin, Ticket, ChevronRight } from 'lucide-react';
import BlurCircle from '../components/BlurCircle';
import { useLocationContext } from '../context/LocationContext';
import { theatresByCity } from '../data/theatreData';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedCity } = useLocationContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('Today');

  const activeTheatres = theatresByCity[selectedCity] || [];

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);

      // 1. Fetch API movies
      const apiMovies = await fetchMovies();

      // 2. Custom local movies
      const janaNayaganMovie = {
        _id: 'jananayagan123',
        id: 'jananayagan123',
        title: 'Jana Nayagan',
        backdrop_path: assets.homepage,
        poster_path: assets.homepage,
        overview: 'Jana Nayagan is an upcoming Tamil political action thriller directed by H. Vinoth and produced by KVN Productions. The film stars Vijay in the lead role.',
        release_date: '2026-01-01',
        runtime: 128,
        vote_average: 9.2,
        genres: [{ name: 'Action' }, { name: 'Thriller' }]
      };

      const allMovies = [janaNayaganMovie, ...(apiMovies || []), ...dummyShowsData];
      
      // Match by String comparison
      const foundMovie = allMovies.find(m => 
        String(m._id) === String(id) || String(m.id) === String(id)
      );

      if (foundMovie) {
        setMovie(foundMovie);
      } else {
        // Fallback to first dummy show if not found
        setMovie(dummyShowsData[0]);
      }

      setLoading(false);
    };

    getMovie();
  }, [id]);

  const formatRuntime = (runtime) => {
    if (!runtime) return '2h 10m';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const handleBookNow = (theatre, time) => {
    const bookingMovieObj = {
      title: movie.title,
      time: `${selectedDate} - ${time}`,
      id: movie._id || movie.id,
      poster_path: movie.poster_path
    };

    const bookingTheatreObj = {
      name: theatre.name,
      address: theatre.address
    };

    navigate('/seat-layout', {
      state: {
        movie: bookingMovieObj,
        theatre: bookingTheatreObj
      }
    });
  };

  const scrollToShows = () => {
    const elem = document.getElementById('shows-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-black text-white">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400 font-medium">Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Movie not found</h2>
        <button onClick={() => navigate('/movies')} className="mt-4 px-6 py-2 bg-blue-600 rounded-full">
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 md:pt-28 pb-16 px-6 md:px-16 lg:px-36">
      <BlurCircle top="0px" left="0px" />

      {/* Top Banner & Movie Info */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto bg-gray-900/60 border border-gray-800 p-6 md:p-8 rounded-2xl backdrop-blur-md">
        <img
          src={movie.poster_path || movie.backdrop_path}
          alt={movie.title}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400?text=Image+Not+Found" }}
          className="max-md:mx-auto rounded-xl h-96 w-full md:w-80 object-cover shadow-2xl"
        />

        <div className="relative flex flex-col justify-between gap-4 flex-1">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                Now Showing
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-400" /> {formatRuntime(movie.runtime)}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent mb-3">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-300 mb-4">
              <div className="flex items-center gap-1 text-yellow-400 font-bold bg-yellow-500/10 px-2.5 py-1 rounded-lg">
                <StarIcon className="w-5 h-5 fill-yellow-400" />
                {movie.vote_average ? movie.vote_average.toFixed(1) : "8.0"} / 10
              </div>

              {movie.release_date && (
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {new Date(movie.release_date).getFullYear()}
                </span>
              )}
            </div>

            {movie.genres && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre, idx) => (
                  <span key={idx} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700">
                    {genre.name || genre}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
              {movie.overview}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-800 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToShows}
              className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition text-white font-bold rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 text-base cursor-pointer"
            >
              <Ticket className="w-5 h-5" />
              Book Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Shows & Theatre Selection Section */}
      <div id="shows-section" className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Ticket className="w-6 h-6 text-red-500" /> Available Shows & Theatres in {selectedCity}
            </h2>
            <p className="text-gray-400 text-sm mt-1">Select a showtime to proceed with seat booking</p>
          </div>

          {/* Date Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['Today', 'Tomorrow', 'Day After'].map((dateOption) => (
              <button
                key={dateOption}
                onClick={() => setSelectedDate(dateOption)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  selectedDate === dateOption
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {dateOption}
              </button>
            ))}
          </div>
        </div>

        {/* Theatres List */}
        {activeTheatres.length > 0 ? (
          <div className="space-y-6">
            {activeTheatres.map((theatre) => (
              <div
                key={theatre.id}
                className="bg-gray-900/80 border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{theatre.name}</h3>
                    <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      {theatre.address}
                    </p>
                  </div>
                  <span className="bg-yellow-500/10 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-md self-start md:self-auto flex items-center gap-1">
                    <StarIcon className="w-3.5 h-3.5 fill-yellow-400" /> {theatre.rating}
                  </span>
                </div>

                {/* Showtimes */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {theatre.shows.map((time, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBookNow(theatre, time)}
                      className="px-5 py-2.5 bg-gray-800 hover:bg-green-600 hover:text-white border border-gray-700 hover:border-green-500 text-green-400 rounded-xl font-mono text-sm font-bold transition duration-200 flex items-center gap-1.5 shadow-sm group cursor-pointer"
                    >
                      {time}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-900/40 rounded-xl border border-gray-800">
            <p className="text-gray-400">No shows listed for {selectedCity}. Try changing your city in the navigation bar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
