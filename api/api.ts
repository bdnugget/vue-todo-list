import express, { Request, Response } from 'express';
import type { TaskType } from '../src/types/types';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const tasks: TaskType[] = [];

app.get('/api/tasks', (_: Request, res: Response) => {
  res.json(tasks);
});

app.post('/api/tasks', (req: Request, res: Response) => {
  const newTask: TaskType = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.delete('/api/tasks/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        res.json({ message: 'Task removed' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.delete('/api/tasks', (req: Request, res: Response) => {
    const ids: number[] = req.body;
    ids.forEach((id) => {
        const index = tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
        }
    });
    res.json({ message: 'Tasks removed' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
