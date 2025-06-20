import { useState } from 'react';
import '../styles/upload.css';
import TopMenu from '../components/TopMenu';

export default function UploadPage() {
    const [videoTitle, setVideoTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!videoTitle || !videoFile) {
            setMessage('❌ Completa todos los campos');
            return;
        }

        // Aquí puedes implementar la lógica para enviar el archivo
        console.log('Subiendo:', videoTitle, videoFile);
        setMessage('✅ Video subido correctamente (simulado)');
    };

    return (
        <>
            <TopMenu />
            <div className="upload-page">
                <h1>Subir Video</h1>
                <form onSubmit={handleSubmit}>
                    <label>Título del video:</label>
                    <input
                        type="text"
                        placeholder="Nombre del video"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                    />

                    <label>Seleccionar archivo de video:</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files[0])}
                    />

                    <button type="submit">Subir</button>
                    {message && <p className="upload-message">{message}</p>}
                </form>
            </div>
        </>
        
    );
}