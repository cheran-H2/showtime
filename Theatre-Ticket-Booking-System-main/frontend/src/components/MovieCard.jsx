// MovieCard.jsx
import { StarIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import timeformate from '../lib/timeformate';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState(0);
  // React.useEffect(() => {
  // fetch("http://localhost:8080/accounts/554/balance")
  // .then((response) => response.json())
  // .then((data) => setData(data))
  // .catch((error) => console.error("Error fetching data:", error));
  // },[]);
  return (
    <div className="flex flex-col p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-64">
      {/* Movie Poster */}
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }}
        src={movie.backdrop_path || movie.poster_path}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400?text=Image+Not+Found" }}
        alt={movie.title}
        className="rounded-lg h-52 w-full object-cover object-center cursor-pointer"
      />

      {/* Title */}
      <p className="font-semibold mt-3 truncate">{movie.title}</p>

      {/* Year • Genres • Runtime */}
      <p className="text-sm text-gray-400 mt-1">
        {new Date(movie.release_date).getFullYear()} •{" "}
        {movie.genres?.slice(0, 2).map(genere => genere.name).join(" | ")} • {timeformate(movie.runtime)}
      </p>

      {/* Footer: Buy Tickets + Rating */}
      <div className="flex items-center justify-between mt-4">
        {/* Buy Tickets button */}
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 transition rounded-full font-medium text-white"
        >
          Buy Tickets
        </button>

        {/* Rating */}
        <p className="flex items-center gap-1 text-sm text-gray-300">
          <StarIcon className="w-4 h-4 text-blue-500 fill-blue-500" />
          {movie.vote_average?.toFixed(1) ?? "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
