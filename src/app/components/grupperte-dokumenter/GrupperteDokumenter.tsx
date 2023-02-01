import React from 'react';
import { Dokument as DokumentType } from 'app/types/Dokument';
import Dokument from '../dokument/Dokument';
import { bemUtils, formatDateExtended, guid } from '@navikt/fp-common';
import { Accordion, BodyShort } from '@navikt/ds-react';

import './grupperte-dokumenter.css';
import { Folder } from '@navikt/ds-icons';

interface Props {
    dokumenter: DokumentType[];
}

const GrupperteDokumenter: React.FunctionComponent<Props> = ({ dokumenter }) => {
    const bem = bemUtils('grupperte-dokumenter');

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header className={bem.element('header')}>
                    <div style={{ display: 'flex', marginLeft: '0', paddingLeft: '0' }}>
                        <Folder style={{ marginRight: '1rem' }} />
                        <BodyShort>Innsendt søknad - {formatDateExtended(dokumenter[0].mottatt)}</BodyShort>
                    </div>
                </Accordion.Header>
                <Accordion.Content className={bem.element('content')}>
                    {dokumenter.map((dokument) => {
                        return <Dokument key={guid()} dokument={dokument} />;
                    })}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default GrupperteDokumenter;
