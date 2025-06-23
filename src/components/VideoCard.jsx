// Tarjeta de video para mostrar en la cuadrícula de videos
import '../styles/videoGrid.css';

export default function VideoCard({ title, thumbnail }) {
    return (
        <div className="video-card">
            <img src={thumbnail} alt={title} className="thumbnail" />
            <h3 className="video-title">{title}</h3>
        </div>
    );
}
