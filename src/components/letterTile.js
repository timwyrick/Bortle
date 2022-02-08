import React, {Component} from 'react';

class LetterTile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("I am active!");
        return (
            <div className="col letter-tile">
                        <div className={this.props.letterData.className}>
                            {this.props.letterData.letter}
                        </div>

            </div>

        );
    }
}

export { LetterTile };