import React, {Component} from 'react';
import { KeyTile } from './keyTile.js'

class KeyRow extends React.Component {

    constructor(props) {
        super(props)

        this.state = { keyRow: props.keyRow};
    }

    render() {
        return (
            <div className="row g-3">
            {this.props.keyRow.map((keyTile) => {                      
                return (<KeyTile info={keyTile} clickFunction={this.props.clickFunction}/>) 
             })}
            </div>
        );
      }
}

export { KeyRow };