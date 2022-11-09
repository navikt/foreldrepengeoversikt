import { BodyShort, Link } from '@navikt/ds-react';
import React from 'react';
import { FileContentFilled } from '@navikt/ds-icons';
import { bemUtils, formatDateExtended } from '@navikt/fp-common';
import { Dokument } from 'app/types/Dokument';
import { DokumentType } from 'app/types/DokumentType';

import './dokument.css';

interface Props {
    dokument: Dokument;
}

const getDokumentTypeTekst = (type: DokumentType, mottatt: Date) => {
    if (type === DokumentType.INNGÅENDE_DOKUMENT) {
        return `Fra deg ${formatDateExtended(mottatt)}`;
    }

    return `Til deg ${formatDateExtended(mottatt)}`;
};

const Dokument: React.FunctionComponent<Props> = ({ dokument }) => {
    const bem = bemUtils('dokument');
    const { tittel, type, mottatt } = dokument;
    const dokumentTypeTekst = getDokumentTypeTekst(type, mottatt);

    return (
        <div className={bem.block}>
            <FileContentFilled className={bem.element('ikon')} />
            <div className={bem.element('content')}>
                <Link href={dokument.url}>{tittel}</Link>
                <BodyShort size="small">{dokumentTypeTekst}</BodyShort>
            </div>
        </div>
    );
};

export default Dokument;
