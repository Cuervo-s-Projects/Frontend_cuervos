import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserTopMenu from '../components/UserTopMenu';

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [uploader, setUploader] = useState('');
  const [authenticatedUserId, setAuthenticatedUserId] = useState('');
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener video
        const res = await fetch(`http://localhost:5001/videos/${id}`);
        const data = await res.json();
        setVideo(data);

        // Obtener username del uploader
        if (data.user_id) {
          const userRes = await fetch('http://localhost:5000/api/username', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: data.user_id }),
          });

          const userData = await userRes.json();
          setUploader(userData.username || 'Usuario desconocido');
        }

        // Obtener perfil del usuario autenticado
        const token = localStorage.getItem('token');
        if (token) {
          const profileRes = await fetch('http://localhost:5000/api/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (profileRes.ok) {
            const profileData = await profileRes.json();
            setAuthenticatedUserId(profileData._id);
          }
        }

        // Buscar videos relacionados
        const searchTerms = [data.title, ...(data.tags || [])].join(' ');
        const searchRes = await fetch(`http://localhost:5001/videos/search?q=${encodeURIComponent(searchTerms)}`);
        const searchData = await searchRes.json();
        const related = searchData.videos.filter(v => v._id !== id).slice(0, 10);
        setRelatedVideos(related);
      } catch (err) {
        console.error('Error al cargar video o perfil:', err);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      setComments(prev => [...prev, comment]);
      setComment('');
    }
  };

  const handleCreateQuiz = () => {
    navigate(`/quiz/create/${id}`); // o como esté configurada tu ruta
  };

  if (!video) return <p className="text-center py-5">Cargando video...</p>;

  const isUploader = authenticatedUserId === video.user_id;

  return (
    <>
      <UserTopMenu />
      <div className="container py-5">
        {/* Video */}
        <div className="mb-4">
          <video controls width="100%" className="rounded shadow">
            <source src={`http://localhost:5001/download/${video.file_id}`} type={video.content_type} />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>

        {/* Botón de descarga */}
        <div className="mb-4">
          <a href={`http://localhost:5001/download/${video.file_id}`} download={video.filename} className="btn btn-outline-secondary">
            Descargar video
          </a>
        </div>

        {/* Título y descripción */}
        <h2 className="fw-bold text-success">{video.title}</h2>
        <p className="text-muted mb-1"><strong>Subido por:</strong> {uploader}</p>
        <p className="text-muted">{video.description}</p>

        {/* Botones de formularios */}
        <div className="mb-4 d-flex gap-3">
          {isUploader && (
            <button className="btn btn-outline-primary" onClick={handleCreateQuiz}>
              📄 Crear Formulario
            </button>
          )}
          <button
            className="btn btn-success btn-lg mt-3"
            onClick={() => navigate(`/quiz/${video._id}`)}
          >
            Resolver formulario
          </button>
        </div>

        {/* Comentarios */}
        <div className="card p-3 mb-5">
          <h5 className="mb-3">💬 Comentarios</h5>
          <form onSubmit={handleCommentSubmit} className="d-flex gap-2 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Escribe un comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="btn btn-success">Enviar</button>
          </form>
          <ul className="list-group">
            {comments.map((c, idx) => (
              <li key={idx} className="list-group-item">{c}</li>
            ))}
          </ul>
        </div>

        {/* Videos relacionados */}
        <h4 className="mb-3 text-secondary">🎥 Videos Relacionados</h4>
        <div className="row">
          {relatedVideos.map((v) => (
            <div className="col-md-4 col-lg-3 mb-4" key={v._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:5001/thumbnail/${v.thumbnail_id}`}
                  className="card-img-top"
                  alt={v.title}
                  style={{ objectFit: 'cover', height: '150px' }}
                />
                <div className="card-body">
                  <h6 className="card-title">{v.title}</h6>
                  <p className="card-text text-muted small">{v.description?.slice(0, 60)}...</p>
                  <a href={`/video/${v._id}`} className="btn btn-sm btn-outline-primary w-100">
                    Ver video
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
