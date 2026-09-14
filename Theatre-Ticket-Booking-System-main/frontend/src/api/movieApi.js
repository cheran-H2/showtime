import axios from 'axios';
import { dummyShowsData } from '../assets/assets';

const API_URL = 'http://localhost:8080/movies';

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      // Normalize MongoDB movies so they match frontend expectations
      const backendMovies = response.data.map(movie => ({
        ...movie,
        _id: movie.id || movie._id,
        poster_path: movie.posterPath || movie.poster_path || 'https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg',
        backdrop_path: movie.backdropPath || movie.backdrop_path || movie.posterPath || 'https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg',
        release_date: movie.releaseDate || movie.release_date || '2026-01-01',
        vote_average: movie.voteAverage || movie.vote_average || 8.0,
        genres: Array.isArray(movie.genres) 
          ? movie.genres.map(g => (typeof g === 'string' ? { name: g } : g))
          : [{ name: 'Action' }]
      }));

      return backendMovies;
    }
    return dummyShowsData;
  } catch (error) {
    console.warn('Failed to fetch movies from Spring Boot API, using fallback dummy shows:', error);
    return dummyShowsData;
  }
};

