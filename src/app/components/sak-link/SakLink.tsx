import { Heading, LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { Sak } from 'app/types/Sak';
import React from 'react';

import './sak-link.css';

interface Props {
    sak: Sak;
}

const SakLink: React.FunctionComponent<Props> = ({ sak }) => {
    const bem = bemUtils('sak-link');

    return (
        <LinkPanel href={`${sak.saksnummer}`} className={bem.block}>
            <Heading level="3" size="medium">
                Foreldrepenger
            </Heading>
        </LinkPanel>
    );
};

export default SakLink;
