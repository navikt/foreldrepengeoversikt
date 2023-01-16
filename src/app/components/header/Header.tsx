import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import TåteflaskeBaby from 'assets/TåteflaskeBaby';
import React from 'react';
import PreviousLink from '../previous-link/PreviousLink';

import './header.css';

interface Props {
    route: string;
    externalURL?: boolean;
    linkLabel: string;
}

const Header: React.FunctionComponent<Props> = ({ route, externalURL = false, linkLabel }) => {
    const bem = bemUtils('header');

    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <PreviousLink route={route} externalURL={externalURL} linkLabel={linkLabel} />
                <div className={bem.element('content')}>
                    <TåteflaskeBaby />
                    <div className={bem.element('title-container')}>
                        <Heading size="xlarge">Foreldrepengene mine</Heading>
                        <BodyShort>PENGESTØTTE</BodyShort>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
