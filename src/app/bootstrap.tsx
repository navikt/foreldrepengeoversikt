import * as React from 'react';
import { render } from 'react-dom';

import IntlProvider from './intl/IntlProvider';
import Foreldrepengeoversikt from './Foreldrepengeoversikt';

import './styles/app.less';

const root = document.getElementById('app');
render(
    <IntlProvider>
        <Foreldrepengeoversikt />
    </IntlProvider>,
    root
);
