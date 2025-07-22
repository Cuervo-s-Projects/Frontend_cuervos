import React from 'react';

const SubmitQuiz = ({ result, quizId }) => {
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No se encontró token. Por favor inicia sesión.');
        return;
      }

      const response = await fetch('http://localhost:5003/api/class/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          quiz_id: quizId,
          result: result
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al enviar resultados:', errorData);
        alert('Error al enviar resultados');
        return;
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      alert('Respuestas enviadas correctamente');

    } catch (error) {
      console.error('Error en el envío:', error);
      alert('Error en el envío');
    }
  };

  return (
    <div className="text-center mt-4">
      <button onClick={handleSubmit} className="btn btn-success">
        Enviar respuestas
      </button>
    </div>
  );
};

export default SubmitQuiz;
