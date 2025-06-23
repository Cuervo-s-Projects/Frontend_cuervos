// Description: Malla para los videos
import VideoCard from './VideoCard';
import '../styles/videoGrid.css';

// Simulación de videos (puedes reemplazar esto con una API real)
const mockVideos = [
    { title: 'Video 1', thumbnail: 'https://via.placeholder.com/320x180' },
    { title: 'Video 2', thumbnail: 'https://via.placeholder.com/320x180' },
    { title: 'Video 3', thumbnail: 'https://via.placeholder.com/320x180' },
    { title: 'Video 4', thumbnail: 'https://via.placeholder.com/320x180' },
    { title: 'Video 5', thumbnail: 'https://via.placeholder.com/320x180' },
];

export default function VideoGrid() {
    return (
        <div className="video-grid">
            {mockVideos.map((video, index) => (
                <VideoCard key={index} title={video.title} thumbnail={video.thumbnail} />
            ))}
        </div>
    );
}
