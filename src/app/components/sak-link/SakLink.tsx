import { Heading, LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { Sak } from 'app/types/Sak';
import React from 'react';
import { Link } from 'react-router-dom';

import './sak-link.css';

interface Props {
    sak: Sak;
}

const SakLink: React.FunctionComponent<Props> = ({ sak }) => {
    const bem = bemUtils('sak-link');

    return (
        <LinkPanel as={Link} to={`${sak.saksnummer}`} className={bem.block}>
            <Heading level="3" size="medium">
                Foreldrepenger
            </Heading>
        </LinkPanel>
    );
};

export default SakLink;
