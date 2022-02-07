import React, {Component} from 'react';
import { LetterTile } from './letterTile.js'

class LetterRow extends React.Component {

    constructor(props) {
        super(props)

        this.state = { rowLetters: props.rowLetters};
    }

    render() {
        return (
        <div className="row g-1 letter-row">
            {this.state.rowLetters.map((letter) => {  return ( <LetterTile letter={letter}></LetterTile>)}) }
        </div>
        );
      }
}

export { LetterRow };