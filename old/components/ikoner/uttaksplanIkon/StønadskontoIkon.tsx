import * as React from 'react';
import UttaksplanIkon, { UttaksplanIkonKeys } from './UttaksplanIkon';
import { useIntl } from 'react-intl';
import IconBox from './iconBox/IconBox';
import { StønadskontoType } from 'app/api/types/UttaksplanDto';
import { NavnPåForeldre } from '../old/common/components/oversikt-brukte-dager/OversiktBrukteDager';
import { getStønadskontoFarge } from 'app/utils/periodeUtils';
import { getStønadskontoNavn } from '../old/common/components/uttaksoppsummering/Kontostatus';
import { Rolle } from 'app/types/Rolle';

export interface Props {
    konto: StønadskontoType;
    forelder?: Rolle;
    gradert?: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
}

const StønadskontoIkon: React.FunctionComponent<Props> = ({
    konto,
    forelder,
    gradert,
    navnPåForeldre,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();

    return (
        <IconBox color={getStønadskontoFarge(konto, forelder, true)} stripes={gradert}>
            <UttaksplanIkon
                ikon={UttaksplanIkonKeys.uttak}
                title={getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg)}
            />
        </IconBox>
    );
};

export default StønadskontoIkon;
