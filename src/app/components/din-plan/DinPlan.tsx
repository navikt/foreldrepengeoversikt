import * as React from 'react';
import SectionSeparator from '../section-separator/SectionSeparator';
import PeriodeOversikt from '../periode-oversikt/PeriodeOversikt';
import { Routes } from 'app/utils/routes';
import { FormattedMessage } from 'react-intl';
import Periode from 'app/types/uttaksplan/Periode';
import Personinfo from 'app/api/types/personinfo/Personinfo';
import AnnenPart from 'app/api/types/sak/AnnenPart';

interface Props {
    perioder: Periode[];
    søker: Personinfo;
    annenPart?: AnnenPart;
}

const DinPlan: React.FunctionComponent<Props> = ({ perioder, søker, annenPart }) => {
    return (
        <SectionSeparator
            title="Din Plan"
            sectionLink={{
                to: Routes.DIN_PLAN,
                text: <FormattedMessage id="saksoversikt.section.dinPlan.sectionLink" />
            }}>
            <PeriodeOversikt perioder={perioder} søker={søker} annenPart={annenPart} />
        </SectionSeparator>
    );
};
export default DinPlan;
