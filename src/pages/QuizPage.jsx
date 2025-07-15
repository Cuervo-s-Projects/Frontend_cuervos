import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuizForm from '../components/QuizForm';
import '../styles/quiz.css';

function QuizPage() {
    const { id } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/quiz/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQuizData(response.data);
            } catch (error) {
                console.error('Error al obtener el quiz:', error);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleSubmitted = () => {
        setSubmitted(true);
        alert("Formulario enviado");
    };

    return (
        <>
            <header className="bg-white shadow-sm py-3">
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

            <section
                className="d-flex align-items-center"
                style={{
                    minHeight: 'calc(100vh - 64px)',
                    backgroundColor: '#e6f4ea'
                }}
            >
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="card shadow-lg border-1 rounded-4">
                                <div className="card-body p-4 p-md-5">
                                    {!quizData ? (
                                        <div className="text-center">
                                            <h2 className="fw-bold text-danger">Quiz no encontrado</h2>
                                            <p>Verifica el enlace o regresa al <a href="/">inicio</a>.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="text-center mb-4 fw-bold" style={{ color: '#277a6f' }}>
                                                {quizData.title}
                                            </h2>

                                            <QuizForm quizData={quizData} onSubmitted={handleSubmitted} />

                                            {submitted && (
                                                <div className="alert alert-success text-center mt-4">
                                                    Formulario enviado exitosamente
                                                </div>
                                            )}

                                            <hr className="my-4" />

                                            <p className="text-center text-muted mb-0">
                                                Puedes regresar al{' '}
                                                <a href="/" className="fw-bold" style={{ color: '#5fcf80' }}>
                                                    inicio
                                                </a>
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-dark text-white-50 py-4 mt-0">
                <div className="container text-center">
                    <p className="mb-0">&copy; 2025 EducaRural. Todos los derechos reservados.</p>
                </div>
            </footer>
        </>
    );
}

export default QuizPage;