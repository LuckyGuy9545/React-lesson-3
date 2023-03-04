import React from 'react';
const Todo = ({ text, completed, onToggleCompleted, onDeleteTodo }) => (
  <>
    <input
      type="checkbox"
      className="TodoList__checkbox"
      checked={completed}
      onChange={onToggleCompleted}
    />
    <p className="TodoList__text">{text}</p>
    <button onClick={onDeleteTodo}>Delete</button>
  </>
);

export default Todo;
