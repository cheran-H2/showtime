import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { dummyTrailers } from '../assets/assets';
import BlurCircle from './BlurCircle';
import { PlayCircleIcon } from 'lucide-react';

export const TrailerSection = () => {
  const [trailers, setTrailers] = useState(dummyTrailers);
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]?.videoUrl || '');

  useEffect(() => {
    const loadTrailers = async () => {
      try {
        const res = await axios.get('http://localhost:8080/trailers/all');
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const formatted = res.data.map(item => ({
            image: item.image || 'https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg',
            videoUrl: item.videoUrl
          }));
          setTrailers(formatted);
          setCurrentTrailer(formatted[0].videoUrl);
        }
      } catch (err) {
        console.warn('Using default trailers fallback:', err);
      }
    };
    loadTrailers();
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers & Teasers
      </p>

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />
        {currentTrailer && (
          <iframe
            width="960px"
            height="540px"
            className="mx-auto max-w-full rounded-2xl shadow-2xl border border-zinc-800"
            src={currentTrailer}
            title="Trailer Player"
            allowFullScreen
          />
        )}
      </div>

      <div className="group grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 mt-8 max-w-4xl mx-auto">
        {trailers.map((trailer, idx) => (
          <div
            key={trailer.image + idx}
            className="relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition h-40 md:h-48 cursor-pointer rounded-xl overflow-hidden border border-zinc-800"
            onClick={() => setCurrentTrailer(trailer.videoUrl)}
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="w-full h-full object-cover brightness-75 hover:brightness-100 transition"
              onError={(e) => {
                e.target.src = 'https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg';
              }}
            />
            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-8 md:w-12 h-8 md:h-12 text-white transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
