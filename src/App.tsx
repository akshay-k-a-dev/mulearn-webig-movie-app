import  { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import { Movie } from './types/Movie';
import './App.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hasSearched, setHasSearched] = useState(false);

  const searchMovies = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setHasSearched(true);
    
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=demo`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        setMovies(data.Search || []);
      } else {
        setMovies([]);
        setError(data.Error || 'No movies found');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    searchMovies(query);
  };

  // Search for popular movies on initial load
  useEffect(() => {
    searchMovies('batman');
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">🎬 MovieFinder</h1>
          <p className="app-subtitle">Discover your favorite movies and TV series</p>
        </div>
      </header>

      <main className="main-content">
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Searching for movies...</p>
          </div>
        )}

        {error && hasSearched && (
          <div className="error-container">
            <div className="error-message">
              <span className="error-icon">🎭</span>
              <h3>No Movies Found</h3>
              <p>{error}</p>
              <p className="error-suggestion">Try searching for a different movie or TV series</p>
            </div>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="results-container">
            <h2 className="results-title">
              Found {movies.length} result{movies.length !== 1 ? 's' : ''} 
              {searchTerm && ` for "${searchTerm}"`}
            </h2>
            <MovieGrid movies={movies} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by OMDb API</p>
      </footer>
    </div>
  );
}

export default App;
