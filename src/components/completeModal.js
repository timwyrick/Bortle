import React, {Component} from 'react';
import { RemainingTime } from './remainingTime.js'
import { CompletionGraph } from './completionGraph.js'

class CompleteModal extends React.Component {
  
    constructor (props) {
        super(props)
        this.state = { letters: this.props.letters, numGuesses: this.props.numGuesses }

        this.copyToClipBoard = this.copyToClipBoard.bind(this);
    }
    
    copyToClipBoard() {
        var numGuesses = this.props.numGuesses < 7 ? this.props.numGuesses : "OOF";
        var copiedText = `Bortle ${numGuesses}/6 \n`
        this.state.letters.forEach(element => {
            element.forEach(letter => {
              if(letter.className.includes("correct-letter")) {
                copiedText += "🟩";
              }
              if(letter.className.includes("in-word")) {
                copiedText += "🟨";
              }
              if(letter.className.includes("wrong-letter")) {
                copiedText += "⬛";
              }
            });
            copiedText += "\n";
          });

          navigator.clipboard.writeText(copiedText);
    }

    render() {
        return (
            <div className="modal" tabindex="-1" role="dialog" style={{ display: this.props.isComplete != 0 ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <CompletionGraph guessHistory={this.props.guessHistory}></CompletionGraph>
                            <div class="row">
                                <RemainingTime></RemainingTime>
                                <div className="share-button col" onClick={this.copyToClipBoard}>
                                    SHARE
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { CompleteModal };