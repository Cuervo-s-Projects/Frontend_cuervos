import QuizForm from '../components/QuizForm';
import '../styles/quiz.css';

function QuizPage() {
    // Datos mock simulando respuesta del backend
    const quizData = {
        title: "Evaluación de pokemones",
        questions: [
            {
                id: 1,
                text: "¿De qué tipo es Corviknight?",
                options: ["Volador / Acero", "Volador / Siniestro", "Volador", "Acero / Siniestro", "Agua", "Ninguna de las anteriores"]
            },
            {
                id: 2,
                text: "¿Qué otro Pokémon cuervo existe?",
                options: ["Hailcrow", "Bullaby", "Murkrow"]
            },
            {
                id: 3,
                text: "¿Nombre del Pokémon ciempiés venenoso?",
                options: ["Centiskorhc", "Schizophrenia", "Scoliosis", "Scolipede"]
            }
        ]
    };

    const handleSubmit = (answers) => {
        console.log("Respuestas del estudiante:", answers);
        // Aquí iría el envío real al backend
        alert("Formulario enviado");
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