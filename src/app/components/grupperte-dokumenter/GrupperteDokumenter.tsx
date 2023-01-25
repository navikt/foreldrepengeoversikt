import React from 'react';
import { Dokument as DokumentType } from 'app/types/Dokument';
import Dokument from '../dokument/Dokument';
import { bemUtils, guid } from '@navikt/fp-common';
import { Accordion, BodyShort } from '@navikt/ds-react';

import './grupperte-dokumenter.css';

interface Props {
    dokumenter: DokumentType[];
}

const GrupperteDokumenter: React.FunctionComponent<Props> = ({ dokumenter }) => {
    const bem = bemUtils('grupperte-dokumenter');

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header className={bem.element('header')}>
                    <BodyShort>Grupperte dokumenter</BodyShort>
                </Accordion.Header>
                <Accordion.Content>
                    {dokumenter.map((dokument) => {
                        return <Dokument key={guid()} dokument={dokument} />;
                    })}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default GrupperteDokumenter;
