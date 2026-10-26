import { RequestHandler } from 'express';
import { Todo } from '../models/todo.js';

class TodoController {
    private todos: Todo[] = [];

    // Kasutame arrow funktsioone, siis ei pea .bind(this) tegema.
    createTodo: RequestHandler = (req, res, next) => {
        const task = (req.body as { task: string }).task;
        const newTodo = new Todo(Math.random().toString(), task);
        
        this.todos.push(newTodo);

        res.status(201).json({
            message: 'Created the todo.',
            createdTodo: newTodo
        });
    };

    getTodos: RequestHandler = (req, res, next) => {
        res.json({ todos: this.todos });
    };

    updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
        const todoId = req.params.id;
        const updatedTask = (req.body as { task: string }).task;
        const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

        if (todoIndex < 0) {
            throw new Error('Could not find todo!');
        }

        this.todos[todoIndex] = new Todo(this.todos[todoIndex].id, updatedTask);
        res.json({ message: 'Updated!', updatedTodo: this.todos[todoIndex] });
    };

    deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
        const todoId = req.params.id;
        const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

        if (todoIndex < 0) {
            throw new Error('Could not find todo!');
        }

        this.todos.splice(todoIndex, 1);
        res.json({ message: 'Todo deleted!' });
    };
}

export const todoController = new TodoController();