import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import IntlProvider from './intl/IntlProvider';
import Foreldrepengeoversikt from './Foreldrepengeoversikt';
import store from './redux/store';


import './styles/app.less';

const root = document.getElementById('app');
render(
    <IntlProvider>
        <Provider store={store}>
            <Foreldrepengeoversikt />
        </Provider>
    </IntlProvider>,
    root
);
