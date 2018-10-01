import * as React from 'react';
import { render } from 'react-dom';

import Foreldrepengeoversikt from './Foreldrepengeoversikt';

import './styles/app.less';

const root = document.getElementById('app');
render(<Foreldrepengeoversikt />, root);
