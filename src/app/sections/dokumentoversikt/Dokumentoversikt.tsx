import { Button, Loader } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import Api from 'app/api/api';
import React from 'react';
import { default as DokumentComponent } from './Dokument';

import './dokumentoversikt.css';

const Dokumentoversikt: React.FunctionComponent = () => {
    const bem = bemUtils('dokumentoversikt');
    const { dokumenterData: dokumenter, dokumenterError } = Api.useGetDokumenter();

    if (dokumenterError) {
        return <div>Vi klarte ikke å hente dokumentene for din sak</div>;
    }

    if (!dokumenter) {
        return <Loader aria-label="Laster dokumenter" />;
    }

    return (
        <>
            <Button variant="secondary" className={bem.element('ettersend-knapp')}>
                Ettersend dokumenter
            </Button>
            {dokumenter.map((dokument) => {
                return <DokumentComponent key={dokument.url} dokument={dokument} />;
            })}
        </>
    );
};

export default Dokumentoversikt;
