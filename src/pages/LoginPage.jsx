import LoginForm from '../components/LoginForm';
import '../styles/login.css';

function LoginPage() {
    return (
        <div className="login-page">
            <h1>Iniciar Sesión</h1>
            <LoginForm />
        </div>
    );
}

export default LoginPage;