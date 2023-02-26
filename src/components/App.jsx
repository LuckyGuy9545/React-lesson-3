import React, { Component } from 'react';
import shortid from 'shortid';
// import Counter from './Counter';
// import Dropdown from './Dropdown';
// import ColorPicker from './ColorPicker';
import ToDoList from './TodoList';
import ToDoEditor from './ToDoEditor';
import Filter from './Filter';
// import Form from './Form';

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

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
    filter: '',
  };

  //*добавляем новый елемент в список ToDo
  addTodo = text => {
    //*обьявляем новый масив
    const todo = {
      id: shortid.generate(),
      text /*эта запись вместо text: text */,
      completed: false,
    };
    //* добавляем в существующий
    this.setState(prevState => ({
      todos: [todo, ...prevState.todos],
    }));
  };

  //* удаляем из списка
  deleteTodo = todoId => {
    // console.log(todoId);
    this.setState(prevState => ({
      //* читается как : фильтруем из масива todos каждый todo, id которого не равно todoId (который мы возьмем позже в самом ToDoList.js)
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // console.log('todoId', todoId);

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        //*если id с todos совпадает с todoId, то верни мне новый обьект, если нет - старый todo
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));
  };

  // formSubmitHandler = data => {
  //   console.log('formData', data);
  // };

  //*Filter
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  //== фильтрация по тексту в инпуте
  getVisibleTodos = () => {
    const { todos, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    //* верни мне всех todo которые имеют в себе текст
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce(
      //* читается: если есть todo.completed, то к total додай + 1, если нет - верни total(который вказан как 0(через запятую, после тернарника))
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );
  };

  render() {
    const { todos, filter } = this.state;

    //== вычисляемые значения
    const totalTodosCount = todos.length;
    //* .reduce используется в React, чтобы подсчитать что-то (обьекты в масиве и т.д.)
    const completedTodosCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();
    return (
      <>
        {/* <Counter initialValue={10} />
        <Form onSubmitProp={this.formSubmitHandler} />
        <ColorPicker options={colorPickerOptions} />
        <Dropdown />
*/}
        <div>
          <p>Общее кол-во: {totalTodosCount}</p>
          <p>Кол-во выполненых: {completedTodosCount}</p>
        </div>

        <ToDoEditor onSubmit={this.addTodo} />
        <Filter value={filter} onChange={this.changeFilter} />
        <ToDoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </>
    );
  }
}

export default App;
