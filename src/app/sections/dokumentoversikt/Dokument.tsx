import { BodyShort, Link } from '@navikt/ds-react';
import React from 'react';
import { FileContentFilled } from '@navikt/ds-icons';
import { bemUtils } from '@navikt/fp-common';

import './dokument.css';

interface Props {
    name: string;
}

const Dokument: React.FunctionComponent<Props> = ({ name }) => {
    const bem = bemUtils('dokument');

    return (
        <div className={bem.block}>
            <FileContentFilled className={bem.element('ikon')} />
            <div className={bem.element('content')}>
                <Link>{name}</Link>
                <BodyShort size="small">Fra deg 15.06.2023 kl 12:31</BodyShort>
            </div>
        </div>
    );
};

export default Dokument;
