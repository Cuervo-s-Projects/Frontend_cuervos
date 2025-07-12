import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import UserTopMenu from '../components/UserTopMenu';
import TopMenu from '../components/TopMenu';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResultsPage() {
  const query = useQuery().get('q') || '';
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!localStorage.getItem('token');

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
          <h2 className="mb-4 text-center text-success">Resultados para: <em>{query}</em></h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-success" role="status"></div>
              <p className="mt-2">Cargando videos...</p>
            </div>
          ) : videos.length === 0 ? (
            <p className="text-center text-muted">No se encontraron videos relacionados.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {videos.map((video) => (
                <div key={video._id} className="col">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={`http://localhost:5001/thumbnail/${video.thumbnail_id}`}
                      className="card-img-top"
                      alt={video.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{video.title}</h5>
                      <p className="card-text text-muted">{video.description?.slice(0, 80)}...</p>
                      <Link to={`/video/${video._id}`} className="btn btn-success btn-sm">
                        Ver video
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
