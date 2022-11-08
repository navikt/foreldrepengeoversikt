import { Button } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { Dokument } from 'app/types/Dokument';
import React from 'react';
import { default as DokumentComponent } from './Dokument';

import './dokumentoversikt.css';

interface Props {
    dokumenter: Dokument[];
}

const Dokumentoversikt: React.FunctionComponent<Props> = ({ dokumenter }) => {
    const bem = bemUtils('dokumentoversikt');

    return (
        <>
            <Button variant="secondary" className={bem.element('ettersend-knapp')}>
                Ettersend dokumenter
            </Button>
            {dokumenter.map((dokument) => {
                return <DokumentComponent dokument={dokument} />;
            })}
        </>
    );
};

export default Dokumentoversikt;
