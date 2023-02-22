import React from 'react';
import Controls from './Controls';
import Value from './Value';
import './Counter.css';

//* это компонент-класс,мы сделали из функции класс, для того чтобы внутри иметь возможность динамически что-то изменять
class Counter extends React.Component {
  //-- статические пропсы класса можно описать в самом классе
  static defaultProps = {
    initialValue: 0,
  };

  static propTypes = {
    //-- тут пропсы
  };

  /* Данные в state контролируют то, что отображается в интерфейсе.
Данные, хранящиеся в состоянии, должны быть информацией, которая будет обновляться методами компонента. 
название только state!*/
  state = {
    value: this.props.initialValue,
  };

  //==когда вы хотите передать колбек как обработчик события в елемент, мы делаем ПУБЛИЧНОЕ СВОЙСТВО КЛАССА
  //* чтобы меньше инлайн кода, перенесли то что будет в onClick в публичное свойство класса
  //* обновляем state(состояние), только при помощи setState();
  //-- обновлять state можно 2 способами:
  //-- через обьект setState({value: 10}), но оно просто перепишет текущее, без последовательности, будет 5 -> 10
  //-- через функцию setState((parametr) => { return {value: parametr.value + 1}}) можно переписать и последующие значения, будет 5+1+1+1+1
  handleIncrement = () => {
    this.setState(prevState => ({
      value: prevState.value + 1,
    }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1,
    }));
  };

  //* обязательный метод рендер, который разметку должен возвращать
  render() {
    //* дестру-я вместо this.state.value будет теперь value
    const { value } = this.state;
    return (
      <div className="Counter">
        <Value value={value} />
        <Controls
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
        />
        {/* //--эта разметка вынесена в отдельный компонент */}
        {/* <div className={css.Counter__controls}>
           //== onClick - это как слушатель, только работает как пропс 
          <button type="button" onClick={this.handleIncrement}>
            Увеличивает на 1
          </button>
          <button type="button" onClick={this.handleDecrement}>
            Уменьшает на 1
          </button>
        </div> */}
      </div>
    );
  }
}

export default Counter;

//* вот такая была функция, из нее сделали компонент-класс
// const Counter = () => {
//   <div className={css.Counter}>
//     <span className={css.Counter__value}>0</span>

//     <div className={css.Counter__controls}>
//       <button type="button">Увеличивает на 1</button>
//       <button type="button">Уменьшает на 1</button>
//     </div>
//   </div>;
// };

/*//-- event работает в синхронном коде, если в асинхронном, то значение event = null (оно реактом очищается)
//-- поэтому если нужно в асинхронном, то запишите event в переменную
//-- const target = event.target */

/*//== правильна последовательность класса:
//--1. статика
static defaultProps = {
    initialValue: 0,
  };

  static propTypes = {
    //-- тут пропсы
  };

//--2. состояние
  state = {
  value: this.props.initialValue,
  }

//--3. кастомные методы
  handleIncrement ...... 

  handleDecrement
 
//--4. потом рендер
--
 */
