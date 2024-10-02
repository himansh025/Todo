import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, updateTodo } from '../actions/actions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';

const TodoComponent = () => {
    const todos = useSelector(state => state.todo.todos);
    const dispatch = useDispatch();
    const [todo, settodo] = useState("");
    const [editingTodoId, setEditingTodoId] = useState(null); // State to track the todo being edited
    const [newTodoText, setNewTodoText] = useState(""); // State for the updated text

    const handleAddTodo = () => {
        if (todo.trim()) {
            dispatch(addTodo({
                id: new Date().getTime(),
                text: todo,
                completed: false
            }));
            settodo(""); // Clear input after adding
        }
    };

    const handleRemoveTodo = (id) => {
        dispatch(removeTodo(id));
    };

    const handleUpdateTodo = (id) => {
        if (newTodoText.trim()) {
            dispatch(updateTodo(id, { text: newTodoText }));
            setEditingTodoId(null); // Exit editing mode
            setNewTodoText(""); // Clear the updated text
        }
    };

    const handleChange = (e) => {
        settodo(e.target.value);
    };

    // const toggleComplete = (id, completed) => {
    //     dispatch(updateTodo(id, { completed: !completed }));
    // };

    const handleEditClick = (todo) => {
        setEditingTodoId(todo.id); // Set the current task to editing mode
        setNewTodoText(todo.text); // Pre-fill the text with the current todo's text
    };

    const handleTodoTextChange = (e) => {
        setNewTodoText(e.target.value);
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-gray-900 text-white rounded-xl shadow-md space-y-4">
            <h1 className="text-3xl font-bold text-center mb-6">Task Reminder</h1>

            {/* Add Task Section */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={todo}
                    onChange={handleChange}
                    placeholder="Write your next task"
                    className="border border-gray-600 p-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={handleAddTodo}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-r-lg flex items-center space-x-2"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add Todo</span>
                </button>
            </div>

            {/* Task List */}
            <ul className="space-y-4">
                {todos.map(todo => (
                    <li key={todo.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                      
                            {editingTodoId === todo.id ? (
                                <input
                                    type="text"
                                    value={newTodoText}
                                    onChange={handleTodoTextChange}
                                    className="ml-3 text-lg bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <span className={`ml-3 text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                    {todo.text}
                                </span>
                            )}
                        </div>
                        <div className="flex space-x-3">
                            {editingTodoId === todo.id ? (
                                <button
                                    onClick={() => handleUpdateTodo(todo.id)}
                                    className="text-blue-400 hover:text-blue-600"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEditClick(todo)}
                                    className="text-blue-400 hover:text-blue-600"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            )}
                            <button
                                onClick={() => handleRemoveTodo(todo.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoComponent;
