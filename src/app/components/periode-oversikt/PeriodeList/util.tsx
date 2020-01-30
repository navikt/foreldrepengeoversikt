import Periode, { PeriodeType, Uttaksperiode, isUtsettelsesperiode } from 'app/types/uttaksplan/Periode';
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
import { UtsettelsePeriodeType } from 'app/api/types/UttaksplanDto';
import ArbeidIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/ArbeidIkon';
import SykdomIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/SykdomIkon';
import FerieIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/FerieIkon';

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
    if (isUtsettelsesperiode(periode)) {
        switch (periode.årsak) {
            case UtsettelsePeriodeType.Arbeid:
                return (
                    <IconBox color={getIconFarge(periode)}>
                        <ArbeidIkon title="Arbeidsperiode ikon" />
                    </IconBox>
                );
            case UtsettelsePeriodeType.BarnInnlagt:
            case UtsettelsePeriodeType.SykdomSkade:
            case UtsettelsePeriodeType.SøkerInnlagt:
                return (
                    <IconBox color={getIconFarge(periode)}>
                        <SykdomIkon title="Sykdomsperiode ikon" />
                    </IconBox>
                );
            case UtsettelsePeriodeType.Ferie:
                return (
                    <IconBox color={getIconFarge(periode)}>
                        <FerieIkon title="Uttaksperiode ikon" />
                    </IconBox>
                );
        }
    }

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
