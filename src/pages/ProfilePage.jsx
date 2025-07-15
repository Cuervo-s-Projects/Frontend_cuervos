// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserTopMenu from '../components/UserTopMenu';
import VideoCard from '../components/VideoCard';
import '../styles/videoGrid.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);

        // Obtener videos del usuario usando su ID
        if (res.data && res.data._id) {
          const videoRes = await axios.get(`http://localhost:5001/videos?user_id=${res.data._id}`);
          setVideos(videoRes.data.videos || []);
        }
      } catch (err) {
        console.error(err);
        setError('No se pudo obtener el perfil o los videos.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <UserTopMenu />

      <div className="container py-5">
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {!profile && !error && (
          <div className="text-center">
            <div className="spinner-border text-success" role="status" />
            <p className="mt-3">Cargando perfil...</p>
          </div>
        )}

        {profile && (
          <>
            <div className="card shadow-lg border-0 rounded-4 mb-5">
              <div className="card-body p-5">
                <h2 className="text-center mb-4 fw-bold text-success">
                  Perfil del Usuario
                </h2>
                <p className="text-center text-muted mb-4">
                  Esta es la información personal asociada a tu cuenta.
                </p>
                <ul className="list-group list-group-flush fs-5 col-md-8 mx-auto">
                  <li className="list-group-item"><strong>Nombre:</strong> {profile.first_name}</li>
                  <li className="list-group-item"><strong>Apellido:</strong> {profile.last_name}</li>
                  <li className="list-group-item"><strong>Username:</strong> {profile.username}</li>
                  <li className="list-group-item"><strong>Edad:</strong> {profile.age}</li>
                  <li className="list-group-item"><strong>Fecha de nacimiento:</strong> {new Date(profile.date_birth).toLocaleDateString()}</li>
                </ul>
              </div>
            </div>

            {/* Grid de videos del usuario */}
            <h3 className="mb-4 text-success">Tus videos subidos</h3>
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
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
