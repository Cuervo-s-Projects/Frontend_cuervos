// src/pages/UploadPage.jsx
import { useState } from 'react';
import '../styles/upload.css';
import UserTopMenu from '../components/UserTopMenu';

export default function UploadPage() {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoTitle || !videoFile) {
      setMessage('Completa todos los campos');
      return;
    }

    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!videoTitle || !videoFile) {
    setMessage('❌ Completa todos los campos');
    return;
  }

  const formData = new FormData();
  formData.append('file', videoFile);

  try {
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      console.log('ID del archivo subido:', data.file_id);
      setMessage('Video subido correctamente');
      setVideoFile(null);
      setVideoTitle('');
    } else {
      const errData = await response.json();
      console.error(errData);
      setMessage('Error al subir el video');
    }
  } catch (error) {
    console.error('Upload error:', error);
    setMessage('Error de conexión al subir el video');
  }
};

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
                    />

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
                        />
                        <span className="text-muted">
                            {videoFile ? `🎥 ${videoFile.name}` : 'Ningún archivo seleccionado'}
                        </span>
                    </div>

                    <button type="submit" className="upload-button">Subir</button>
                    {message && <p className="upload-message">{message}</p>}
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
