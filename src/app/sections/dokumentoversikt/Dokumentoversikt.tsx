import { Button } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import React from 'react';
import Dokument from './Dokument';

import './dokumentoversikt.css';

const Dokumentoversikt = () => {
    const bem = bemUtils('dokumentoversikt');

    return (
        <>
            <Button variant="secondary" className={bem.element('ettersend-knapp')}>
                Ettersend dokumenter
            </Button>
            <Dokument name="Foreldrepengesøknad" />
            <Dokument name="Timelister" />
            <Dokument name="Terminbekreftelse" />
        </>
    );
};

export default Dokumentoversikt;
