import React, { Component } from 'react';
//--shortid нужен для генерации уникального ID, чтобы привязать label к input
import shortid from 'shortid';

class Form extends Component {
  //*этот state локальный, только для формы
  state = {
    name: '',
    tag: '',
    experience: 'junior',
    license: false,
  };

  //--делаем уникальные ID при помощи констант
  nameInputId = shortid.generate();
  tagInputId = shortid.generate();

  //* паттерн для обработки input с name + value (не работает на чекбоксах)
  handleChange = event => {
    //-- 1. Деструктуризация
    const { name, value } = event.currentTarget;
    this.setState({
      //*читается как event с name припиши значение value ([] важны)
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    //== чтобы поднять состояние(state), используем пропс и передаем его в App
    this.props.onSubmitProp(this.state);
    //*вызываем метод очистки
    this.reset();
  };

  //* делаем метод очитски формы
  reset = () => {
    //*для этого просто возвращаем изначальное значение, либо пустое
    this.setState({ name: '', tag: '' });
  };
  //* если один checkbox - value не нужен, при множестве - нужно
  handleLicenseChange = event => {
    console.log(event.currentTarget.checked);
    this.setState({ license: event.currentTarget.checked });
  };

  render() {
    return (
      //-- Submit должен быть не на клавише а на форме
      <form onSubmit={this.handleSubmit}>
        {/* //*важно чтобы name совпадал с state (если name="testName" то state = {testName: '',})*/}
        <label htmlFor={this.nameInputId}>
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            id={this.nameInputId}
          />
        </label>
        <label htmlFor={this.tagInputId}>
          Tag
          <input
            type="text"
            name="tag"
            value={this.state.tag}
            onChange={this.handleChange}
            id={this.tagInputId}
          />
        </label>

        {/* //*Радиокнопки: */}
        <p>Ваш уровень:</p>
        <label>
          <input
            type="radio"
            name="experience"
            value="junior"
            onChange={this.handleChange}
            //* если в состоянии опыт = джун, то сделать checked
            checked={this.state.experience === 'junior'}
          />
          Junior
        </label>

        <label>
          <input
            type="radio"
            name="experience"
            value="middle"
            onChange={this.handleChange}
            checked={this.state.experience === 'middle'}
          />
          Middle
        </label>
        <label>
          <input
            type="radio"
            name="experience"
            value="senior"
            onChange={this.handleChange}
            checked={this.state.experience === 'senior'}
          />
          Senior
        </label>

        <br />
        {/* //*Checkbox */}
        <label>
          <input
            type="checkbox"
            name="license"
            checked={this.state.license}
            onChange={this.handleLicenseChange}
          />
          Agreed to license
        </label>
        {/* //*отключаем клавишу если не кликнули по чекбоксу, если кликнули - включаем */}
        <button type="submit" disabled={!this.state.license}>
          Submit
        </button>
      </form>
    );
  }
}
export default Form;

//--(1) до деструк-ии
//  this.setState({
//*читается как event с name припиши значение value ([] важны)
//    [event.currentTarget.name]: event.currentTarget.value,
//  });
