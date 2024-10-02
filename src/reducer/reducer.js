// reducer.js
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../actions/constant';

const initialState = {
    todos: []
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, ...action.payload.updatedTodo } : todo
                )
            };
        default:
            return state;
    }
};

export default todoReducer;
