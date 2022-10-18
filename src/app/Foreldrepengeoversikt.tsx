import { bemUtils } from '@navikt/fp-common';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ForeldrepengeoversiktRoutes from './routes/ForeldrepengeoversiktRoutes';

import './styles/app.css';

const Foreldrepengeoversikt: React.FunctionComponent = () => {
    const bem = bemUtils('app');

    return (
        <div className={bem.block}>
            <BrowserRouter>
                <ForeldrepengeoversiktRoutes />
            </BrowserRouter>
        </div>
    );
};

export default Foreldrepengeoversikt;
