// src/components/VideoCard.jsx
import '../styles/videoGrid.css';

export default function VideoCard({ title, thumbnailId }) {
  const thumbnailUrl = thumbnailId
    ? `http://localhost:5001/thumbnail/${thumbnailId}`
    : 'https://via.placeholder.com/320x180?text=Sin+Thumbnail';

  return (
    <div className="video-card">
      <img src={thumbnailUrl} alt={title} className="thumbnail" />
      <h3 className="video-title">{title}</h3>
    </div>
  );
}
