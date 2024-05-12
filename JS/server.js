const { MongoClient } = require('mongodb');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const requestBody = JSON.parse(event.body);

  const { nombre, apellido, email, edad, genero, contrasena } = requestBody;

  const mongoURI = 'mongodb+srv://Mantis:hv218g5tOpJ6rFYA@mantis.ptscjte.mongodb.net';

  try {
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('test');
    const usuariosCollection = db.collection('formulario');
    await usuariosCollection.insertOne({ nombre, apellido, email, edad, genero, contrasena });
    client.close();
    
    return {
      statusCode: 200,
      body: 'Registro exitoso',
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Error interno del servidor',
    };
  }
};
