import LoginForm from '../components/LoginForm';
import '../styles/login.css';

function LoginPage() {
    return (
        <div className="login-page">
            <h2>Iniciar Sesi�n</h2>
            <LoginForm />
        </div>
    );
}

export default LoginPage;