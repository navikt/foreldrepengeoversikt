import * as React from 'react';
import SectionSeparator from '../section-separator/SectionSeparator';
import PeriodeOversikt from '../periode-oversikt/PeriodeOversikt';
import { Uttaksperiode } from 'app/types/Søknadsgrunnlag';

import './dinPlan.less';

interface Props {
    perioder: Uttaksperiode[];
};

const DinPlan: React.FunctionComponent<Props> = ({ perioder }) => {
    return (
        <SectionSeparator title="Din Plan">
            <PeriodeOversikt perioder={perioder} />
        </SectionSeparator>
    );
};
export default DinPlan;