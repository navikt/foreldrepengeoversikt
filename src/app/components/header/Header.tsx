import { Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import TåteflaskeBaby from 'assets/TåteflaskeBaby';
import React from 'react';

import './header.css';

const Header: React.FunctionComponent = () => {
    const bem = bemUtils('header');

    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <TåteflaskeBaby />
                <div className={bem.element('title-container')}>
                    <Heading size="xlarge">Foreldrepengene mine</Heading>
                    <p>Stuff</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
