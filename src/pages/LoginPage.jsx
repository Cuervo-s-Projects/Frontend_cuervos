import LoginForm from '../components/LoginForm';
import TopMenu from '../components/TopMenu';
import '../styles/login.css';

function LoginPage() {
    return (
        <>
            <TopMenu />
            <div className="login-page">
                <h1>Iniciar Sesión</h1>
                <LoginForm />
                <p>¿No tienes una cuenta? <a href="/signup">Regístrate aquí</a></p>
            </div>
        </>
    );
}

export default LoginPage;