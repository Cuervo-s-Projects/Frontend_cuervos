import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserTopMenu from '../components/UserTopMenu';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';

const QuizResultPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState('');
  const [error, setError] = useState('');
  const [videoId, setVideoId] = useState('');
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  const navigate = useNavigate();

  const API_URL =
    typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL
      : 'http://localhost:5003';

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/class/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const quizResponse = response.data.course.find(
          (entry) => entry.quiz_id && entry.results
        );

        console.log('Respuesta completa del backend:', response.data);

        if (quizResponse) {
          const resultList = quizResponse.results;
          setResults(resultList);
          setQuizTitle(quizResponse.quiz_id?.title || 'Resultados del cuestionario');
          setVideoId(quizResponse.quiz_id?.video_id || '');

          // Calcular puntaje
          const total = resultList.reduce((acc, item) => acc + (item.value || 1), 0);
          const scored = resultList.reduce(
            (acc, item) => acc + ((item.result && item.value) || 0),
            0
          );
          setScore(scored);
          setMaxScore(total);
        } else {
          setError('No se encontraron resultados para este cuestionario.');
        }
      } catch (err) {
        console.error(err);
        setError('Hubo un error al cargar los resultados.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResults();
  }, [API_URL]);

  const handleGoBack = () => {
    if (videoId) {
      navigate(`/video/${videoId}`);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <UserTopMenu />
      <Container className="mt-5">
        <h2 className="text-center mb-4">{quizTitle}</h2>
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
            <p>Cargando resultados...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : (
          <>
            <Alert variant="info" className="text-center">
              <strong>Puntuación total:</strong> {score} / {maxScore}
            </Alert>
            {results.map((item, index) => (
              <Card
                key={index}
                className={`mb-3 border ${
                  item.result ? 'border-success' : 'border-danger'
                }`}
              >
                <Card.Body>
                  <Card.Title>
                    Pregunta {index + 1}: {item.question}
                  </Card.Title>
                  <Card.Text>
                    <strong>Tu respuesta:</strong>{' '}
                    <span className={item.result ? 'text-success' : 'text-danger'}>
                      {item.selected}
                    </span>
                    <br />
                    {!item.result && (
                      <>
                        <strong>Respuesta correcta:</strong> {item.correct}
                        <br />
                      </>
                    )}
                    <strong>Puntaje:</strong> {item.result ? item.value || 1 : 0}
                  </Card.Text>
                  <Alert variant={item.result ? 'success' : 'danger'} className="mt-2">
                    {item.result ? '✅ Correcta' : '❌ Incorrecta'}
                  </Alert>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
        {!loading && !error && (
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleGoBack}>
              Volver al inicio
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default QuizResultPage;
