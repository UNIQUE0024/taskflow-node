const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/tasks', (req, res) => res.json(tasks));
app.post('/tasks', (req, res) => {
  if (!req.body.title) return res.status(400).json({ error: 'title required' });
  const task = { id: nextId++, title: req.body.title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on ${port}`));
}