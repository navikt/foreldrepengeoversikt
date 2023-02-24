import { StønadskontoType } from 'app/types/StønadskontoType';
import { getStønadskontoForelderNavn } from 'app/utils/periodeUtils';
import { NavnPåForeldre } from 'app/utils/personUtils';
import { getStønadskontoFarge } from 'app/utils/styleUtils';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

export interface Props {
    erAleneOmOmsorg?: boolean;
    erFarEllerMedmor?: boolean;
    gradert?: boolean;
    konto: StønadskontoType;
    navnPåForeldre: NavnPåForeldre;
}

const StønadskontoIkon: FunctionComponent<Props> = ({
    konto,
    gradert,
    navnPåForeldre,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();

    return (
        <IconBox color={getStønadskontoFarge(konto)} stripes={gradert}>
            <UttaksplanIkon
                ikon={UttaksplanIkonKeys.uttak}
                title={getStønadskontoForelderNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg)}
            />
        </IconBox>
    );
};

export default StønadskontoIkon;
