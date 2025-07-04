import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserTopMenu from '../components/UserTopMenu';

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/videos/${id}`)
      .then(res => res.json())
      .then(data => setVideo(data))
      .catch(err => console.error('Error al cargar video:', err));

    fetch(`http://localhost:5001/videos`)
      .then(res => res.json())
      .then(data => setRelatedVideos(data.videos.slice(0, 10)))
      .catch(err => console.error('Error al cargar videos relacionados:', err));
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      setComments(prev => [...prev, comment]);
      setComment('');
    }
  };

  if (!video) return <p className="text-center py-5">Cargando video...</p>;

  return (
    <>
      <UserTopMenu />

      <div className="container py-5">
        {/* Video principal */}
        <div className="mb-4">
          <video controls width="100%" className="rounded shadow">
            <source src={`http://localhost:5001/download/${video.file_id}`} type={video.content_type} />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>

        {/* Título y descripción */}
        <h2 className="fw-bold text-success">{video.title}</h2>
        <p className="text-muted">{video.description}</p>

        {/* Botones de formularios */}
        <div className="mb-4 d-flex gap-3">
          <button className="btn btn-outline-primary">📄 Crear Formulario</button>
          <button className="btn btn-outline-success">✅ Resolver Formulario</button>
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
