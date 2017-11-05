import React, { Component } from 'react';

class TimeElapsed extends Component { 

    // Convert numbers into string & show rounded values (millisecs)
    getUnits() {
        const seconds = this.props.timeElapsed / 1000;

        return {
            min: Math.floor(seconds / 60).toString(),
            sec: Math.floor(seconds % 60).toString(),
            msec: (seconds % 1).toFixed(2).substring(2)
        };
    }

    render() {
        const units = this.getUnits();

        // Add an initial '0' before the Min & Secs to achieve a '00 : 00' format
        let formatMin = ('0' + units.min).slice(-2);
        let formatSec = ('0' + units.sec).slice(-2);

        return (
            <div className="clock" id={this.props.id}>
                <span>{formatMin}:</span>
                <span>{formatSec}.</span>
                <span>{units.msec}</span>
            </div>
        );
    }
}

export default TimeElapsed;