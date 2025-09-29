import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());

const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'shopdb'
});

await db.query(`
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2)
  )
`);

app.get('/products', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM products');
  res.json(rows);
});

app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
  res.json({ message: 'Product added' });
});

app.put('/products/:id', async (req, res) => {
  const { name, price } = req.body;
  await db.query('UPDATE products SET name=?, price=? WHERE id=?', [name, price, req.params.id]);
  res.json({ message: 'Product updated' });
});

app.delete('/products/:id', async (req, res) => {
  await db.query('DELETE FROM products WHERE id=?', [req.params.id]);
  res.json({ message: 'Product deleted' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Products service running on port ${PORT}`));
