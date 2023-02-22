import React from 'react';
import './ToDoList.css';

const ToDoList = ({ todos, onDeleteTodo }) => (
  <ul className="TodoList">
    {/* //--1. */}
    {todos.map(({ id, text }) => (
      <li key={id} className="TodoList__item">
        <p className="TodoList__text">{text}</p>
        <button onClick={() => onDeleteTodo(id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default ToDoList;

/*
//--(1) деструк-я от:
{todos.map(todo => (
      <li key={todo.key}>
        <p>{todo.text}</p>
      </li>
    ))}
 */
