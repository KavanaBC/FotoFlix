import React, { useState, useEffect } from 'react';
import { FaHeart, FaDownload, FaShare, FaThumbsUp } from 'react-icons/fa';
import Lightbox from 'react-image-lightbox';
import "react-image-lightbox/style.css";

const Photos = ({ searchQuery, favoritePhotos, onFavoriteClick }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const clientID = '?client_id=1KCf4x3-QSxmclnhnzdCmDjdKFjZjeqsaafOqkUPJFo';
      const mainURL = 'https://api.unsplash.com/photos/';
      let url = mainURL + clientID;
      if (searchQuery) {
        url = `https://api.unsplash.com/search/photos/${clientID}&query=${searchQuery}`;
      }

      url += `&page=${page}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPhotos(data.results || data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchImages();
  }, [searchQuery, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 200
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleShare = (photoUrl) => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this awesome photo: ${photoUrl}`)}`;
    window.open(shareUrl, '_blank');
  };
  

  const handleDownload = (url, id) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `photo-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main>
      <section className='photos'>
        <div className='photos-center'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            photos.map((photo, index) => (
              <article key={photo.id} className={`photo ${favoritePhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'favorite-photo' : ''}`}>
                <img src={photo.urls.regular} alt={photo.alt_description} onClick={() => openLightbox(index)} />
                <div className='photo-info'>
                  <div className='photo-header'>
                    <h4>{photo.user.name}</h4>
                    <button className={`favorite-btn ${favoritePhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'active' : ''}`} onClick={() => onFavoriteClick(photo)}>
                      <FaHeart />
                    </button>
                  </div>
                  <div className='photo-actions'>
                    <p>
                      <FaThumbsUp className='heart-icon' /> {photo.likes}
                    </p>
                    <button className='share-btn' onClick={() => handleShare(photo.urls.regular)}>
                      <FaShare />
                    </button>
                    <button className='download-btn' onClick={() => handleDownload(photo.urls.full, photo.id)}>
                      <FaDownload />
                    </button>
                  </div>
                  <a href={photo.user.portfolio_url}>
                    <img src={photo.user.profile_image.medium} className='user-img' alt={photo.user.name} />
                  </a>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
      {isLightboxOpen && (
        <Lightbox
          mainSrc={photos[lightboxIndex].urls.full}
          onCloseRequest={closeLightbox}
        />
      )}
    </main>
  );
};

export default Photos;
