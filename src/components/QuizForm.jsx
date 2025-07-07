import { useState } from 'react';
import '../styles/quiz.css';

function QuizForm({ quizData, onSubmit }) {
    const [answers, setAnswers] = useState(Array(quizData.questions.length).fill(''));

    const handleChange = (questionIndex, optionLetter) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = optionLetter;
        setAnswers(newAnswers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí se pasa como ["a", "c", "b"]
        onSubmit(answers);
    };

    const optionLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    return (
        <form className="quiz-form" onSubmit={handleSubmit}>

            {quizData.questions.map((q, index) => (
                <div key={index} className="question-block">
                    <p className="question">{index + 1}. {q.text}</p>
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