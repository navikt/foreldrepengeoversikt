import React, { FunctionComponent } from 'react';
import ByttBrowserModal from './components/bytt-browser-modal/ByttBrowserModal';
import Foreldrepengeoversikt from './Foreldrepengeoversikt';
import IntlProvider from './intl/IntlProvider';

const AppContainer: FunctionComponent = () => {
    return (
        <IntlProvider locale="nb">
            <ByttBrowserModal />
            <Foreldrepengeoversikt />
        </IntlProvider>
    );
};

export default AppContainer;
