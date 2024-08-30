import React from 'react';
import Photos from './Photos';
import { FaHeart, FaDownload, FaShare, FaThumbsUp } from 'react-icons/fa';

const Favorites = ({ favoritePhotos, onRemoveFavorite }) => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar_logo">Fotoflix</div>
        <div className="navbar_links">
          <a href='/'>HOME</a>
        </div>
      </nav>
      <main>
        <section className="photos">
          <div className='photos-center'>
            {favoritePhotos.length > 0 ? (
              favoritePhotos.map((photo, index) => (
                <article key={photo.id} className='photo favorite-photo'>
                  <img src={photo.urls.regular} alt={photo.alt_description} />
                  <div className='photo-info'>
                    <div className='photo-header'>
                      <h4>{photo.user.name}</h4>
                      <button className='favorite-btn active' onClick={() => onRemoveFavorite(photo.id)}>
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p>No favorite photos yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Favorites;
