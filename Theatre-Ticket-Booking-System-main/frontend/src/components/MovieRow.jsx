import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="relative w-full py-4 px-4 md:px-16 lg:px-24">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-white transition-colors duration-300 hover:text-blue-500 cursor-pointer">{title}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-1.5 bg-gray-800/80 hover:bg-gray-700 rounded-full text-white transition focus:outline-none backdrop-blur-sm"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-1.5 bg-gray-800/80 hover:bg-gray-700 rounded-full text-white transition focus:outline-none backdrop-blur-sm"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {movies.map((movie) => (
                    <div key={movie._id || movie.id} className="snap-start shrink-0">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieRow;
