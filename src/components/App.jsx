import React, { Component } from 'react';
import Counter from './Counter';
import Dropdown from './Dropdown';
import ColorPicker from './ColorPicker';
import ToDoList from './TodoList';

const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D8B' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

class App extends Component {
  state = {
    todos: [
      {
        id: 'id-1',
        text: 'Выучить основы React',
        completed: true,
      },
      {
        id: 'id-2',
        text: 'Пережить Redux',
        completed: false,
      },
      {
        id: 'id-3',
        text: 'Разобрать React Router',
        completed: false,
      },
    ],
  };

  //* удаляем из списка
  deleteTodo = todoId => {
    this.setState(prevState => ({
      //* читается как : фильтруем из масива todos каждый todo, id которого не равно todoId (который мы возьмем позже в самом ToDoList.js)
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  render() {
    const { todos } = this.state;

    //== вычисляемые значения
    const totalTodosCount = todos.length;
    //* .reduce используется в React, чтобы подсчитать что-то (обьекты в масиве и т.д.)
    const completedTodosCount = todos.reduce(
      //* читается: если есть todo.completed, то к total додай + 1, если нет - верни total(который вказан как 0(через запятую, после тернарника))
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );
    return (
      <>
        <Counter initialValue={10} />
        <Dropdown />
        <ColorPicker options={colorPickerOptions} />

        <div>
          <p>Общее кол-во: {totalTodosCount}</p>
          <p>Кол-во выполненых: {completedTodosCount}</p>
        </div>
        <ToDoList todos={todos} onDeleteTodo={this.deleteTodo} />
      </>
    );
  }
}

export default App;
