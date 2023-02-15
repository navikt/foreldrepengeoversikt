import { BodyShort } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import SelectedRoute from 'app/types/SelectedRoute';
import React from 'react';

const DinPlanPage = () => {
    const bem = bemUtils('din-plan-page');
    useSetSelectedRoute(SelectedRoute.DIN_PLAN);

    return (
        <div className={bem.block}>
            <BodyShort>Din plan</BodyShort>
        </div>
    );
};

export default DinPlanPage;
