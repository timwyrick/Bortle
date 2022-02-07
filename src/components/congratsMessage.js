import React, {Component} from 'react';

class CongratsMessage extends React.Component {
  
    constructor (props) {
        super(props)
        this.state = { messages: ["You're a real Bortstradamus!", 
                                  "We have a Bort historian over here!", 
                                  "Excellent Bort deduction!", 
                                  "You're a bonifide Bortified chatter",
                                  "A solid display of Bort knowledge",
                                  "Eek. Maybe brush up on your Bort history",
                                  "You call yourself a Bort chatter?"] }
      }

    render() {
        return (
            <div className="congrats-message" style={{ display: this.props.numGuesses != 0 ? "block" : "none" }}>
                {this.state.messages[this.props.numGuesses - 1]}
            </div>
        );
    }
}

export { CongratsMessage };