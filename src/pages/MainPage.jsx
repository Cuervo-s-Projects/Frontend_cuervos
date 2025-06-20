// src/pages/MainPage.jsx
import '../styles/mainPage.css';
import VideoGrid from '../components/VideoGrid';
import SideDecor from '../components/SideDecor';
import TopMenu from '../components/TopMenu';

function MainPage() {
    return (
        <>
            <TopMenu />
            <div className="main-page">       
                <SideDecor />
                <h1>Bienvenido a EducaRural</h1>
                <p>Explora y aprende con nosotros</p>
                <VideoGrid />
                {/* Aquí irán más cosas */}
            </div>
        </>
    );
}

export default MainPage;
