import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  Film, Video, PlusCircle, Trash2, RefreshCw, Star, 
  Clock, Calendar, Sparkles, Check, ExternalLink, Play, LayoutDashboard,
  Lock, KeyRound, User, LogOut, Eye, EyeOff, ShieldCheck, ArrowLeft, Users, UserPlus, Shield
} from 'lucide-react';
import { dummyShowsData, dummyTrailers } from '../assets/assets';

const API_MOVIES_URL = 'http://localhost:8080/movies';
const API_TRAILERS_URL = 'http://localhost:8080/trailers';
const API_ADMINS_URL = 'http://localhost:8080/admins';

const GENRE_OPTIONS = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 
  'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 
  'Romance', 'Science Fiction', 'Thriller'
];

const formatYoutubeEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url;
};

const AdminPage = () => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = sessionStorage.getItem('adminUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState('movies'); // 'movies' | 'trailers' | 'admins'
  
  // Movies state
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [submittingMovie, setSubmittingMovie] = useState(false);
  const [seedingMovies, setSeedingMovies] = useState(false);

  // Trailers state
  const [trailers, setTrailers] = useState([]);
  const [loadingTrailers, setLoadingTrailers] = useState(false);
  const [submittingTrailer, setSubmittingTrailer] = useState(false);
  const [seedingTrailers, setSeedingTrailers] = useState(false);

  // Admin Users state
  const [adminUsers, setAdminUsers] = useState([]);
  const [loadingAdminUsers, setLoadingAdminUsers] = useState(false);
  const [submittingNewAdmin, setSubmittingNewAdmin] = useState(false);

  // Movie Form State
  const [movieForm, setMovieForm] = useState({
    title: '',
    overview: '',
    posterPath: '',
    backdropPath: '',
    genres: ['Action'],
    releaseDate: new Date().toISOString().split('T')[0],
    originalLanguage: 'en',
    tagline: '',
    voteAverage: 8.0,
    voteCount: 1,
    runtime: 120,
    trailerUrl: ''
  });

  // Trailer Form State
  const [trailerForm, setTrailerForm] = useState({
    title: '',
    image: '',
    videoUrl: ''
  });

  // New Admin User Form State
  const [newAdminForm, setNewAdminForm] = useState({
    username: '',
    password: '',
    name: '',
    role: 'CONTENT_MANAGER'
  });

  // Handle Login Submission via MongoDB
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.username.trim() || !loginForm.password.trim()) {
      toast.error('Username and password are required');
      return;
    }

    try {
      setLoggingIn(true);
      const res = await axios.post(`${API_ADMINS_URL}/login`, loginForm);
      if (res.data && res.data.success) {
        const userObj = {
          username: res.data.username,
          name: res.data.name,
          role: res.data.role
        };
        sessionStorage.setItem('adminUser', JSON.stringify(userObj));
        setCurrentUser(userObj);
        toast.success(`Welcome back, ${userObj.name}!`);
      }
    } catch (err) {
      console.error('Login error:', err);
      // Fallback for initial demo if backend is just starting up
      if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
        const fallbackUser = { username: 'admin', name: 'Super Admin', role: 'SUPER_ADMIN' };
        sessionStorage.setItem('adminUser', JSON.stringify(fallbackUser));
        setCurrentUser(fallbackUser);
        toast.success('Welcome Super Admin!');
      } else {
        const msg = err.response?.data?.message || 'Invalid username or password';
        toast.error(msg);
      }
    } finally {
      setLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('adminUser');
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  // Fetch Movies
  const fetchMovies = async () => {
    try {
      setLoadingMovies(true);
      const res = await axios.get(`${API_MOVIES_URL}/all`);
      setMovies(res.data || []);
    } catch (err) {
      console.warn('Could not fetch movies:', err);
    } finally {
      setLoadingMovies(false);
    }
  };

  // Fetch Trailers
  const fetchTrailers = async () => {
    try {
      setLoadingTrailers(true);
      const res = await axios.get(`${API_TRAILERS_URL}/all`);
      setTrailers(res.data || []);
    } catch (err) {
      console.warn('Could not fetch trailers:', err);
    } finally {
      setLoadingTrailers(false);
    }
  };

  // Fetch Admin Users
  const fetchAdminUsers = async () => {
    try {
      setLoadingAdminUsers(true);
      const res = await axios.get(`${API_ADMINS_URL}/all`);
      setAdminUsers(res.data || []);
    } catch (err) {
      console.warn('Could not fetch admin users:', err);
    } finally {
      setLoadingAdminUsers(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchMovies();
      fetchTrailers();
      fetchAdminUsers();
    }
  }, [currentUser]);

  // Movie Form Handlers
  const handleMovieChange = (e) => {
    const { name, value } = e.target;
    setMovieForm(prev => ({
      ...prev,
      [name]: name === 'voteAverage' || name === 'runtime' || name === 'voteCount' ? Number(value) : value
    }));
  };

  const handleGenreToggle = (genre) => {
    setMovieForm(prev => {
      const exists = prev.genres.includes(genre);
      const updated = exists 
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres: updated.length > 0 ? updated : ['Action'] };
    });
  };

  const handleMovieSubmit = async (e) => {
    e.preventDefault();
    if (!movieForm.title.trim() || !movieForm.overview.trim()) {
      toast.error('Movie Title and Overview are required');
      return;
    }

    try {
      setSubmittingMovie(true);
      const payload = {
        ...movieForm,
        posterPath: movieForm.posterPath || 'https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg',
        backdropPath: movieForm.backdropPath || movieForm.posterPath || 'https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg'
      };

      await axios.post(`${API_MOVIES_URL}/add`, payload);
      toast.success(`Movie "${movieForm.title}" added to MongoDB!`);
      
      setMovieForm({
        title: '',
        overview: '',
        posterPath: '',
        backdropPath: '',
        genres: ['Action'],
        releaseDate: new Date().toISOString().split('T')[0],
        originalLanguage: 'en',
        tagline: '',
        voteAverage: 8.0,
        voteCount: 1,
        runtime: 120,
        trailerUrl: ''
      });

      fetchMovies();
    } catch (err) {
      console.error('Error adding movie:', err);
      toast.error('Failed to add movie');
    } finally {
      setSubmittingMovie(false);
    }
  };

  const handleMovieDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await axios.delete(`${API_MOVIES_URL}/delete/${id}`);
      toast.success(`Deleted "${title}"`);
      setMovies(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Error deleting movie:', err);
      toast.error('Failed to delete movie');
    }
  };

  const handleSeedMovies = async () => {
    try {
      setSeedingMovies(true);
      const seedList = dummyShowsData.map(item => ({
        title: item.title,
        overview: item.overview,
        posterPath: typeof item.poster_path === 'string' ? item.poster_path : 'https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg',
        backdropPath: typeof item.backdrop_path === 'string' ? item.backdrop_path : 'https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg',
        genres: item.genres ? item.genres.map(g => g.name) : ['Action'],
        releaseDate: item.release_date || '2025-01-01',
        originalLanguage: item.original_language || 'en',
        tagline: item.tagline || '',
        voteAverage: item.vote_average || 7.0,
        voteCount: item.vote_count || 100,
        runtime: item.runtime || 120,
        trailerUrl: item.trailerUrl || 'https://www.youtube.com/embed/1pHDWnXmK7Y'
      }));

      await axios.post(`${API_MOVIES_URL}/seed`, seedList);
      toast.success('Seeded movies into MongoDB!');
      fetchMovies();
    } catch (err) {
      console.error('Error seeding movies:', err);
      toast.error('Failed to seed movies');
    } finally {
      setSeedingMovies(false);
    }
  };

  // Trailer Form Handlers
  const handleTrailerSubmit = async (e) => {
    e.preventDefault();
    if (!trailerForm.videoUrl.trim()) {
      toast.error('YouTube Video URL is required');
      return;
    }

    try {
      setSubmittingTrailer(true);
      const formattedEmbedUrl = formatYoutubeEmbedUrl(trailerForm.videoUrl);

      const payload = {
        title: trailerForm.title || 'YouTube Trailer',
        image: trailerForm.image || 'https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg',
        videoUrl: formattedEmbedUrl
      };

      await axios.post(`${API_TRAILERS_URL}/add`, payload);
      toast.success('YouTube Trailer added successfully!');

      setTrailerForm({
        title: '',
        image: '',
        videoUrl: ''
      });

      fetchTrailers();
    } catch (err) {
      console.error('Error adding trailer:', err);
      toast.error('Failed to add YouTube trailer');
    } finally {
      setSubmittingTrailer(false);
    }
  };

  const handleTrailerDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete trailer "${title}"?`)) return;

    try {
      await axios.delete(`${API_TRAILERS_URL}/delete/${id}`);
      toast.success(`Trailer deleted`);
      setTrailers(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting trailer:', err);
      toast.error('Failed to delete trailer');
    }
  };

  const handleSeedTrailers = async () => {
    try {
      setSeedingTrailers(true);
      const sampleTrailers = [
        {
          title: "Jana Nayagan Official Teaser",
          image: "https://www.livemint.com/lm-img/img/2025/06/21/600x338/Thalapathy_Vijay_Jana_Nayagan_1750531535329_1750531535621.png",
          videoUrl: "https://www.youtube.com/embed/U4-oPNl0Isk"
        },
        {
          title: "Kantara Chapter 1 Teaser",
          image: "https://img.republicworld.com/all_images/rishab-shetty-starrer-kantara-chapter-1-released-on-october-2-1760721548172-16_9.webp",
          videoUrl: "https://www.youtube.com/embed/xhU0LslZ_Us"
        },
        {
          title: "Avatar 3 Official Trailer",
          image: "https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg",
          videoUrl: "https://www.youtube.com/embed/1pHDWnXmK7Y"
        }
      ];

      await axios.post(`${API_TRAILERS_URL}/seed`, sampleTrailers);
      toast.success('Seeded YouTube trailers into MongoDB!');
      fetchTrailers();
    } catch (err) {
      console.error('Error seeding trailers:', err);
      toast.error('Failed to seed trailers');
    } finally {
      setSeedingTrailers(false);
    }
  };

  // Add New Admin User Handler
  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();
    if (!newAdminForm.username.trim() || !newAdminForm.password.trim()) {
      toast.error('Username and password are required');
      return;
    }

    try {
      setSubmittingNewAdmin(true);
      await axios.post(`${API_ADMINS_URL}/add`, newAdminForm);
      toast.success(`Admin user "${newAdminForm.username}" registered in MongoDB!`);

      setNewAdminForm({
        username: '',
        password: '',
        name: '',
        role: 'CONTENT_MANAGER'
      });

      fetchAdminUsers();
    } catch (err) {
      console.error('Error adding admin:', err);
      const msg = err.response?.data?.message || 'Failed to create admin user';
      toast.error(msg);
    } finally {
      setSubmittingNewAdmin(false);
    }
  };

  // Delete Admin User Handler
  const handleDeleteAdmin = async (id, username) => {
    if (!window.confirm(`Are you sure you want to delete admin user "${username}"?`)) return;

    try {
      await axios.delete(`${API_ADMINS_URL}/delete/${id}`);
      toast.success(`Deleted admin user "${username}"`);
      setAdminUsers(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting admin user:', err);
      const msg = err.response?.data?.message || 'Failed to delete admin user';
      toast.error(msg);
    }
  };

  // ================= UNAUTHENTICATED ADMIN LOGIN SCREEN =================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-black text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 p-8 rounded-3xl shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-600/20 rounded-full blur-3xl" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex p-4 bg-red-600/20 text-red-500 rounded-2xl border border-red-500/30 mb-4 shadow-lg shadow-red-950/50">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              ShowTime Admin Portal
            </h1>
            <p className="text-xs text-gray-400 mt-1.5">
              Enter your credentials to access the Content Control Center
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="admin"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Default Credentials Helper */}
            <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-gray-400 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-300">Default Super Admin:</span>
              </div>
              <div className="font-mono text-[11px] text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/50">
                admin / admin123
              </div>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-900/40 transition duration-200 flex items-center justify-center gap-2 mt-2"
            >
              <Lock className="w-4 h-4" />
              {loggingIn ? 'Authenticating...' : 'Login to Admin Portal'}
            </button>
          </form>

          {/* Return to Public Site */}
          <div className="mt-6 text-center border-t border-zinc-800 pt-4 relative z-10">
            <a 
              href="/home" 
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Web App</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ================= AUTHENTICATED ADMIN DASHBOARD =================
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Standalone Admin Header */}
      <header className="bg-zinc-900/90 border-b border-zinc-800 backdrop-blur sticky top-0 z-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-600 rounded-xl shadow-lg shadow-red-900/40">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              ShowTime Admin Control Panel
            </h1>
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <span>Logged in as: <strong className="text-gray-200">{currentUser.name}</strong></span>
              <span className="px-2 py-0.2 bg-red-950/80 text-red-400 border border-red-800/50 rounded-md text-[10px]">
                {currentUser.role}
              </span>
            </p>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveTab('movies')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-2 ${
              activeTab === 'movies'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Film className="w-4 h-4" />
            Movies & Posters ({movies.length})
          </button>

          <button
            onClick={() => setActiveTab('trailers')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-2 ${
              activeTab === 'trailers'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Video className="w-4 h-4" />
            YouTube Trailers ({trailers.length})
          </button>

          <button
            onClick={() => setActiveTab('admins')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-2 ${
              activeTab === 'admins'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Admin Users ({adminUsers.length})
          </button>
        </div>

        {/* Actions: View Public Site & Logout */}
        <div className="flex items-center gap-3">
          <a 
            href="/home" 
            target="_blank" 
            rel="noreferrer"
            className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl border border-zinc-700 transition"
          >
            <span>View Public Web App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            title="Logout from Admin"
            className="text-xs font-medium text-red-400 hover:text-red-300 flex items-center gap-1 px-3 py-2 bg-red-950/40 hover:bg-red-900/60 rounded-xl border border-red-800/50 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* ================= TAB 1: MOVIES & POSTERS ================= */}
        {activeTab === 'movies' && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Film className="w-6 h-6 text-red-500" />
                  Movies & Poster Management
                </h2>
                <p className="text-xs text-gray-400 mt-1">Add movies with posters, edit synopses, and manage cinema catalog in MongoDB</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchMovies}
                  disabled={loadingMovies}
                  className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-200 text-xs font-semibold rounded-xl border border-zinc-700 transition flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingMovies ? 'animate-spin' : ''}`} />
                  Refresh
                </button>

                <button
                  onClick={handleSeedMovies}
                  disabled={seedingMovies}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-900/30 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {seedingMovies ? 'Seeding...' : 'Seed Sample Movies'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form: Add Movie & Poster */}
              <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl shadow-xl">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-red-500" />
                  Add New Movie & Poster
                </h3>

                <form onSubmit={handleMovieSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Movie Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={movieForm.title}
                      onChange={handleMovieChange}
                      placeholder="e.g. Avatar: The Way of Water"
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      name="tagline"
                      value={movieForm.tagline}
                      onChange={handleMovieChange}
                      placeholder="e.g. Return to Pandora"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                        Release Date
                      </label>
                      <input
                        type="date"
                        name="releaseDate"
                        value={movieForm.releaseDate}
                        onChange={handleMovieChange}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                        Runtime (mins)
                      </label>
                      <input
                        type="number"
                        name="runtime"
                        value={movieForm.runtime}
                        onChange={handleMovieChange}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Poster Image URL
                    </label>
                    <input
                      type="url"
                      name="posterPath"
                      value={movieForm.posterPath}
                      onChange={handleMovieChange}
                      placeholder="https://image.tmdb.org/t/p/original/..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Genres
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-zinc-950 border border-zinc-800 rounded-xl">
                      {GENRE_OPTIONS.map(genre => {
                        const isSelected = movieForm.genres.includes(genre);
                        return (
                          <button
                            key={genre}
                            type="button"
                            onClick={() => handleGenreToggle(genre)}
                            className={`text-xs px-2 py-0.5 rounded-lg border transition ${
                              isSelected 
                                ? 'bg-red-600 text-white border-red-500 font-bold' 
                                : 'bg-zinc-900 text-gray-400 border-zinc-800 hover:text-white'
                            }`}
                          >
                            {genre}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Synopsis / Overview *
                    </label>
                    <textarea
                      name="overview"
                      rows={3}
                      value={movieForm.overview}
                      onChange={handleMovieChange}
                      placeholder="Movie plot summary..."
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingMovie}
                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-900/40 transition"
                  >
                    {submittingMovie ? 'Saving Movie...' : 'Save Movie to MongoDB'}
                  </button>
                </form>
              </div>

              {/* Grid: Existing Movies */}
              <div className="lg:col-span-7">
                {loadingMovies ? (
                  <div className="p-12 text-center text-gray-400 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-red-500 mb-3" />
                    Loading movies...
                  </div>
                ) : movies.length === 0 ? (
                  <div className="p-12 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800">
                    <Film className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-gray-300">No Movies in Database</h4>
                    <p className="text-xs text-gray-500 mt-1 mb-4">Click "Seed Sample Movies" to populate default content.</p>
                    <button 
                      onClick={handleSeedMovies}
                      className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl"
                    >
                      Seed Default Movies
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[700px] overflow-y-auto pr-1">
                    {movies.map(movie => (
                      <div key={movie.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between">
                        <div className="relative h-44 bg-zinc-950">
                          <img 
                            src={movie.posterPath || movie.backdropPath || 'https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg'} 
                            alt={movie.title} 
                            className="w-full h-full object-cover"
                          />
                          <button 
                            onClick={() => handleMovieDelete(movie.id, movie.title)}
                            className="absolute top-2 right-2 p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-lg shadow"
                            title="Delete poster and movie"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-white text-sm line-clamp-1">{movie.title}</h4>
                          <p className="text-xs text-gray-400 line-clamp-2 mt-1">{movie.overview}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: YOUTUBE TRAILERS ================= */}
        {activeTab === 'trailers' && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Video className="w-6 h-6 text-red-500" />
                  YouTube Trailers Management
                </h2>
                <p className="text-xs text-gray-400 mt-1">Add YouTube video links and preview trailers displayed on the public website</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchTrailers}
                  disabled={loadingTrailers}
                  className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-200 text-xs font-semibold rounded-xl border border-zinc-700 transition flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingTrailers ? 'animate-spin' : ''}`} />
                  Refresh
                </button>

                <button
                  onClick={handleSeedTrailers}
                  disabled={seedingTrailers}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-900/30 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {seedingTrailers ? 'Seeding...' : 'Seed Sample Trailers'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form: Add YouTube Trailer */}
              <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl shadow-xl">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-red-500" />
                  Add YouTube Trailer
                </h3>

                <form onSubmit={handleTrailerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Trailer Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={trailerForm.title}
                      onChange={(e) => setTrailerForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. Kantara Chapter 1 Official Teaser"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      YouTube Video URL *
                    </label>
                    <input
                      type="url"
                      name="videoUrl"
                      value={trailerForm.videoUrl}
                      onChange={(e) => setTrailerForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                      placeholder="https://www.youtube.com/watch?v=xhU0LslZ_Us"
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                      Accepts standard YouTube links (e.g. youtube.com/watch?v=...) or embed links!
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Thumbnail Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={trailerForm.image}
                      onChange={(e) => setTrailerForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://img.youtube.com/vi/.../maxresdefault.jpg"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
                    />
                  </div>

                  {trailerForm.videoUrl && (
                    <div className="mt-4 p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                      <p className="text-xs font-bold text-gray-400 mb-2">Live Trailer Preview:</p>
                      <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                        <iframe 
                          src={formatYoutubeEmbedUrl(trailerForm.videoUrl)} 
                          title="Preview" 
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submittingTrailer}
                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-900/40 transition"
                  >
                    {submittingTrailer ? 'Saving Trailer...' : 'Add YouTube Trailer to MongoDB'}
                  </button>
                </form>
              </div>

              {/* Grid: Existing Trailers */}
              <div className="lg:col-span-7">
                {loadingTrailers ? (
                  <div className="p-12 text-center text-gray-400 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-red-500 mb-3" />
                    Loading YouTube trailers...
                  </div>
                ) : trailers.length === 0 ? (
                  <div className="p-12 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800">
                    <Video className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-gray-300">No Trailers in Database</h4>
                    <p className="text-xs text-gray-500 mt-1 mb-4">Click "Seed Sample Trailers" to populate YouTube teasers.</p>
                    <button 
                      onClick={handleSeedTrailers}
                      className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl"
                    >
                      Seed Default Trailers
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[700px] overflow-y-auto pr-1">
                    {trailers.map(trailer => (
                      <div key={trailer.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between">
                        <div className="relative aspect-video bg-zinc-950">
                          <iframe 
                            src={trailer.videoUrl} 
                            title={trailer.title || "Trailer"} 
                            className="w-full h-full"
                            allowFullScreen
                          />
                          <button 
                            onClick={() => handleTrailerDelete(trailer.id, trailer.title || "Trailer")}
                            className="absolute top-2 right-2 p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-lg shadow z-10"
                            title="Delete trailer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="p-3">
                          <h4 className="font-bold text-white text-xs line-clamp-1">{trailer.title || 'YouTube Trailer'}</h4>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">{trailer.videoUrl}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ADMIN USERS MANAGEMENT ================= */}
        {activeTab === 'admins' && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-red-500" />
                  Admin Users & Access Control
                </h2>
                <p className="text-xs text-gray-400 mt-1">Register multiple administrators and content managers stored in MongoDB</p>
              </div>

              <button
                onClick={fetchAdminUsers}
                disabled={loadingAdminUsers}
                className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-200 text-xs font-semibold rounded-xl border border-zinc-700 transition flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingAdminUsers ? 'animate-spin' : ''}`} />
                Refresh List
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form: Register New Admin */}
              <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl shadow-xl">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-red-500" />
                  Register New Admin Account
                </h3>

                <form onSubmit={handleAddAdminSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newAdminForm.name}
                      onChange={(e) => setNewAdminForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Alex Mercer"
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={newAdminForm.username}
                      onChange={(e) => setNewAdminForm(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="e.g. alex_admin"
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={newAdminForm.password}
                      onChange={(e) => setNewAdminForm(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="••••••••"
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Admin Role
                    </label>
                    <select
                      value={newAdminForm.role}
                      onChange={(e) => setNewAdminForm(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500 text-sm"
                    >
                      <option value="SUPER_ADMIN">Super Admin (Full Access)</option>
                      <option value="CONTENT_MANAGER">Content Manager (Movies & Trailers)</option>
                      <option value="THEATRE_MANAGER">Theatre Manager</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingNewAdmin}
                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-900/40 transition"
                  >
                    {submittingNewAdmin ? 'Registering Admin...' : 'Create Admin Account in MongoDB'}
                  </button>
                </form>
              </div>

              {/* Grid: Existing Admin Users */}
              <div className="lg:col-span-7">
                {loadingAdminUsers ? (
                  <div className="p-12 text-center text-gray-400 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-red-500 mb-3" />
                    Loading registered admins...
                  </div>
                ) : adminUsers.length === 0 ? (
                  <div className="p-12 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800">
                    <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-gray-300">Default Super Admin Active</h4>
                    <p className="text-xs text-gray-500 mt-1">Use the form on the left to add team member accounts.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
                    {adminUsers.map(admin => (
                      <div 
                        key={admin.id} 
                        className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between hover:border-zinc-700 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-zinc-800 text-red-400 rounded-xl border border-zinc-700">
                            <Shield className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm flex items-center gap-2">
                              <span>{admin.name || admin.username}</span>
                              <span className="text-[10px] font-mono px-2 py-0.2 bg-red-950/80 text-red-400 border border-red-900/50 rounded">
                                @{admin.username}
                              </span>
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Role: <span className="text-gray-300 font-semibold">{admin.role || 'ADMIN'}</span>
                            </p>
                          </div>
                        </div>

                        {adminUsers.length > 1 && (
                          <button
                            onClick={() => handleDeleteAdmin(admin.id, admin.username)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-950/50 rounded-lg border border-transparent hover:border-red-900/50 transition"
                            title="Delete Admin User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
