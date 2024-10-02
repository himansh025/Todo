// actions.js
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './constant.js';

export const addTodo = (todo) => ({
    type: ADD_TODO,
    payload: todo
});

export const removeTodo = (id) => ({
    type: REMOVE_TODO,
    payload: id
});

export const updateTodo = (id, updatedTodo) => ({
    type: UPDATE_TODO,
    payload: { id, updatedTodo }
});
