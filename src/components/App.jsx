import React, { Component } from 'react';
import shortid from 'shortid';
// import Tabs from './Tabs';
// import tabs from './tabs.json';
// import Counter from './Counter';
// import Dropdown from './Dropdown';
// import ColorPicker from './ColorPicker';
import ToDoList from './TodoList';
import ToDoEditor from './ToDoEditor';
import Filter from './Filter';
import IconButton from './IconButton';
import { ReactComponent as AddIcon } from '../icons/add.svg';
import Modal from './Modal';
// import Form from './Form';
// import Clock from './Clock';

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
    showModal: false,
  };

  //== Урок №5
  //*метод который вызывается 1 раз при рендере страницы
  componentDidMount() {
    console.log('метод вызывается 1 раз при рендере страницы');
    //* и тут берем из локального хранилища данные которые записали в componentDidUpdate
    //* при помощи этой функции можем взять значения state при рендере
    const todos = localStorage.getItem('todos');
    const parseTodos = JSON.parse(todos);
    //! важно сделать проверку, иначе изначальное значение todos будет null при свежем заходе (пустой локал) на страницу и будет ошибка
    if (parseTodos) {
      this.setState({ todos: parseTodos });
    }
  }

  //* метод который вызывается при любом обновлении(изменении страницы)
  //!вызывается самим React-ом, без onClick
  //--в это методе два аргумента (prevProps, prevState), это дает возможность сравнить предыдущее состояние
  componentDidUpdate(prevProps, prevState) {
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    //! this.setState() без условия не выполняйте, иначе зацыклите update>render>setState
    //* вывести в консоль update, если новый state не равный старому state
    if (nextTodos !== prevTodos) {
      console.log('а я появляюсь при каждом обновлении');
      //* записываем изменения в локальное хранилища при условии
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }

    //==закрытие модалки при сабмите
    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
  }

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

  formSubmitHandler = data => {
    console.log('formData', data);
  };

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

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;

    //== вычисляемые значения
    const totalTodosCount = todos.length;
    //* .reduce используется в React, чтобы подсчитать что-то (обьекты в масиве и т.д.)
    const completedTodosCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();
    return (
      <>
        {/* <Tabs items={tabs} /> */}
        {/*//* aria-label -атрибут доступности, поэтому он записывается с маленькой и с '' а не {} */}
        <IconButton onClick={this.toggleModal} aria-label="Add todo">
          <AddIcon width="40" height="40" fill="white" />
        </IconButton>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            {/* //*закрытие модалки при сабмите в componentDidUpdate */}
            <ToDoEditor onSubmit={this.addTodo} />
          </Modal>
        )}
        {/* <Counter initialValue={10} />
        <Form onSubmitProp={this.formSubmitHandler} />
        <ColorPicker options={colorPickerOptions} />
        <Dropdown /> */}
        <div>
          <p>Общее кол-во: {totalTodosCount}</p>
          <p>Кол-во выполненых: {completedTodosCount}</p>
        </div>
        <Filter value={filter} onChange={this.changeFilter} />
        <ToDoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />

        {/* <Clock /> */}
      </>
    );
  }
}

export default App;
