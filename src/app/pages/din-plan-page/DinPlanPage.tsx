import { BodyShort } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import React from 'react';

const DinPlanPage = () => {
    const bem = bemUtils('din-plan-page');

    return (
        <div className={bem.block}>
            <BodyShort>Din plan</BodyShort>
        </div>
    );
};

export default DinPlanPage;
