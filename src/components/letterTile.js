import React, {Component} from 'react';

class LetterTile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col letter-tile">
                        <div className={this.props.letter.className}>
                            {this.props.letter.letter}
                        </div>

            </div>

        );
    }
}

export { LetterTile };