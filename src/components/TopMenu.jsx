import '../styles/topMenu.css';
import logo from '../assets/smart_crow.png';
import { Link } from 'react-router-dom';

function TopMenu() {
  const isLoggedIn = !!localStorage.getItem('token'); // true si el token existe

  if (isLoggedIn) {
    return null; // No renderizar si ya inició sesión
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src={logo} alt="EducaRural Logo" height="40" />
          <span className="fw-bold fs-4 text-success">EducaRural</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav gap-3 align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link text-dark fw-semibold">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="btn btn-success px-4 me-2">Iniciar Sesión</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="btn btn-success px-4">Registrarse</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TopMenu;
