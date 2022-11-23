import { Link } from '@navikt/ds-react';
import React from 'react';
import { FileContentFilled } from '@navikt/ds-icons';
import { bemUtils } from '@navikt/fp-common';
import { Dokument as DokumentHendelse } from 'app/types/Dokument';

import './dokument-hendelse.css';

interface Props {
    dokument: DokumentHendelse;
}

const DokumentHendelse: React.FunctionComponent<Props> = ({ dokument }) => {
    const bem = bemUtils('dokument-hendelse');
    const { tittel } = dokument;

    return (
        <li className={bem.block}>
            <FileContentFilled className={bem.element('ikon')} />
            <div className={bem.element('content')}>
                <Link href={dokument.url} className={bem.element('ikon')} target="_blank">
                    {tittel}
                </Link>
            </div>
        </li>
    );
};

export default DokumentHendelse;
