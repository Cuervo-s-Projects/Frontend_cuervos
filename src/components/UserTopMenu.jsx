// src/components/UserTopMenu.jsx
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/smart_crow.png';
import '../styles/topMenu.css';

function UserTopMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
              <Link to="/profile" className="nav-link text-dark fw-semibold">Perfil</Link>
            </li>
            <li className="nav-item">
              <Link to="/upload" className="nav-link text-dark fw-semibold">Subir Video</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger px-4" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UserTopMenu;
