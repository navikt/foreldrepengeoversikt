import { BodyShort, Link } from '@navikt/ds-react';
import React from 'react';
import { FileContentFilled } from '@navikt/ds-icons';
import { bemUtils, formatDate } from '@navikt/fp-common';
import { Dokument } from 'app/types/Dokument';

import './dokument.css';

interface Props {
    dokument: Dokument;
}

const Dokument: React.FunctionComponent<Props> = ({ dokument }) => {
    const bem = bemUtils('dokument');
    const { tittel } = dokument;

    return (
        <div className={bem.block}>
            <FileContentFilled className={bem.element('ikon')} />
            <div className={bem.element('content')}>
                <Link href={dokument.url}>{tittel}</Link>
                <BodyShort size="small">Fra deg {`${formatDate(dokument.mottatt)}`}</BodyShort>
            </div>
        </div>
    );
};

export default Dokument;
