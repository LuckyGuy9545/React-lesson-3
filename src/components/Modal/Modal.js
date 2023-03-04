import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

//-- тот случай когда нужно и можно сделать querySelector, чтобы потом в это можно было рендерить разметку
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('modal-Didmount');
    //--можно поставить слушатель , чтобы сделать закрытие на клавишу ESC
    window.addEventListener('keydown', this.handleKeyDown);
  }

  //* метод очистки за собой, снимать таймауты, слушатели и т.д.
  componentWillUnmount() {
    console.log('modal-unmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      // console.log('esc');
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        {/* //*{this.props.children} используется для динамики,
            //*чтобы можно было переиспользовать компонент */}
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

//--для Портала нужно заимпортировать createPortal с React-а (createPortal(то что рендерить, куда рендерить))
