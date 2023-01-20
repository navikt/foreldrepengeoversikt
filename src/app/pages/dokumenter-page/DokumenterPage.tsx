import { Button, Loader } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import Api from 'app/api/api';
import { useSetBackgroundColor } from 'app/hooks/useSetBackgroundColor';
import OversiktRoutes from 'app/routes/routes';
import Dokument from 'app/sections/dokumentoversikt/Dokument';
import React from 'react';
import { Link } from 'react-router-dom';

import './dokumenter-page.css';

const DokumenterPage: React.FunctionComponent = () => {
    const bem = bemUtils('dokumenter-page');
    useSetBackgroundColor('white');

    const { dokumenterData: dokumenter, dokumenterError } = Api.useGetDokumenter();

    if (dokumenterError) {
        return <div>Vi klarte ikke å hente dokumentene for din sak</div>;
    }

    if (!dokumenter) {
        return <Loader size="large" aria-label="Henter dokumenter" />;
    }

    return (
        <>
            <Button variant="secondary" className={bem.element('ettersend-knapp')}>
                Ettersend dokumenter
            </Button>
            {dokumenter.map((dokument, index) => {
                if (index >= 3) {
                    return null;
                }

                return <Dokument key={dokument.url} dokument={dokument} />;
            })}
            <Link to={OversiktRoutes.DOKUMENTER}>Se liste over alle dokumenter</Link>
        </>
    );
};

export default DokumenterPage;
