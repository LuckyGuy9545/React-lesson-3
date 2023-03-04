import React from 'react';
import classNames from 'classnames';
import './ToDoList.css';
import Todo from 'components/Todo/Todo';

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
        {/* //*компоненты лучше делать отдельно */}
        <Todo
          text={text}
          completed={completed}
          onToggleCompleted={() => onToggleCompleted(id)}
          onDeleteTodo={() => onDeleteTodo(id)}
        />
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
