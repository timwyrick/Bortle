import React, {Component} from 'react';

class RemainingTime extends React.Component {

    constructor(props) {
        super(props)

        var nextDay = new Date();
        nextDay.setHours(24,0,0,0); 

        var currDate = new Date();

        this.state = { nextDate: nextDay,
                       hours: Math.floor((Math.abs((nextDay - currDate)  % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
                       minutes: Math.floor((Math.abs((nextDay - currDate)  % (1000 * 60 * 60)) / (1000 * 60))),
                       seconds: Math.floor((Math.abs((nextDay - currDate)  % (1000 * 60)) / 1000))
                    };
    }
   
      componentDidMount() {
        this.timer = setInterval(() => {
            var curr = new Date();

            var newHours = Math.floor((Math.abs((this.state.nextDate - curr)  % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            var newMinutes = Math.floor((Math.abs((this.state.nextDate - curr)  % (1000 * 60 * 60)) / (1000 * 60)));
            var newSeconds = Math.floor((Math.abs((this.state.nextDate - curr)  % (1000 * 60)) / 1000));

            if(newHours < 10) {
                newHours = '0' + newHours;
            }

            if(newMinutes < 10) {
                newMinutes = '0' + newMinutes;
            }

            if(newSeconds < 10) {
                newSeconds = '0' + newSeconds;
            }

            this.setState({hours: newHours});
            this.setState({minutes: newMinutes});
            this.setState({seconds: newSeconds});
        },1000)
     }
     
      componentWillUnmount() {
         clearInterval(this.timer);
     }

    render() {
        return (
            <div className="col countdown">
            <p>NEXT BORTLE</p>
                {this.state.hours}:{this.state.minutes}:{this.state.seconds}
            </div>
        );
    }
}

export { RemainingTime };