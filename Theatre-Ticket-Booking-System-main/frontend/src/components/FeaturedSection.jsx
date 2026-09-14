import React from 'react'
import { ArrowRight } from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import BlurCircle from './BlurCircle';
import MovieCard from './MovieCard';
import { dummyShowsData } from '../assets/assets';

const FeaturedSection = () => {
    const navigate = useNavigate();
  return (
    
        <div className = "px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
            <div className = "relative flex items-center justify-between pt-20 pb-10">
            <BlurCircle top='0' right='-80px' />
            <p className = "text-gray-200 front-medium text-lg">Now Showing</p>
            <button onClick = {()=>navigate('/movies')} className = "flex group items-center gap-2 text-sm text-gray-300 cursor-pointer">
                View All
                 <ArrowRight className="group-hover:translate-x-0.5 transition w-4 h-4.5" />
                 </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {dummyShowsData.slice(0, 4).map((show) => (
    <MovieCard key={show._id} movie={show} />
  ))}
</div>

        <div className = "flex justify-center mt-20">
          <button onClick = {()=>{navigate('/movies'); scrollTo(0, 0)}} className="flex items-center gap-1 px-6 py-3 text-sm bg-blue-500 hover:bg-blue-600 transition rounded-full font-medium cursor-pointer">
  Show More
  <ArrowRight className="w-5 h-5" />
          </button>
          
        </div>
    </div>
    
  )
}

export default FeaturedSection