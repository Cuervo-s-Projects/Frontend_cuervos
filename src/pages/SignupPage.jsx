// src/pages/SignupPage.jsx
import SignupForm from '../components/SignupForm';
import TopMenu from '../components/TopMenu';
import '../styles/signup.css';

function SignupPage() {
    return (
        <>
            <TopMenu />
            <div className="signup-page">
                <h2>Crear Cuenta</h2>
                <SignupForm />
            </div>
        </>
        
    );
}

export default SignupPage;