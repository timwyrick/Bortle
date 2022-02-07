import React, {Component} from 'react';
import { KeyRow } from './keyRow.js'

class KeyBoard extends React.Component {
  
    constructor (props) {
        super(props)
        this.state = { keys: props.keys }
      }

    render() {
        return (
            <div>
                {this.state.keys.map((keyRow) => { return (<KeyRow keyRow={keyRow} clickFunction={this.props.clickFunction}></KeyRow>) })}
            </div>
        );
    }
}

export { KeyBoard };