// src/pages/MainPage.jsx
import '../styles/mainPage.css';
import VideoGrid from '../components/VideoGrid';
import SideDecor from '../components/SideDecor';
import TopMenu from '../components/TopMenu';
import UserTopMenu from '../components/UserTopMenu';

function MainPage() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      {isLoggedIn ? <UserTopMenu /> : <TopMenu />}

      {/* Hero Section */}
      <section className="hero bg-light py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold text-success">Bienvenido a EducaRural</h1>
          <p className="lead text-muted">
            Explora videos educativos, cuentos mágicos y juegos divertidos.
          </p>
          <a href="/search" className="btn btn-success btn-lg mt-3">Explorar</a>
          <a href="/quiz" className="btn btn-success btn-lg mt-3">Quiz Mock</a>
        </div>
      </section>

      {/* Main Content */}
      <section className="video-section py-5">
        <div className="container">
          <h2 className="mb-4 text-center text-secondary"></h2>
          <div className="row">
            <VideoGrid />
          </div>
        </div>
      </section>

      {/* SideDecor opcional */}
      <SideDecor />

      {/* Footer */}
      <footer className="bg-dark text-white-50 py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">&copy; 2025 EducaRural. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default MainPage;
