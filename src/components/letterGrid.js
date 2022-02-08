import React, {Component} from 'react';
import { LetterRow } from './letterRow.js';

class LetterGrid extends React.Component {

    constructor (props) {
        super(props)
      }

    render() {
        return (
        <div className="letter-grid">
            {this.props.letters.map((rowLetters) => { return ( <LetterRow rowLetters={rowLetters}></LetterRow>)}) }
        </div>
        );
      }
}

export { LetterGrid };