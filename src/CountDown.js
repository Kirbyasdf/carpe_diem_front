import React, { Component } from "react";
import "./App.css";


class Countdown extends Component {

  state = {
    timerOn: false,
    timerStart: ((((this.props.user.tltl*365)*24)*60)*60*60),
    timerTime: ((((this.props.user.tltl*365)*24)*60)*60*60)
  };

  componentDidMount() {

    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert("Countdown ended");
      }
    }, 10);
  };

//


  render() {
    return (
      <div className="Countdown" className="count">
          <div className="Countdown-label"> {this.state.timerTime} </div>
      </div>
    );
  }
}
export default Countdown;
