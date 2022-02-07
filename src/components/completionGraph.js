import React, {Component} from 'react';

class CompletionGraph extends React.Component {
  
    constructor (props) {
        super(props)
      }

    render() {
        return (
            <div>
                <h4 className="graph-header">GUESS DISTRIBUTION</h4>
                <div className="row">
                    <ul className="col-2 frequency-list">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>OOF</li>
                    </ul>
                    <ul className="col-10 graph-bars">
                        <li style={{ width: this.props.guessHistory[0] * 20 + "px" }}>{this.props.guessHistory[0]}</li>
                        <li style={{ width: this.props.guessHistory[1] * 20 + "px" }}>{this.props.guessHistory[1]}</li>
                        <li style={{ width: this.props.guessHistory[2] * 20 + "px" }}>{this.props.guessHistory[2]}</li>
                        <li style={{ width: this.props.guessHistory[3] * 20 + "px" }}>{this.props.guessHistory[3]}</li>
                        <li style={{ width: this.props.guessHistory[4] * 20 + "px" }}>{this.props.guessHistory[4]}</li>
                        <li style={{ width: this.props.guessHistory[5] * 20 + "px" }}>{this.props.guessHistory[5]}</li>
                        <li style={{ width: this.props.guessHistory[6] * 20 + "px" }}>{this.props.guessHistory[6]}</li>
                    </ul>
                </div>
            </div>

        );
    }
}

export { CompletionGraph };