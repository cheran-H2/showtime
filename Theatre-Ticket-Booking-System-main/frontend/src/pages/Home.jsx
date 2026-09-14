import React, { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import MovieRow from '../components/MovieRow'
import FeaturedSection from '../components/FeaturedSection'
import { TrailerSection } from '../components/TrailerSection'
import { fetchMovies } from '../api/movieApi'
import { assets } from '../assets/assets'

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();

      // Manually add Jana Nayagan movie if not present
      const janaNayaganMovie = {
        _id: 'jananayagan123',
        title: 'Jana Nayagan',
        backdrop_path: assets.homepage, // Use the local asset
        poster_path: assets.homepage,
        overview: 'Jana Nayagan is an upcoming Tamil political action thriller directed by H. Vinoth and produced by KVN Productions. The film stars Vijay in the lead role.',
        release_date: '2026-01-01',
        runtime: 128,
        genres: [{ name: 'Action' }, { name: 'Thriller' }]
      };

      // Prepend Jana Nayagan to the list
      setMovies([janaNayaganMovie, ...data]);
    };
    loadMovies();
  }, []);

  return (
    <>
      <HeroSection movies={movies.slice(0, 5)} />{/* Pass top 5 movies for rotation */}

      <div className='-mt-20 md:-mt-32 relative z-20 pb-10 space-y-4'>
        <MovieRow title="Trending Movies" movies={movies.slice(0, 10)} />
        <MovieRow title="New Releases" movies={movies.slice(5, 15) /* Simulate different data */} />
        <MovieRow title="Popular Movies" movies={movies.slice(2, 12) /* Simulate different data */} />
        <MovieRow title="Recommended" movies={movies.slice(8, 18) /* Simulate different data */} />
      </div>

      <FeaturedSection />
      <TrailerSection />
    </>
  )
}

export default Home