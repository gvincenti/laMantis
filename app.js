const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'roundhouse.proxy.rlwy.net',
  port: 15764,
  user: 'root',
  password: 'DqoRDngZYJHBrypaZOOitVVLYoTdIivh',
  database: 'railway',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al conectar con la base de datos:', err.message);
      return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
  
    // Realiza consultas u operaciones aquí usando la conexión
  
    connection.release(); // Libera la conexión
  });
  
// Resto de tu código para manejar las consultas y rutas


// Middleware para procesar JSON y formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Manejar la solicitud GET a la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejar la solicitud POST desde el formulario
app.post('/register', (req, res) => {
  const { firstName, lastName, age, email, password } = req.body;

  // Ejecutar la consulta SQL para insertar el usuario
  const sql = 'INSERT INTO users (firstName, lastName, age, email, password) VALUES (?, ?, ?, ?, ?)';
  pool.query(sql, [firstName, lastName, age, email, password], (err, result) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    console.log('Usuario registrado exitosamente');
    res.status(200).json({ message: 'Usuario registrado exitosamente' });
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
