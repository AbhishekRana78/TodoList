import React, { useState } from 'react';
import './Todo.css'

const Todo = () => {
    // State variables to manage the todo list, input value, edit mode, and edit value
    const [todos,setTodos] = useState([]);
    const [inputValue,setInputValue] = useState('');
    const [editMode,setEditMode] = useState(false);
    const [editId,setEditId] = useState(null);
    const [editValue,setEditValue] = useState('');

    // Function to add a new todo item
    const addTodo = () => {
        // Check if the input value is not empty
        if(inputValue.trim()!== ''){
            // Create a new todo object with a unique id and the input value
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue,
            }

            // Add the new todo to the existing todos array
            setTodos([...todos,newTodo]);
            // Clear the input value
            setInputValue('');
        }
    }

    // Function to delete a todo item
    const deleteTodo = (id) => {
        // Filter the todos array to remove the todo with the given id
        const updateTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updateTodos)
    }

    // Function to enter edit mode for a todo item
    const enterEditMode = (id,text) => {
        // Set the edit mode to true
        setEditMode(true);
        // Set the id of the todo item being edited
        setEditId(id);
        // Set the edit value to the current text of the todo item
        setEditValue(text);
    }

    // Function to update a todo item
    const updateTodo = () => {
        // Map through the todos array and update the todo item with the matching id
        const updatedTodos = todos.map((todo) => {
            if(todo.id === editId){
                return {...todo,text:editValue};
            }
            return todo;
        });

        // Update the todos state with the modified array
        setTodos(updatedTodos);
        // Set the edit mode to false
        setEditMode(false);
        // Reset the edit id and edit value
        setEditId(null);
        setEditValue('');
    }

  return (
    <div className='todo-container'>
      <h2>ToDo List</h2>
      {/* Input field for adding new todos */}
      <input type='text' value={inputValue} onChange={(e)=> setInputValue(e.target.value)}/>

      {/* Conditionally render the add or update button based on the edit mode */}
      {
        editMode ? (
            <div>
                <input type='text'
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}/>
                <button onClick={updateTodo}>Update</button>
                </div>
        ):(
   <button onClick={addTodo}>Add</button>
        )
      }
      <ul>
        {/* Render the list of todos */}
        {todos.map((todo) => (
            <li key={todo.id}>
                {todo.text}
                <div>
                {/* Add delete and edit buttons for each todo item */}
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button onClick={() => enterEditMode(todo.id,todo.text)}>Edit</button>
                </div>
            </li>
        ))}
      </ul>
      <p className='BY'>Todo List By <cite>Abhishek Rana</cite> for QuadB-TECH. </p>
    </div>
  )
}

export default Todo 
