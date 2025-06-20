// src/components/TopMenu.jsx
import '../styles/topMenu.css';
import logo from '../assets/smart_crow.png';
import { Link } from 'react-router-dom';

function TopMenu() {
  return (
    <div className="top-menu">
      <div className="left-section">
        <Link to="/upload" className="btn">Subir Contenido</Link>
      </div>

      <div className="center-section">
        <Link to="/" className="brand-link">
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand">EducaRural</span>
        </Link>
      </div>

      <div className="right-section">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Registrarse</Link>
      </div>
    </div>
  );
}

export default TopMenu;