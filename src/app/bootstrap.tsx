import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import IntlProvider from './intl/IntlProvider';
import Foreldrepengeoversikt from './Foreldrepengeoversikt';
import store from './redux/store';
import ErrorBoundary from 'common/components/error-boundary/ErrorBoundary';
import ByttBrowserModal from 'common/components/bytt-browser-modal/ByttBrowserModal';

import './styles/app.less';

const root = document.getElementById('app');
render(
    <IntlProvider>
        <ErrorBoundary>
            <Provider store={store}>             
                <ByttBrowserModal />
                <Foreldrepengeoversikt />
            </Provider>
        </ErrorBoundary>
    </IntlProvider>,
    root
);
