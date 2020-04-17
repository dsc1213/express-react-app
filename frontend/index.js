import React from 'react';
import { render } from 'react-dom';

import App from './app';

const doRender = () => render(<App />, document.getElementById('app'));

doRender();
