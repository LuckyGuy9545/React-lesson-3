import React, { Component } from 'react';
import './Dropdown.css';

class Dropdown extends Component {
  state = {
    visible: false,
  };

  //*публичный метод
  toggle = () => {
    this.setState(prevState => ({
      //*читается как, равно противоположному состоянию prevState (если true - будет false  и наоборот)
      visible: !prevState.visible,
    }));
  };

  render() {
    //*деструктуризация где было this.state.visible теперь просто ставит visible
    const { visible } = this.state;
    return (
      <div className="Dropdown">
        <button
          type="button"
          className="Dropdown__toggle"
          onClick={this.toggle}
        >
          {/* //* тернарник, если true то Hide если false - Show */}
          {visible ? 'Hide' : 'Show'}
        </button>

        {/* //*рендер при условии */}
        {visible && <div className="Dropdown__menu"> Выпадающее меню</div>}
      </div>
    );
  }
}

export default Dropdown;
