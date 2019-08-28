import * as React from 'react';
import SectionSeparator from '../section-separator/SectionSeparator';
import PeriodeOversikt from '../periode-oversikt/PeriodeOversikt';
import { Uttaksperiode } from 'app/types/uttaksplan/Søknadsgrunnlag';
import { Routes } from 'app/utils/routes';
import { FormattedMessage } from 'react-intl';

import './dinPlan.less';

interface Props {
    perioder: Uttaksperiode[];
};

const DinPlan: React.FunctionComponent<Props> = ({ perioder }) => {
    return (
        <SectionSeparator title="Din Plan" sectionLink={{ to: Routes.DIN_PLAN, text: <FormattedMessage id="saksoversikt.section.dinPlan.sectionLink" />}}>
            <PeriodeOversikt perioder={perioder} />
        </SectionSeparator>
    );
};
export default DinPlan;