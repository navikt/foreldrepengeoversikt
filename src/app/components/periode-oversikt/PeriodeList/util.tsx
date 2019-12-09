import Periode, { PeriodeType, Uttaksperiode } from 'app/types/uttaksplan/Periode';
import {
    getStønadskontoFarge,
    erGradert,
    getVarighetString,
    getNavnPåForelderForPeriode
} from 'app/utils/periodeUtils';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import IconBox from 'app/components/ikoner/uttaksplanIkon/iconBox/IconBox';
import React from 'react';
import UttakIkon from 'app/components/ikoner/UttakIkon';
import { NavnPåForeldre } from 'common/components/oversikt-brukte-dager/OversiktBrukteDager';
import { InjectedIntl } from 'react-intl';

export const getIconFarge = (periode: Periode) => {
    switch (periode.type) {
        case PeriodeType.Uttak:
            return getStønadskontoFarge((periode as Uttaksperiode).stønadskontotype, undefined, true);
        case PeriodeType.Utsettelse:
            return UttaksplanColor.green;
        default:
            return UttaksplanColor.transparent;
    }
};

export const getIkon = (periode: Periode) => {
    return (
        <IconBox color={getIconFarge(periode)} stripes={erGradert(periode)}>
            <UttakIkon title="uttak ikon" />
        </IconBox>
    );
};

export const getBeskrivelse = (periode: Periode, navnPåForeldre: NavnPåForeldre, intl: InjectedIntl) => {
    return (
        <>
            {getVarighetString(periode.antallUttaksdager, intl)}
            <em className="periode-list__hvem"> - {getNavnPåForelderForPeriode(periode, navnPåForeldre)}</em>
        </>
    );
};
