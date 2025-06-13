// src/api.js
const API_URL = 'https://back-egipto.onrender.com';

export const obtenerComentarios = async () => {
  const res = await fetch(`${API_URL}/comentarios`);
  if (!res.ok) throw new Error('Error al obtener comentarios');
  return await res.json();
};

export const agregarComentario = async (comentario) => {
  const res = await fetch(`${API_URL}/comentarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comentario)
  });
  if (!res.ok) throw new Error('Error al agregar comentario');
  return await res.json();
};
