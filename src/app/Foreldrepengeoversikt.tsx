import { Loader } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Api from './api/api';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import ForeldrepengeoversiktRoutes from './routes/ForeldrepengeoversiktRoutes';

import './styles/app.css';

const Foreldrepengeoversikt: React.FunctionComponent = () => {
    const bem = bemUtils('app');

    const { søkerinfoData, søkerinfoError } = Api.useSøkerinfo();
    const { sakerData, sakerError } = Api.useGetSaker();
    const { annenPartsVedakData, annenPartsVedtakError } = Api.useGetAnnenPartsVedtak(true);

    useEffect(() => {
        if (søkerinfoError) {
            throw new Error(
                'Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.'
            );
        }

        if (sakerError) {
            throw new Error(
                'Vi opplever problemer med å hente informasjon om din sak. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.'
            );
        }

        if (annenPartsVedtakError) {
            throw new Error('Vi klarte ikke å hente opp informasjon om den andre forelderen.');
        }
    }, [søkerinfoError, sakerError, annenPartsVedtakError]);

    console.log(annenPartsVedakData);

    if (!søkerinfoData || !sakerData) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader type="XXL" />
            </div>
        );
    }

    return (
        <div className={bem.block}>
            <BrowserRouter>
                <ScrollToTop />
                <ForeldrepengeoversiktRoutes søkerinfo={søkerinfoData} foreldrepengerSaker={sakerData.foreldrepenger} />
            </BrowserRouter>
        </div>
    );
};

export default Foreldrepengeoversikt;
