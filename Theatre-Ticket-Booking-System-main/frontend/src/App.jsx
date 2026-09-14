import React from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import SeatLayout from './pages/SeatLayout.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Favourites from './pages/Favourites.jsx'
import MapPage from './pages/MapPage.jsx'
import Theaters from './pages/Theaters.jsx'
import AdminPage from './pages/AdminPage.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx'

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  // console.log(data);
  return (
    <>

      {!isAdminRoute && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/seat-layout" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/theaters" element={<Theaters />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App;