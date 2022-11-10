import { Alert } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import React from 'react';
import sorry from './../.../../../../assets/sorry.jpg';

import './samtaler-page.css';

const SamtalerPage = () => {
    const bem = bemUtils('samtaler-page');

    return (
        <div className={bem.block}>
            <img src={sorry} width={639} />
            <Alert variant="info" fullWidth>
                Vi jobber med å implementere denne siden. Vi beklager problemer det kan medføre.
            </Alert>
        </div>
    );
};

export default SamtalerPage;
