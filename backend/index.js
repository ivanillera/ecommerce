// index.js
// Iniciar backend con node index.js

const express = require('express');
const app = express();
const PORT = 3001; // Puedes usar el puerto que desees

app.get('/', (req, res) => {
  res.send('¡Hola desde el backend!');
});

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});
