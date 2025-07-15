import { useParams } from 'react-router-dom';
import QuizForm from '../components/QuizForm';
import '../styles/quiz.css';

function QuizPage() {
    const { id } = useParams(); // ID dinámico desde la URL

    // Mock de quizzes (esto luego hay que traerlo del back)
    const mockQuizzes = {
        1: {
        title: "Evaluación de pokemones",
        questions: [
            {
                id: 1,
                text: "¿De qué tipo es Corviknight?",
                    options: ["Volador / Acero", "Volador / Siniestro", "Volador", "Acero / Siniestro", "Agua", "Ninguna de las anteriores"],
                    correct: "a"
            },
            {
                id: 2,
                text: "¿Qué otro Pokémon cuervo existe?",
                    options: ["Hailcrow", "Bullaby", "Murkrow"],
                    correct: "c"
            },
            {
                id: 3,
                text: "¿Nombre del Pokémon ciempiés venenoso?",
                    options: ["Centiskorhc", "Schizophrenia", "Scoliosis", "Scolipede"],
                    correct: "d"
            }
        ]
        },
        2: {
            title: "Quiz de Historia",
            questions: [
                {
                    id: 1,
                    text: "¿Quién descubrió América?",
                    options: ["Simón Bolívar", "Cristóbal Colón", "Napoleón Bonaparte"],
                    correct: "b"
                }
            ]
        }
    };

    const quizData = mockQuizzes[id];

    const handleSubmit = (answers) => {
        if (!quizData) return;

        const correctAnswers = quizData.questions.map(q => q.correct);
        let score = 0;

        answers.forEach((ans, index) => {
            if (ans === correctAnswers[index]) {
                score++;
            }
        });

        alert(`Formulario enviado\nTu puntuación: ${score}/${quizData.questions.length}`);
    };

    return (
        <>
            {/* Header de navegación */}
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

            {/* Sección del Quiz */}
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

                                    {/* Si el ID no es válido */}
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

                                    <QuizForm quizData={quizData} onSubmit={handleSubmit} />

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

            {/* Footer */}
            <footer className="bg-dark text-white-50 py-4 mt-0">
                <div className="container text-center">
                    <p className="mb-0">&copy; 2025 EducaRural. Todos los derechos reservados.</p>
                </div>
            </footer>
        </>
    );
}

export default QuizPage;