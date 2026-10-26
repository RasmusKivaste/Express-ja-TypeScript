import { Router } from 'express';
import { createTodo } from '../controllers/todos.js';

const router = Router();

router.post('/', createTodo);

export default router;