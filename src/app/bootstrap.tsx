import * as React from 'react';
import { render } from 'react-dom';

import IntlProvider from './intl/IntlProvider';
import Foreldrepengeoversikt from './Foreldrepengeoversikt';

import './styles/app.less';
import ErrorBoundary from 'common/components/error-boundary/ErrorBoundary';

const root = document.getElementById('app');
render(
    <ErrorBoundary>
        <IntlProvider>
            <Foreldrepengeoversikt />
        </IntlProvider>
    </ErrorBoundary>,
    root
);
