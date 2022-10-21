import { Loader } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Api from './api/api';
import ForeldrepengeoversiktRoutes from './routes/ForeldrepengeoversiktRoutes';

import './styles/app.css';

const Foreldrepengeoversikt: React.FunctionComponent = () => {
    const bem = bemUtils('app');

    const { søkerinfoData, søkerinfoError } = Api.useSøkerinfo();

    useEffect(() => {
        if (søkerinfoError) {
            throw new Error(
                'Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.'
            );
        }
    }, [søkerinfoError]);

    if (!søkerinfoData) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader type="XXL" />
            </div>
        );
    }

    return (
        <div className={bem.block}>
            <BrowserRouter>
                <ForeldrepengeoversiktRoutes søkerinfo={søkerinfoData} />
            </BrowserRouter>
        </div>
    );
};

export default Foreldrepengeoversikt;
