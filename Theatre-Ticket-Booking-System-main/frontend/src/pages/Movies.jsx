import React, { useState, useEffect } from 'react'
import { fetchMovies } from '../api/movieApi'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const data = await fetchMovies();
      setMovies(data || []);
      setLoading(false);
    };
    getMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400 font-medium">Loading movies...</p>
      </div>
    );
  }

  return movies.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="0px" left="0px" />
      <h1 className="text-2xl font-bold my-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
        Now Showing
      </h1>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie._id || movie.id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-300">No movies available</h1>
    </div>
  );
};

export default Movies;