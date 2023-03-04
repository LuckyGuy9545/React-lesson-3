import React, { Component } from 'react';
import './Clock.css';

export default class Clock extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  intervalid = null;

  componentDidMount() {
    console.log('setInterval');

    this.intervalid = setInterval(
      () =>
        this.setState({
          time: new Date().toLocaleTimeString(),
        }),
      1000
    );
  }

  //*Важно снять слушателя, иначе если мы скроем часы,
  //*то подсчет времени останется в системе, пожирая память
  componentWillUnmount() {
    clearInterval(this.intervalid);
  }

  render() {
    return <div className="Clock__face">{this.state.time}</div>;
  }
}
