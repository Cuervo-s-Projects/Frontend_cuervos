import { useState } from 'react';
import '../styles/quiz.css';
import axios from 'axios';

function QuizForm({ quizData, onResult }) {
    const [answers, setAnswers] = useState(Array(quizData.questions.length).fill(''));

    const handleChange = (questionIndex, optionLetter) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = optionLetter;
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reply = quizData.questions.map((q, i) => ({
            question: q.question,
            response: answers[i],
        }));

        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5002/api/class/assess`, {
                quiz_id: quizData.quiz_id,
                reply
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            console.error("Error al enviar respuestas:", error);
            alert("Error al enviar el formulario");
        }
    };

    const optionLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    return (
        <form className="quiz-form" onSubmit={handleSubmit}>
            {quizData.questions.map((q, index) => (
                <div key={index} className="question-block">
                    <p className="question">{index + 1}. {q.question}</p>
                    {q.options.map((option, i) => {
                        const letter = optionLetters[i];
                        return (
                            <label key={i} className="option">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={letter}
                                    checked={answers[index] === letter}
                                    onChange={() => handleChange(index, letter)}
                                />
                                <strong>{letter})</strong> {option}
                            </label>
                        );
                    })}
                </div>
            ))}

            <button type="submit" className="submit-btn">Enviar</button>
        </form>
    );
}

export default QuizForm;