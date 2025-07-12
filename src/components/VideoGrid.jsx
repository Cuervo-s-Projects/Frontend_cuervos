import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCard from './VideoCard';
import '../styles/videoGrid.css';

export default function VideoGrid() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/videos')
      .then((res) => res.json())
      .then((data) => {
        setVideos((data.videos || []).slice(0, 20));
      })
      .catch((err) => {
        console.error('Error fetching videos:', err);
      });
  }, []);

  const handleClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="video-grid">
      {videos.length > 0 ? (
        videos.map((video) => (
          <div
            key={video._id}
            className="video-card-wrapper"
            onClick={() => handleClick(video._id)}
            style={{ cursor: 'pointer' }}
          >
            <VideoCard title={video.title} thumbnailId={video.thumbnail_id} />
          </div>
        ))
      ) : (
        <p>No hay videos disponibles.</p>
      )}
    </div>
  );
}
