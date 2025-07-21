import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserTopMenu from '../components/UserTopMenu';
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  Form,
  Row,
  Col,
  InputGroup,
  Alert
} from 'react-bootstrap';
import { useUnsavedChangesWarning } from '../hooks/useUnsavedChangesWarning';

const FormCreatePage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [changesMade, setChangesMade] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [hasUnsavedData, setHasUnsavedData] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Clave única para el localStorage
  const storageKey = `form-draft-${videoId}`;

  // Advertencia al salir sin guardar
  useUnsavedChangesWarning(changesMade);

  // Función para cargar datos temporales
  const loadTemporalData = useCallback(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        if (parsed.title) {
          setTitle(parsed.title);
        }
        if (parsed.questions && Array.isArray(parsed.questions)) {
          setQuestions(parsed.questions);
        }
        if (parsed.timestamp) {
          setLastSaved(new Date(parsed.timestamp));
        }
        
        setHasUnsavedData(true);
        toast.info('Se cargaron datos guardados temporalmente');
      }
    } catch (err) {
      console.error('Error al leer localStorage:', err);
      localStorage.removeItem(storageKey); // Limpiar datos corruptos
    }
  }, [storageKey]);

  // Función para guardar datos temporalmente
  const saveTemporalData = useCallback((titleToSave, questionsToSave) => {
    try {
      const dataToSave = {
        title: titleToSave,
        questions: questionsToSave,
        timestamp: new Date().toISOString(),
        videoId: videoId
      };
      
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
      setLastSaved(new Date());
    } catch (err) {
      console.error('Error al guardar en localStorage:', err);
      toast.error('Error al guardar temporalmente');
    }
  }, [storageKey, videoId]);

  // Función para limpiar datos temporales
  const clearTemporalData = useCallback(() => {
    localStorage.removeItem(storageKey);
    setHasUnsavedData(false);
    setLastSaved(null);
  }, [storageKey]);

  // Cargar datos temporales al montar el componente
  useEffect(() => {
    loadTemporalData();
  }, [loadTemporalData]);

  // Guardar automáticamente cada cambio (con debounce)
  useEffect(() => {
    if (title.trim() || questions.length > 0) {
      const timeoutId = setTimeout(() => {
        saveTemporalData(title, questions);
        setChangesMade(true);
      }, 1000); // Guardar después de 1 segundo sin cambios

      return () => clearTimeout(timeoutId);
    }
  }, [title, questions, saveTemporalData]);

  // Limpiar al desmontar si no hay cambios importantes
  useEffect(() => {
    return () => {
      // Solo limpiar si no hay contenido significativo
      if (!title.trim() && questions.length === 0) {
        clearTemporalData();
      }
    };
  }, [title, questions, clearTemporalData]);

  const handleAddQuestion = () => {
    if (questions.length >= 20) {
      toast.warning('Máximo 20 preguntas');
      return;
    }

    setQuestions([
      ...questions,
      {
        text: '',
        options: ['', ''], // Iniciar con 2 opciones vacías
        correctAnswer: '',
        value: 1
      }
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const confirmDelete = window.confirm('¿Eliminar esta pregunta? Se perderá su contenido.');
    if (!confirmDelete) return;

    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleQuestionTextChange = (index, value) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    
    // Si la opción que se está editando era la respuesta correcta, actualizarla
    if (updated[qIndex].correctAnswer === updated[qIndex].options[oIndex]) {
      updated[qIndex].correctAnswer = value;
    }
    
    setQuestions(updated);
  };

  const handleAddOption = (qIndex) => {
    const updated = [...questions];
    if (updated[qIndex].options.length >= 10) {
      toast.warning('Máximo 10 opciones por pregunta');
      return;
    }
    updated[qIndex].options.push('');
    setQuestions(updated);
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const updated = [...questions];
    const removedOption = updated[qIndex].options[oIndex];
    
    // Si la opción eliminada era la respuesta correcta, resetear
    if (updated[qIndex].correctAnswer === removedOption) {
      updated[qIndex].correctAnswer = '';
    }
    
    updated[qIndex].options.splice(oIndex, 1);
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value;
    setQuestions(updated);
  };

  const handleQuestionValueChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].value = Number(value);
    setQuestions(updated);
  };

  const validateForm = () => {
    if (!title.trim()) {
      toast.error('El título es requerido');
      return false;
    }

    if (questions.length === 0) {
      toast.error('Debe agregar al menos una pregunta');
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      
      if (!q.text.trim()) {
        toast.error(`La pregunta ${i + 1} no puede estar vacía`);
        return false;
      }

      if (q.options.length < 2) {
        toast.error(`La pregunta ${i + 1} debe tener al menos 2 opciones`);
        return false;
      }

      const nonEmptyOptions = q.options.filter(opt => opt.trim());
      if (nonEmptyOptions.length < 2) {
        toast.error(`La pregunta ${i + 1} debe tener al menos 2 opciones con contenido`);
        return false;
      }

      if (!q.correctAnswer.trim()) {
        toast.error(`Debe seleccionar la respuesta correcta para la pregunta ${i + 1}`);
        return false;
      }

      if (!q.options.includes(q.correctAnswer)) {
        toast.error(`La respuesta correcta de la pregunta ${i + 1} no es válida`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      title: title.trim(),
      video_id: videoId,
      questions: questions.map(q => ({
        ...q,
        text: q.text.trim(),
        options: q.options.filter(opt => opt.trim()),
        correctAnswer: q.correctAnswer.trim()
      }))
    };

    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast.success('Cuestionario guardado con éxito');
        clearTemporalData();
        setChangesMade(false);
        navigate('/');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al guardar el cuestionario');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error de red al guardar');
    }
  };

  const handleClearDraft = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar el borrador? Se perderán todos los datos.')) {
      setTitle('');
      setQuestions([]);
      clearTemporalData();
      setChangesMade(false);
      toast.info('Borrador limpiado');
    }
  };

  return (
    <>
      <UserTopMenu />
      <div className="container mt-4">
        <Card className="shadow">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-success mb-0">Crear Cuestionario</h2>
              {hasUnsavedData && (
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={handleClearDraft}
                >
                  Limpiar borrador
                </Button>
              )}
            </div>

            {lastSaved && (
              <Alert variant="info" className="mb-4">
                <small>
                  Última vez guardado temporalmente: {lastSaved.toLocaleString()}
                </small>
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formTitle" className="mb-4">
                <Form.Label>Título del cuestionario *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa un título para el cuestionario"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>

              {questions.map((q, qIndex) => (
                <Card className="mb-4" key={qIndex} border="secondary">
                  <Card.Body>
                    <Row className="mb-3">
                      <Col>
                        <Form.Label className="fw-bold">
                          Pregunta {qIndex + 1} *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Escribe tu pregunta aquí"
                          value={q.text}
                          onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                          required
                        />
                      </Col>
                      <Col md="auto">
                        <Button
                          variant="outline-danger"
                          className="mt-4"
                          onClick={() => handleRemoveQuestion(qIndex)}
                          title="Eliminar pregunta"
                        >
                          🗑️ Eliminar
                        </Button>
                      </Col>
                    </Row>

                    <Form.Label className="fw-bold">Opciones de respuesta:</Form.Label>
                    {q.options.map((opt, oIndex) => (
                      <InputGroup className="mb-2" key={oIndex}>
                        <Form.Control
                          type="text"
                          placeholder={`Opción ${oIndex + 1}`}
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e.target.value)
                          }
                          required
                        />
                        {q.options.length > 2 && (
                          <Button
                            variant="outline-danger"
                            onClick={() => handleRemoveOption(qIndex, oIndex)}
                            title="Eliminar opción"
                          >
                            ✕
                          </Button>
                        )}
                      </InputGroup>
                    ))}

                    <Row className="mt-3">
                      <Col>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleAddOption(qIndex)}
                          disabled={q.options.length >= 10}
                        >
                          + Añadir opción
                        </Button>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={6}>
                        <Form.Label>Respuesta correcta *</Form.Label>
                        <Form.Select
                          value={q.correctAnswer}
                          onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                          required
                        >
                          <option value="">Seleccionar respuesta correcta</option>
                          {q.options.map((opt, oIndex) => (
                            opt.trim() && (
                              <option key={oIndex} value={opt}>
                                {opt.length > 50 ? opt.substring(0, 50) + '...' : opt}
                              </option>
                            )
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={3}>
                        <Form.Label>Puntuación</Form.Label>
                        <Form.Control
                          type="number"
                          min={1}
                          max={100}
                          value={q.value}
                          onChange={(e) => handleQuestionValueChange(qIndex, e.target.value)}
                          placeholder="Puntos"
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}

              <div className="d-flex flex-column align-items-center gap-3">
                <Button
                  variant="success"
                  onClick={handleAddQuestion}
                  disabled={questions.length >= 20}
                >
                  + Añadir pregunta ({questions.length}/20)
                </Button>

                <div className="d-flex gap-2">
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => navigate('/')}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={questions.length === 0}
                  >
                    Guardar cuestionario
                  </Button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default FormCreatePage;