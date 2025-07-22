import React from 'react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const defaultPoster = "https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop";
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultPoster;
  };

  const getTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'movie':
        return '🎬';
      case 'series':
        return '📺';
      case 'episode':
        return '🎞️';
      default:
        return '🎭';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'movie':
        return '#e74c3c';
      case 'series':
        return '#3498db';
      case 'episode':
        return '#f39c12';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : defaultPoster}
          alt={`${movie.Title} poster`}
          className="movie-poster"
          onError={handleImageError}
        />
        <div className="movie-overlay">
          <div className="movie-type" style={{ backgroundColor: getTypeColor(movie.Type) }}>
            <span className="type-icon">{getTypeIcon(movie.Type)}</span>
            <span className="type-text">{movie.Type}</span>
          </div>
        </div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title" title={movie.Title}>
          {movie.Title}
        </h3>
        <div className="movie-details">
          <span className="movie-year">📅 {movie.Year}</span>
          <span className="movie-id">IMDb: {movie.imdbID}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;