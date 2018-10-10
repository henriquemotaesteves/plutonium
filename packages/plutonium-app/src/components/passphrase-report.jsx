import React, { Component } from "react";
import { Passphrase }       from "@plutonium/core";
import PassphraseView       from "./passphrase-view";

export default class PassphraseReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            passphrase: new Passphrase([])
        };

        props.eventBus.on("set-passphrase", (event, arg) => this.onSetPassphrase(arg));
    }

    onSetPassphrase(arg) {
        this.setState({
            passphrase: new Passphrase(arg.words) 
        });
    }

    render() {
        return (
            <div className="vertical-panel">
                <PassphraseView passphrase={this.state.passphrase} />
            </div>
        );
    }
}
