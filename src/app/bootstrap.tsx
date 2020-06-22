import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import * as Sentry from '@sentry/browser';

import IntlProvider from './intl/IntlProvider';
import Foreldrepengeoversikt from './Foreldrepengeoversikt';
import store from './redux/store';
import ErrorBoundary from 'common/components/error-boundary/ErrorBoundary';
import ByttBrowserModal from 'common/components/bytt-browser-modal/ByttBrowserModal';

import './styles/app.less';

if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/dist/locale-data/nb');
}

Sentry.init({
    dsn: 'https://b4fd4db97e7d4663852a5203961e3cee@sentry.gc.nav.no/6',
    release: (window as any).APP_VERSION,
    environment: window.location.hostname,
    integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
});

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
