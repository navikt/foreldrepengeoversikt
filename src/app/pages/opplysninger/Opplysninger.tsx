import { Alert } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import Sorry from 'assets/Sorry';
import React from 'react';
import { useParams } from 'react-router-dom';

import './opplysninger.css';

const Opplysninger = () => {
    const bem = bemUtils('opplysninger');
    const params = useParams();

    console.log(params);

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

export default Opplysninger;
