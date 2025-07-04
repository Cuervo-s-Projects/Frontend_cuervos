import { useState } from 'react';
import '../styles/upload.css';
import UserTopMenu from '../components/UserTopMenu';

export default function UploadPage() {
  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [length, setLength] = useState('');
const [userId, setUserId] = useState(localStorage.getItem('user_id') || 'ddelgadopi');

  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoTitle || !description || !tags || !userId || !videoFile) {
      setMessage('⚠️ Completa todos los campos');
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('title', videoTitle);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('length', length);
    formData.append('user_id', userId);

    try {
      const response = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData,
      });

      const text = await response.text();
      console.log('Texto recibido:', text);

      let data = {};
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Error al parsear JSON:', err);
        setMessage('⚠️ Error al interpretar respuesta del servidor');
        setTimeout(() => setMessage(''), 5000);
        return;
      }

      if (response.ok) {
        console.log('ID del archivo subido:', data.file_id);
        setMessage('✅ Video subido correctamente');
        setVideoTitle('');
        setDescription('');
        setTags('');
        setLength('');
        setUserId('');
        setVideoFile(null);
      } else {
        console.error('Respuesta del servidor con error:', data);
        setMessage('❌ Error al subir el video');
      }

      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Error de conexión:', error);
      setMessage('❌ Error de conexión al subir el video');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <>
      <UserTopMenu />
      <section className="upload-page">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-lg border-0 rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h2 className="text-center mb-4 fw-bold" style={{ color: '#277a6f' }}>
                    Sube tu video
                  </h2>
                  <p className="text-center text-muted mb-4">
                    Comparte contenido educativo para la comunidad
                  </p>

                  <form onSubmit={handleSubmit} className="upload-form">
                    <input
                      type="text"
                      placeholder="Título del video"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="upload-input"
                      required
                    />

                    <textarea
                      placeholder="Descripción"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="upload-input"
                      required
                    />

                    <input
                      type="text"
                      placeholder="Etiquetas (separadas por coma)"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="upload-input"
                      required
                    />

                    <input type="hidden" value={userId} name="user_id" />

                    <div className="file-upload-wrapper d-flex align-items-center gap-3">
                      <label htmlFor="file-upload" className="btn btn-success mb-0">
                        Elegir archivo
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files[0])}
                        style={{ display: 'none' }}
                        required
                      />
                      <span className="text-muted">
                        {videoFile ? `🎥 ${videoFile.name}` : 'Ningún archivo seleccionado'}
                      </span>
                    </div>

                    <button type="submit" className="upload-button">
                      Subir
                    </button>

                    {message && (
                      <p
                        className="upload-message"
                        style={{
                          color: message.startsWith('✅') ? 'green' : 'red',
                          fontWeight: 'bold',
                          marginTop: '10px',
                        }}
                      >
                        {message}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
