const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const tasks = [];
let nextId = 1;

// GET /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = {
    id: nextId++,
    title
  };

  tasks.push(task);
  res.status(201).json(task);
});

// GET /tasks/:id
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json(task);
});

// PATCH /tasks/:id
app.patch('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (req.body.title) {
    task.title = req.body.title;
  }

  res.json(task);
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }

  tasks.splice(index, 1);

  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});