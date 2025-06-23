// src/pages/SignupPage.jsx
import SignupForm from '../components/SignupForm';
import TopMenu from '../components/TopMenu';
import '../styles/signup.css';

function SignupPage() {
  return (
    <>
      <TopMenu />

      <section className="d-flex align-items-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-lg border-0 rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h2 className="text-center mb-4 fw-bold" style={{ color: '#277a6f' }}>
                    ¡Crea tu cuenta!
                  </h2>
                  <p className="text-center text-muted mb-5">
                    Regístrate para comenzar tu viaje educativo con nosotros
                  </p>
                  <SignupForm />

                  <hr className="my-4" />

                  <p className="text-center text-muted mb-0">
                    ¿Ya tienes una cuenta?{' '}
                    <a href="/login" className="fw-bold" style={{ color: '#5fcf80' }}>
                      Inicia sesión aquí
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignupPage;
