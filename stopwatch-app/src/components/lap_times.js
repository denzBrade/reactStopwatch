import React, { Component } from 'react';

import TimeElapsed from './time_elapsed';

class LapTimes extends Component { 

    render() {
        // Markup for each laptime 
        const rows = this.props.lapTimes.map((lapTime, index) => 
            <ul className="lap-list" key={++index}>
                <li className="lap-list-item"><span className="lap">Lap: {index}</span><TimeElapsed timeElapsed={lapTime}/></li>
            </ul>
        );

        return (
            <div id="lap-times">
                <div>{rows}</div>
            </div>
        )
    }
}

export default LapTimes;