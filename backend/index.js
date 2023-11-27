// index.js
// Iniciar backend con node index.js
const cors = require('cors');



const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3001;

// URL de conexión de MongoDB Atlas o de tu instalación local
const uri = 'mongodb+srv://ivanillera:123@ecommerce.vevqgmd.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('¡Hola desde el backend!');
});

// Nueva ruta para obtener productos
app.get('/api/products', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('eCommerce');
    const productsCollection = db.collection('products');

    const productos = await productsCollection.find().toArray();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    await client.close();
  }
});
// Ruta para crear un nuevo producto
app.post('/api/products', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('eCommerce');
    const productsCollection = db.collection('products');

    // Recibir datos del cuerpo de la solicitud
    const nuevoProducto = req.body;

    // Insertar el nuevo producto en la base de datos
    const resultado = await productsCollection.insertOne(nuevoProducto);

    // Devolver el ID del nuevo producto
    res.status(201).json({ _id: resultado.insertedId });
  } catch (error) {
    console.error('Error al crear un nuevo producto', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    await client.close();
  }
});
// Ruta para eliminar un producto por su ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId || !ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Se requiere un ID de producto válido' });
    }

    await client.connect();
    const db = client.db('eCommerce');
    const productsCollection = db.collection('products');

    // Verificar si el producto existe antes de intentar eliminarlo
    const existingProduct = await productsCollection.findOne({ _id: new ObjectId(productId) });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Eliminar el producto
    const deletionResult = await productsCollection.deleteOne({ _id: new ObjectId(productId) });

    if (deletionResult.deletedCount === 1) {
      res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } else {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  } catch (error) {
    console.error('Error al eliminar el producto', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    await client.close();
  }
});

// Ruta para actualizar un producto por su ID
app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId || !ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Se requiere un ID de producto válido' });
    }

    const updatedProductData = req.body;

    if (!updatedProductData || Object.keys(updatedProductData).length === 0) {
      return res.status(400).json({ error: 'Se requieren datos válidos para la actualización' });
    }

    await client.connect();
    const db = client.db('eCommerce');
    const productsCollection = db.collection('products');

    // Verificar si el producto existe antes de intentar actualizarlo
    const existingProduct = await productsCollection.findOne({ _id: new ObjectId(productId) });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar el producto
    const updateResult = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updatedProductData }
    );

    if (updateResult.modifiedCount === 1) {
      res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } else {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  } finally {
    await client.close();
  }



  // Rutas de administrador

// Ruta para iniciar sesión (y verificar al administrador)
app.post('/api/admin/login', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('eCommerce');
    const adminCollection = db.collection('admins');

    // Administrador predeterminado (cámbialo según tus necesidades)
    const defaultAdmin = {
      email: 'ivanillera@gmail.com',
      password: 'hola123',
    };

    // Recibir datos del cuerpo de la solicitud
    const { email, password } = req.body;

  // Verificar si las credenciales coinciden con el administrador
  if (email === adminCredentials.email && password === adminCredentials.password) {
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
} catch (error) {
  console.error('Error al iniciar sesión', error);
  res.status(500).json({ error: 'Error interno del servidor' });
}
});

});


// Escucha en el puerto
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});
