import { Alert } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import Sorry from 'assets/Sorry';
import React from 'react';

import './samtaler-page.css';

const SamtalerPage = () => {
    const bem = bemUtils('samtaler-page');

    return (
        <div className={bem.block}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Sorry />
            </div>
            <Alert variant="info" fullWidth>
                Vi jobber med å implementere denne siden. Vi beklager problemer det kan medføre.
            </Alert>
        </div>
    );
};

export default SamtalerPage;
