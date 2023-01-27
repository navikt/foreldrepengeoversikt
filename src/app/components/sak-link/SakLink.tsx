import { Heading, LinkPanel } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { EngangsstønadSak } from 'app/types/EngangsstønadSak';
import { Sak } from 'app/types/Sak';
import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';
import { Ytelse } from 'app/types/Ytelse';
import React from 'react';
import { Link } from 'react-router-dom';

import './sak-link.css';

interface Props {
    sak: Sak | EngangsstønadSak | SvangerskapspengeSak;
}

const getHeading = (ytelse: Ytelse) => {
    switch (ytelse) {
        case Ytelse.ENGANGSSTØNAD:
            return 'Engangsstønad';
        case Ytelse.FORELDREPENGER:
            return 'Foreldrepenger';
        case Ytelse.SVANGERSKAPSPENGER:
            return 'Svangerskapspenger';
    }
};

const SakLink: React.FunctionComponent<Props> = ({ sak }) => {
    const bem = bemUtils('sak-link');

    return (
        <LinkPanel as={Link} to={`${sak.saksnummer}`} className={bem.block}>
            <Heading level="3" size="medium">
                {getHeading(sak.ytelse)}
            </Heading>
        </LinkPanel>
    );
};

export default SakLink;
