import React, {Component} from 'react';
import { RemainingTime } from './remainingTime.js'
import { CompletionGraph } from './completionGraph.js'

class CompleteModal extends React.Component {
  
    constructor (props) {
        super(props)
        this.state = { messages: ["You're a real Bortstradamus!", 
        "We have a Bort historian over here!", 
        "Excellent Bort deduction!", 
        "You're a bonifide Bortified chatter",
        "A solid display of Bort knowledge",
        "Eek. Maybe brush up on your Bort history",
        "You call yourself a Bort chatter?"], isCopied: "hidden", isComplete: props.isComplete }

        this.copyToClipBoard = this.copyToClipBoard.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    copyToClipBoard() {
        var numGuesses = this.props.numGuesses < 7 ? this.props.numGuesses : "OOF";
        var copiedText = `Bortle ${numGuesses}/6 \n`
        this.props.letters.forEach(element => {
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

          this.setState({isCopied: "visible"});
    }

    closeModal() {
        this.setState({isComplete: false});
    }

    render() {
        return (
            <div className="modal" tabindex="-1" role="dialog" style={{ display: this.state.isComplete ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                        <button type="button" className="close confirm-button" onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="modal-body">
                            <div className="congrats-message">
                                {this.state.messages[this.props.numGuesses - 1]}
                            </div>
                            <CompletionGraph guessHistory={this.props.guessHistory}></CompletionGraph>
                            <div className="row">
                                <RemainingTime></RemainingTime>
                                <div className="share-button col" onClick={this.copyToClipBoard}>
                                    SHARE
                                    <div style={{ visibility: this.state.isCopied, fontSize: '12px' }}>Copied to clipboard!</div>
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