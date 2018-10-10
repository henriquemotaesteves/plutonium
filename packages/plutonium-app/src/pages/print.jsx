import PassphraseReport from "../components/passphrase-report";
import React            from 'react';
import { ipcRenderer }  from "electron";
import { render }       from "react-dom";

render(<PassphraseReport eventBus={ipcRenderer} />, document.getElementById("print"));
