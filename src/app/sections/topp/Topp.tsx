import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import TeddyBearCot from 'assets/TeddyBearCot';
import React from 'react';

import './topp.css';

const Topp = () => {
    const bem = bemUtils('topp');

    return (
        <div className={bem.block}>
            <Heading size="large">Dine foreldrepenger</Heading>
            <div className={bem.element('content')}>
                <div>
                    <BodyShort>Saksnummer 2754463986</BodyShort>
                    <BodyShort>Termindato 13. okt 2022</BodyShort>
                </div>
                <TeddyBearCot />
            </div>
        </div>
    );
};

export default Topp;
