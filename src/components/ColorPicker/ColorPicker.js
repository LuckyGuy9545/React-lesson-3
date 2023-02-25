import React, { Component } from 'react';
import classNames from 'classnames';
import './ColorPicker.css';

class ColorPicker extends Component {
  state = {
    activeOptionIndex: 0,
  };

  //* меняем индекс в static
  setActiveIndex = index => {
    //* перезаписать поверх - поэтому обьект а не функция
    this.setState({ activeOptionIndex: index });
  };

  makeOptionClassName = index => {
    //--3. как меняет жизнь classnames
    return classNames(
      'ColorPicker__option',
      // 'через запятую любой клас можно вписать',
      // 'сколько хочешь',
      {
        //*а тут тот класс, который доставится при условии
        'ColorPicker__option--active': index === this.state.activeOptionIndex,
      }
    );
  };

  render() {
    //* деструктуризация, вместо this.state. и this.props.options
    //-- 2.
    const { activeOptionIndex } = this.state;
    const { options } = this.props;
    //* вычисляемое свойство (сразу с деструктуризацией)
    //-- 1.
    const { label } = options[activeOptionIndex];
    return (
      <div className="ColorPicker">
        <h2 className="ColorPicker__title">Color Picker</h2>
        <p>Выбран цвет: {label}</p>
        {/* //*добавляем index, чтобы могли знать какой из обьектов масива ColorPicker === индексу в static */}
        <div>
          {options.map(({ label, color }, index) => (
            <button
              key={label}
              className={this.makeOptionClassName(index)}
              style={{ backgroundColor: color }}
              //*ВАЖНО передать инлайн функцию, а не сам вызов функции this.setActiveIndex(index) (иначе будет undefined)
              onClick={() => this.setActiveIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    );
  }
}

export default ColorPicker;

/* // --(1) без деструктуризации было бы
 const colorOption = this.props.options[this.state.activeOptionIndex];
 и внизу мы бы в <p> вписали бы:
 <p>Выбран цвет: {colorOption.label} </p>
 */

/*//-- (2) без дестру-ии
 const { label } = this.props.options[this.state.activeOptionIndex];
 {this.props.options.map(({ label, color }, index) => (
 */

//--(3) всю эту функцию можно заменить classnames(npm)
// //* добавляем оригинальный класс
// const optionClasses = ['ColorPicker__option'];
// //* если индекс одного из обьекта ColorPicker совпадает с тем что в (static) - вешаем доп класс
// if (index === this.state.activeOptionIndex) {
//   //* если да, то вешаем +класс, нет - оригинальный
//   optionClasses.push('ColorPicker__option--active');
// }
// //* разделяем классы пробелом join(' ')
// return optionClasses.join(' ');
