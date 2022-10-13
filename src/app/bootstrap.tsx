import * as React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/browser';
import '@navikt/ds-css';

import IntlProvider from './intl/IntlProvider';
import Foreldrepengeoversikt from './Foreldrepengeoversikt';
import ByttBrowserModal from './components/bytt-browser-modal/ByttBrowserModal';

if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/locale-data/nb');
}

Sentry.init({
    dsn: 'https://b4fd4db97e7d4663852a5203961e3cee@sentry.gc.nav.no/6',
    release: (window as any).APP_VERSION,
    environment: window.location.hostname,
    integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
});

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
    <IntlProvider locale="nb">
        <ByttBrowserModal />
        <Foreldrepengeoversikt />
    </IntlProvider>
);
