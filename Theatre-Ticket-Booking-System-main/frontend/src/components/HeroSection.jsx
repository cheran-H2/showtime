import React, { useEffect, useState } from 'react'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import timeformate from '../lib/timeformate'

const HeroSection = ({ movies }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    // Auto-slide loop
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 2000); // 2 second interval

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  const movie = movies[currentIndex];

  return (
    <div
      className="relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen text-white transition-all duration-1000"
      style={{
        backgroundImage: `linear-gradient(to top, #111827, transparent), linear-gradient(to right, #111827, transparent), url(${movie.backdrop_path})`
      }}
    >
      {/* Content Container with z-index to stay above overlay if needed */}
      <div className="z-10 flex flex-col items-start gap-4 max-w-2xl mt-20 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">{movie.title}</h1>

        <div className="flex items-center gap-4 text-gray-300 font-medium text-sm md:text-base bg-black/30 backdrop-blur-sm p-2 rounded-lg">
          <span>{movie.genres?.map(g => g.name).slice(0, 3).join(" | ")}</span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />{new Date(movie.release_date).getFullYear()}
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />{timeformate(movie.runtime)}
          </div>
        </div>

        <p className="text-gray-200 line-clamp-3 md:line-clamp-4 text-base md:text-lg drop-shadow-md max-w-xl">
          {movie.overview}
        </p>

        <button
          onClick={() => navigate(`/movies/${movie._id || movie.id}`)}
          className="mt-4 flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold text-lg cursor-pointer shadow-lg hover:shadow-blue-600/30"
        >
          Watch Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-blue-500 w-6' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSection