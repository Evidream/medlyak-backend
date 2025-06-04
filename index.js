import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Инициализация Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Простой GET
app.get('/', (req, res) => {
  res.send('💌 Медляк запущен. Всё работает!');
});

// Получение всех сообщений
app.get('/messages', async (req, res) => {
  const { data, error } = await supabase.from('messages').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Создание нового сообщения
app.post('/messages', async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;
  const { data, error } = await supabase
    .from('messages')
    .insert([{ sender_id, receiver_id, content }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Медляк запущен на http://localhost:${port}`);
});
