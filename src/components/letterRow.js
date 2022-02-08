import React, {Component} from 'react';
import { LetterTile } from './letterTile.js'

class LetterRow extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
        <div className="row g-1 letter-row">
            <LetterTile letterData={this.props.rowLetters[0]}></LetterTile>
            <LetterTile letterData={this.props.rowLetters[1]}></LetterTile>
            <LetterTile letterData={this.props.rowLetters[2]}></LetterTile>
            <LetterTile letterData={this.props.rowLetters[3]}></LetterTile>
            <LetterTile letterData={this.props.rowLetters[4]}></LetterTile>
        </div>
        );
      }
}

export { LetterRow };