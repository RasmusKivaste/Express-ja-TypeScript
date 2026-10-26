import { Request, Response, RequestHandler } from 'express';
import { Todo } from '../models/todo.js';

export const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const task = (req.body as { task: string }).task;
    const newTodo = new Todo(Math.random().toString(), task);
    
    TODOS.push(newTodo);

    res.status(201).json({
        message: 'Created the todo.',
        createdTodo: newTodo
    });
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({ todos: TODOS });
};