import { useState } from 'react';
import '../styles/upload.css';
import UserTopMenu from '../components/UserTopMenu';

export default function LoginAndUploadPage() {
  // Estados para login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para upload
  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [length, setLength] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const [isUploading, setIsUploading] = useState(false); // bloqueo
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [message, setMessage] = useState('');

  // Función para login y obtener perfil
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error en login');

      localStorage.setItem('token', data.access_token);

      const profileRes = await fetch('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });
      const profileData = await profileRes.json();
      if (!profileRes.ok) throw new Error(profileData.message || 'Error al obtener perfil');

      localStorage.setItem('user_id', profileData._id);
      setUserId(profileData._id);
      setMessage('✅ Login exitoso y perfil cargado');
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  // Función para subir video
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoTitle || !description || !tags || !userId || !videoFile) {
      setMessage('⚠️ Completa todos los campos');
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    setIsUploading(true);

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
      let data = {};

      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Error al parsear JSON:', err);
        setMessage('⚠️ Error al interpretar respuesta del servidor');
        return;
      }

      if (response.ok) {
        setMessage('✅ Video subido correctamente');
        setVideoTitle('');
        setDescription('');
        setTags('');
        setLength('');
        setVideoFile(null);
      } else {
        console.error('Respuesta con error:', data);
        setMessage('❌ Error al subir el video');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMessage('❌ Error de conexión al subir el video');
    } finally {
      setIsUploading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <>
      <UserTopMenu />

      <section className="upload-page">
        <div className="container py-5">
          {!userId && (
            <div className="row justify-content-center mb-5">
              <div className="col-md-6 col-lg-5">
                <div className="card shadow-lg border-0 rounded-3">
                  <div className="card-body p-4 p-md-5">
                    <h2 className="text-center mb-4 fw-bold" style={{ color: '#277a6f' }}>
                      Inicia sesión
                    </h2>
                    <form onSubmit={handleLogin}>
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="upload-input mb-3"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="upload-input mb-3"
                        required
                      />
                      <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {userId && (
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
                          onChange={(e) => {
                            const selected = e.target.files[0];
                            if (!selected) return;
                            if (videoFile) {
                              const confirmReplace = window.confirm(
                                'Ya seleccionaste un video. ¿Deseas reemplazarlo?'
                              );
                              if (!confirmReplace) {
                                e.target.value = null;
                                return;
                              }
                            }
                            setVideoFile(selected);
                          }}
                          style={{ display: 'none' }}
                          disabled={isUploading}
                          required
                        />
                        <span className="text-muted">
                          {videoFile ? `🎥 ${videoFile.name}` : 'Ningún archivo seleccionado'}
                        </span>
                      </div>

                      <button type="submit" className="upload-button" disabled={isUploading}>
                        {isUploading ? 'Subiendo...' : 'Subir'}
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
          )}
        </div>
      </section>
    </>
  );
}
