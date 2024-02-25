import express, { Request, Response } from 'express';
import type { TaskType } from '../src/types/types';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const tasks: TaskType[] = [];

app.get('/api/tasks', (_: Request, res: Response) => {
  res.json(tasks);
});

app.post('/api/tasks', (req: Request, res: Response) => {
  const newTask: TaskType = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
