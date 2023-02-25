import React from 'react';
import classNames from 'classnames';
import './ToDoList.css';

const ToDoList = ({ todos, onDeleteTodo, onToggleCompleted }) => (
  <ul className="TodoList">
    {/* //--1. */}
    {todos.map(({ id, text, completed }) => (
      <li
        key={id}
        className={classNames('TodoList__item', {
          'TodoList__item--completed': completed,
        })}
      >
        <input
          type="checkbox"
          className="TodoList__checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
        />
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
