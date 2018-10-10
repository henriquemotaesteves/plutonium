import { Diceware }               from '@plutonium/core';
import PassphraseView             from './passphrase-view';
import React, { Component }       from 'react';
import { clipboard, ipcRenderer } from 'electron';

export default class MainWindow extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            passphrase: props.diceware.generate(6)
        };

        this.onGenerate             = this.onGenerate.bind(this);
        this.onCopy                 = this.onCopy.bind(this);
        this.onPrint                = this.onPrint.bind(this);
        this.onNumberOfWordsChanged = this.onNumberOfWordsChanged.bind(this);
    }

    onGenerate() {
        this.setState({
            passphrase: this.props.diceware.generate(this.state.numberOfWords)
        });
    }

    onCopy() {
        clipboard.writeText(this.state.passphrase.toString());
    }

    onPrint() {
        ipcRenderer.send('print-passphrase', this.state.passphrase);
    }

    onNumberOfWordsChanged(event) {
        this.setState({
            numberOfWords: event.target.value
        });
    }

    render() {
        return(
            <div className='window'>
                <div className='nav-bar color-scheme--background--primary'>
                    <div className='nav-bar__right-panel'>
                    </div>

                    <div className='nav-bar__center-panel'>
                        <img src='../logo.png' height='96px' />
                    </div>

                    <div className='nav-bar__left-panel'>
                    </div>
                </div>
                <div className='vertical-panel'>
                    <PassphraseView passphrase={this.state.passphrase} />

                    <div className='horizontal-panel horizontal-panel--h-align-items-end horizontal-panel--v-align-items-center'>
                        <p>Words</p>

                        <input  id="number-of-words" className='text-field color-scheme--border--primary' placeholder='6' onChange={this.onNumberOfWordsChanged} />
                        
                        <button id="generate-button" className='button color-scheme--background--primary color-scheme--foreground--white' onClick={this.onGenerate}>Generate</button>
                        <button id="copy-button"     className='button color-scheme--background--primary color-scheme--foreground--white' onClick={this.onCopy}>Copy</button>
                        <button id="print-button"    className='button color-scheme--background--primary color-scheme--foreground--white' onClick={this.onPrint}>Print</button>
                    </div>
                </div>
            </div>
        );
    }
}
