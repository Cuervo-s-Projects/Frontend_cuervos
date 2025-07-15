// src/pages/SearchResultsPage.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserTopMenu from '../components/UserTopMenu';
import TopMenu from '../components/TopMenu';
import VideoCard from '../components/VideoCard';
import '../styles/videoGrid.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResultsPage() {
  const query = useQuery().get('q') || '';
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`http://localhost:5001/videos/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (response.ok) {
          setVideos(data.videos);
        } else {
          console.error('Error al buscar videos:', data.error);
        }
      } catch (error) {
        console.error('Error de conexión:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query]);

  return (
    <>
      {isLoggedIn ? <UserTopMenu /> : <TopMenu />}

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-center text-success">
            Resultados para: <em>{query}</em>
          </h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-success" role="status" />
              <p className="mt-2">Cargando videos...</p>
            </div>
          ) : videos.length === 0 ? (
            <p className="text-center text-muted">No se encontraron videos relacionados.</p>
          ) : (
            <div className="video-grid">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="video-card-wrapper"
                  onClick={() => navigate(`/video/${video._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <VideoCard title={video.title} thumbnailId={video.thumbnail_id} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
