import Periode, { PeriodeType, Uttaksperiode, isUtsettelsesperiode } from 'app/types/uttaksplan/Periode';
import {
    getStønadskontoFarge,
    erGradert,
    getVarighetString,
    getNavnPåForelderForPeriode,
} from 'app/utils/periodeUtils';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import IconBox from 'app/components/ikoner/uttaksplanIkon/iconBox/IconBox';
import React from 'react';
import UttakIkon from 'app/components/ikoner/UttakIkon';
import { NavnPåForeldre } from 'common/components/oversikt-brukte-dager/OversiktBrukteDager';
import { IntlShape } from 'react-intl';
import { UtsettelsePeriodeType } from 'app/api/types/UttaksplanDto';
import ArbeidIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/ArbeidIkon';
import SykdomIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/SykdomIkon';
import FerieIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/FerieIkon';
import { Tidsperiode } from 'app/types/Tidsperiode';
import moment from 'moment';
import { Rolle } from 'app/types/Rolle';

export const getIconFarge = (periode: Periode, erFarEllerMedmor: boolean) => {
    switch (periode.type) {
        case PeriodeType.Uttak:
            return getStønadskontoFarge(
                (periode as Uttaksperiode).stønadskontotype,
                erFarEllerMedmor ? Rolle.farMedmor : Rolle.mor,
                true
            );
        case PeriodeType.Utsettelse:
            return UttaksplanColor.green;
        default:
            return UttaksplanColor.transparent;
    }
};

export const getIkon = (periode: Periode, erFarEllerMedmor: boolean) => {
    if (isUtsettelsesperiode(periode)) {
        switch (periode.årsak) {
            case UtsettelsePeriodeType.Arbeid:
                return (
                    <IconBox color={getIconFarge(periode, erFarEllerMedmor)}>
                        <ArbeidIkon title="Arbeidsperiode ikon" />
                    </IconBox>
                );
            case UtsettelsePeriodeType.BarnInnlagt:
            case UtsettelsePeriodeType.SykdomSkade:
            case UtsettelsePeriodeType.SøkerInnlagt:
                return (
                    <IconBox color={getIconFarge(periode, erFarEllerMedmor)}>
                        <SykdomIkon title="Sykdomsperiode ikon" />
                    </IconBox>
                );
            case UtsettelsePeriodeType.Ferie:
                return (
                    <IconBox color={getIconFarge(periode, erFarEllerMedmor)}>
                        <FerieIkon title="Uttaksperiode ikon" />
                    </IconBox>
                );
        }
    }

    return (
        <IconBox color={getIconFarge(periode, erFarEllerMedmor)} stripes={erGradert(periode)}>
            <UttakIkon title="uttak ikon" />
        </IconBox>
    );
};

const getAntallUttaksdagerITidsperiode = (tidsperiode: Tidsperiode): number => {
    let fom = moment(tidsperiode.fom);
    const tom = moment(tidsperiode.tom);
    let antall = 0;
    while (fom.isSameOrBefore(tom, 'day')) {
        if (fom.isoWeekday() !== 6 && fom.isoWeekday() !== 7) {
            antall++;
        }
        fom = fom.add(24, 'hours');
    }
    return antall;
};

export const getBeskrivelse = (periode: Periode, navnPåForeldre: NavnPåForeldre, intl: IntlShape) => {
    return (
        <>
            {getVarighetString(getAntallUttaksdagerITidsperiode(periode.tidsperiode), intl)}
            <em className="periode-list__hvem"> - {getNavnPåForelderForPeriode(periode, navnPåForeldre)}</em>
        </>
    );
};
