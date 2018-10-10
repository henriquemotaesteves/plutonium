import React, {Component} from "react";

export default class PassphraseView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            passphrase: props.passphrase,
            wordFont  : undefined
        };

        this.update = true;
    }

    componentWillReceiveProps(props) {
        this.setState({
            passphrase: props.passphrase
        });
    }

    componentDidMount() {
        if (this.update) {
            this.setState({
                wordFont: this.calculateWordFont()
            });
        }

        this.update = ! this.update;
    }

    componentDidUpdate() {
        if (this.update) {
            this.setState({
                wordFont: this.calculateWordFont()
            });
        }

        this.update = ! this.update;
    }

    render() {
        const style = {};
        if (this.state.wordFont !== undefined) {
            style.font = this.state.wordFont;
        }

        let key  = 0;
        const words = this.props.passphrase.reduceWords((words, word) => {
            words.push(<li key={key++} style={style} className="passphrase-view__word color-scheme--border--secondary  color-scheme--background--tertiary color-scheme--foreground--white">{word}</li>);
            words.push(<li key={key++} style={style} className="passphrase-view__word color-scheme--border--quaternary color-scheme--background--quinary">&nbsp;</li>);

            return words;
        }, []);
        words.pop();

        return (
            <div className="vertical-panel">
                <ul className="passphrase-view color-scheme--border--primary" ref={(e) => this.passphraseElement = e}>
                    {words}
                </ul>

                <div className="passphrase-view__legend">
                    <p className="passphrase-view__legend__item color-scheme--border--secondary  color-scheme--background--tertiary"></p>
                    <p>Word</p>
                    <p className="passphrase-view__legend__item color-scheme--border--quaternary color-scheme--background--quinary"></p>
                    <p>Space</p>
                </div>
            </div>
        );
    }

    calculateWordFont() {
        if (this.state.passphrase === undefined || this.state.passphrase.isEmpty()) {
            return undefined;
        }

        const wordElements            = this.passphraseElement.getElementsByClassName("passphrase-view__word");
        const passphraseStyle         = window.getComputedStyle(this.passphraseElement);
        const wordStyle               = window.getComputedStyle(wordElements[0]);
        const fontStyle               = wordStyle.fontStyle;
        const fontVariant             = wordStyle.fontVariant;
        const fontWeight              = wordStyle.fontWeight;
        const fontStretch             = wordStyle.fontStretch;
        const lineHeight              = wordStyle.lineHeight;
        const fontFamily              = wordStyle.fontFamily;
        const passphrasePaddingTop    = parseFloat(passphraseStyle.paddingTop);
        const passphrasePaddingBottom = parseFloat(passphraseStyle.paddingBottom);
        const passphrasePaddingLef    = parseFloat(passphraseStyle.paddingLeft);
        const passphrasePaddingRight  = parseFloat(passphraseStyle.paddingRight);
        const wordBorderTopWidth      = parseFloat(wordStyle.borderTopWidth);
        const wordBorderBottomWidth   = parseFloat(wordStyle.borderBottomWidth);
        const wordBorderRightWidth    = parseFloat(wordStyle.borderRightWidth);
        const wordBorderLeftWidth     = parseFloat(wordStyle.borderLeftWidth);
        const passphraseHeight        = this.passphraseElement.clientHeight
                                      - (passphrasePaddingTop + passphrasePaddingBottom)
                                      - (wordBorderTopWidth + wordBorderBottomWidth);
        const passphraseWidth         = this.passphraseElement.clientWidth
                                      - (passphrasePaddingLef + passphrasePaddingRight)
                                      - ((wordBorderLeftWidth + wordBorderRightWidth) * wordElements.length);

        let wordFontSize = passphraseHeight;
        let wordFont     = undefined;

        while(true) {
            wordFont = `${fontStyle} ${fontVariant} ${fontWeight} ${fontStretch} ${wordFontSize}px / ${lineHeight} ${fontFamily}`;
            
            const currentPassphraseWidth = this.measureTextWidth(wordFont, this.state.passphrase.toString());

            if (passphraseWidth >= currentPassphraseWidth) {
                break;
            }

            wordFontSize--;
        }

        return wordFont;
    }

    measureTextWidth(font, text) {
        const canvas  = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font  = font;
        const metrics = context.measureText(text);

        return metrics.width;
    }
}
