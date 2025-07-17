import { useState } from 'react';
import axios from 'axios';

function QuizCreatorPage() {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleAddQuestion = () => {
        setQuestions([...questions, {
            question: '',
            options: ['', '', ''],
            correct: '',
            value: 10
        }]);
    };

    const handleQuestionChange = (index, field, value) => {
        const updated = [...questions];
        updated[index][field] = value;
        setQuestions(updated);
    };

    const handleOptionChange = (qIndex, optIndex, value) => {
        const updated = [...questions];
        updated[qIndex].options[optIndex] = value;
        setQuestions(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post('http://localhost:5002/api/class/create', {
                title,
                questions
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Quiz creado exitosamente');
            setTitle('');
            setQuestions([]);
        } catch (error) {
            console.error('Error completo:', error);
            console.error('Response status:', error.response?.status);
            console.error('Response data:', error.response?.data);  // ← Este es el más importante
            console.error('Response headers:', error.response?.headers);

            const errorMessage = error.response?.data?.message || 'Hubo un error al crear el quiz';
            alert(errorMessage);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
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

            {/* Contenido principal con fondo */}
            <section
                className="flex-grow-1 d-flex align-items-start"
                style={{
                    backgroundColor: '#e6f4ea',
                    flex: 1,
                    paddingTop: '40px',
                    paddingBottom: '40px'
                }}
            >
                <main className="container">
                    <h2 className="mb-4">Crear un nuevo Quiz</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Titulo del Quiz</label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        {questions.map((q, qIndex) => (
                            <div key={qIndex} className="border p-3 mb-4 rounded bg-white">
                                <div className="mb-2">
                                    <label className="form-label">Pregunta {qIndex + 1}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={q.question}
                                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Opciones</label>
                                    {q.options.map((opt, optIndex) => (
                                        <input
                                            key={optIndex}
                                            type="text"
                                            className="form-control mb-1"
                                            placeholder={`Opcion ${optIndex + 1}`}
                                            value={opt}
                                            onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                                            required
                                        />
                                    ))}
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Respuesta Correcta</label>
                                    <input
                                        type="text"
                                        className="form-control correct"
                                        value={q.correct}
                                        onChange={(e) => handleQuestionChange(qIndex, 'correct', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Valor</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={q.value}
                                        onChange={(e) => handleQuestionChange(qIndex, 'value', e.target.value)}
                                        required
                                        min="1"
                                    />
                                </div>
                            </div>
                        ))}

                        <button type="button" className="btn btn-secondary me-2" onClick={handleAddQuestion}>
                            Agregar Pregunta
                        </button>
                        <button type="submit" className="btn btn-primary">Guardar Quiz</button>
                    </form>
                </main>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white-50 py-4 mt-0">
                <div className="container text-center">
                    <p className="mb-0">&copy; 2025 EducaRural. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default QuizCreatorPage;