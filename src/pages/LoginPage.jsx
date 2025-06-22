import React from 'react'; // React is implicitly used by JSX, good practice to import
import LoginForm from '../components/LoginForm'; // Assuming you have this component

function LoginPage() {
  return (
    <>
      {/*
        We'll simulate a simple navigation like the template's top bar,
        though without full functionality. For a real app, you'd use a dedicated
        Navbar component from the template or a library.
      */}
      <header className="bg-white shadow-sm py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <a href="/" className="h4 text-decoration-none text-dark mb-0 fw-bold">
            EducaRural
          </a>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link text-dark" href="/">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="/courses">Cursos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="/contact">Contacto</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="d-flex align-items-center" style={{ minHeight: 'calc(100vh - 80px)' }}> {/* Adjusted minHeight for header */}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5"> {/* Slightly wider for better presentation */}
              <div className="card shadow-lg border-0 rounded-3"> {/* Stronger shadow, rounded corners */}
                <div className="card-body p-4 p-md-5"> {/* More padding */}
                  <h2 className="text-center mb-4 fw-bold" style={{ color: '#277a6f' }}>
                    ¡Bienvenida/o de vuelta!
                  </h2>
                  <p className="text-center text-muted mb-5">
                    Inicia sesión para continuar con tu aventura educativa.
                  </p>

                  {/* The LoginForm component goes here */}
                  <LoginForm />

                  <hr className="my-4" /> {/* Separator */}

                  <p className="text-center text-muted mb-0">
                    ¿No tienes cuenta aún?{' '}
                    <a href="/signup" className="fw-bold" style={{ color: '#5fcf80' }}>
                      ¡Registrate aquí!
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Footer inspired by template */}
      <footer className="bg-dark text-white-50 py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">&copy; 2025 Mentor. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default LoginPage;