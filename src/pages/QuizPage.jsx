import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserTopMenu from '../components/UserTopMenu';
import '../styles/quiz.css';

const QuizPage = () => {
  const { videoId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Cargar respuestas guardadas
  useEffect(() => {
    const storedAnswers = localStorage.getItem(`quiz-answers-${videoId}`);
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, [videoId]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5002/api/class/quiz/${videoId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuiz(response.data);
      } catch (err) {
        console.error('Error fetching quiz:', err);
      }
    };

    fetchQuiz();
  }, [videoId]);

  const handleOptionChange = (questionIndex, selectedOption) => {
    const updatedAnswers = { ...answers, [questionIndex]: selectedOption };
    setAnswers(updatedAnswers);
    localStorage.setItem(`quiz-answers-${videoId}`, JSON.stringify(updatedAnswers));
  };

  const handleSubmit = () => {
    let totalScore = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        totalScore += question.value || 1;
      }
    });
    setScore(totalScore);
    setSubmitted(true);
  };

  if (!quiz) {
    return (
      <>
        <UserTopMenu />
        <div className="container text-center mt-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando cuestionario...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <UserTopMenu />
      <div className="container py-5">
        <div className="card shadow rounded-4 p-4">
          <h2 className="mb-4 text-center text-success fw-bold">{quiz.title}</h2>

          {quiz.questions.map((question, index) => (
            <div key={index} className="mb-4">
              <h5>{index + 1}. {question.question}</h5>
              {question.options.map((option, i) => (
                <div className="form-check" key={i}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${index}`}
                    id={`q${index}-option${i}`}
                    value={option}
                    onChange={() => handleOptionChange(index, option)}
                    disabled={submitted}
                    checked={answers[index] === option}
                  />
                  <label className="form-check-label" htmlFor={`q${index}-option${i}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}

          {!submitted ? (
            <div className="text-center">
              <button className="btn btn-lg btn-success px-5" onClick={handleSubmit}>
                Enviar respuestas
              </button>
            </div>
          ) : (
            <div className="alert alert-info text-center fw-bold mt-4">
              ¡Puntaje obtenido: {score}!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;
