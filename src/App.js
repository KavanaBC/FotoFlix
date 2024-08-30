import React, { useState } from 'react';
import Photos from './components/Photos';
import Favorites from './components/Favorites';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target[0].value);
  };

  const handleAddFavorite = (photo) => {
    setFavoritePhotos((prevFavorites) => {
      if (!prevFavorites.some((favPhoto) => favPhoto.id === photo.id)) {
        return [...prevFavorites, photo];
      }
      return prevFavorites;
    });
  };

  const handleRemoveFavorites = (photoId) => {
    setFavoritePhotos((prevFavorites) =>
      prevFavorites.filter((favPhoto) => favPhoto.id !== photoId)
    );
  };

  return (
    <Router>
      <div>
        <nav className='navbar'>
          <div className="navbar_logo">FotoFlix</div>
          <form className='navbar_search-form' onSubmit={handleSearch}>
            <input type='text' className='form-input' placeholder='search' />
            <button type='submit' className='submit-btn'>
              <FaSearch />
            </button>
          </form>
          <div className='navbar_links'>
            <Link to="/favorites">Favorites</Link>
          </div>
        </nav>
        <Routes>
          <Route
            path='/'
            element={
              <Photos
                searchQuery={searchQuery}
                favoritePhotos={favoritePhotos}
                onFavoriteClick={handleAddFavorite}
              />
            }
          />
          <Route
            path='/favorites'
            element={
              <Favorites
                favoritePhotos={favoritePhotos}
                onRemoveFavorite={handleRemoveFavorites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
