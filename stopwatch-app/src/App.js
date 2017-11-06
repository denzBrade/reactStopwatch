import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TimeElapsed from './components/time_elapsed';
import LapTimes from './components/lap_times';

class App extends Component {

  constructor(props) {
    super(props);

    // Bind 'this' to each method to avoid them being undefined when called
    ["lap", "update", "reset", "toggle"].forEach((method) => {
      this[method] = this[method].bind(this);
    });

    this.state = this.initialState = {
      isRunning: false, // not running before actioned to
      lapTimes: [], // set up empty array for laptimes
      timeElapsed: 0, // time starts at 0:00
    };
  }

  // Sets the timer & updates every 10 ms
  startTimer() {
    this.startTime = Date.now();
    this.timer = setInterval(this.update, 10);
  }

  // Updating the timeElapsed state when stopwatch starts
  update() {
    const timeUpdate = Date.now() - this.startTime;
    this.setState({timeElapsed: this.state.timeElapsed + timeUpdate});
    this.startTime = Date.now();
  }

  // Set Laptime to whatever current timeElapsed is
  lap() {
    const {lapTimes, timeElapsed} = this.state;
    this.setState({lapTimes: lapTimes.concat(timeElapsed)});
  }

  // Reset timer to initialState
  reset() {
    clearInterval(this.timer);
    this.setState(this.initialState);
  }

  // switches between Start & Stop
  toggle() {
    this.setState({isRunning: !this.state.isRunning}, () => {
      // if isRunning is true start the timer else clearInterval (stop runtime)
      this.state.isRunning ? this.startTimer() : clearInterval(this.timer)
    })
  }


  render() {
    const {isRunning, lapTimes, timeElapsed} = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React JS Stopwatch App</h1>
        </header>

        <TimeElapsed id="timer" timeElapsed={timeElapsed} />

        {/* Toggle the button text depending if the stopwatch is running or not */}
        <button className="button button-start" onClick={this.toggle}>
          {isRunning ? 'Stop' : 'Start'}
        </button>

        {/* When running button text = 'Lap' / When stopped text = 'Reset' & when timer is reset disable button*/}
        <button className="button button-alternate"
          onClick = {isRunning ? this.lap : this.reset}
          disabled = {!isRunning && !timeElapsed}
        >
          {isRunning || !timeElapsed ? 'Lap' : 'Reset'} 
        </button>

        {/* When laptimes exist Render LapTime Component */}
        {lapTimes.length > 0 && <LapTimes lapTimes={lapTimes} />}
      </div>
    );
  }
}

export default App;
