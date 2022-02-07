import React, {Component} from 'react';

class KeyTile extends React.Component {

    constructor(props) {
        super(props)

        this.state = { clickFunction: props.clickFunction};
    }

    keyPressCallback() {
       this.state.clickFunction(this.props.info.letter);
    }

    render() {
        return (
            <div className="col key-tile" onClick={this.keyPressCallback.bind(this)}>
                <div className={this.props.info.className}>
                    {this.props.info.letter}
                </div>
            </div>

        );
    }
}

export { KeyTile };