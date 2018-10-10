import MainWindow   from '../components/main-window';
import React        from 'react';
import { Diceware } from '@plutonium/core';
import { render }   from 'react-dom';

render(<MainWindow diceware={new Diceware()} />, document.getElementById('main'));
