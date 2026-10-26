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

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id;
    const updatedTask = (req.body as { task: string }).task;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedTask);
    res.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};