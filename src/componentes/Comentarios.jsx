// src/components/Comentarios.jsx
import React, { useEffect, useState } from 'react';
import { obtenerComentarios, agregarComentario } from '../api';

export const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', texto: '', estrellas: 5 });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarComentarios();
  }, []);

  const cargarComentarios = async () => {
    try {
      const data = await obtenerComentarios();
      setComentarios(data);
    } catch (err) {
      setError('No se pudieron cargar los comentarios.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);
      await agregarComentario(form);
      setForm({ nombre: '', texto: '', estrellas: 5 });
      cargarComentarios();
    } catch (err) {
      setError('Error al enviar comentario');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-semibold text-center">Comentarios</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tu nombre"
          title="Ingresa tu nombre completo"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          className="w-full p-2 border rounded-xl"
          required
        />
        <textarea
          placeholder="Escribe tu comentario"
          title="Escribe aquí lo que piensas del servicio ofrecido"
          value={form.texto}
          onChange={(e) => setForm({ ...form, texto: e.target.value })}
          className="w-full p-2 border rounded-xl"
          required
        />
        <input
          type="number"
          min={1}
          max={5}
          title="Califica de 1 a 5 estrellas"
          value={form.estrellas}
          onChange={(e) => setForm({ ...form, estrellas: parseInt(e.target.value) })}
          className="w-full p-2 border rounded-xl"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-xl"
          disabled={cargando}
        >
          {cargando ? 'Enviando...' : 'Enviar comentario'}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-4">
        {comentarios.map((c, i) => (
          <div key={i} className="border p-4 rounded-xl bg-gray-50">
            <p className="font-bold">{c.nombre}</p>
            <p className="text-yellow-600">⭐ {c.estrellas}</p>
            <p>{c.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
