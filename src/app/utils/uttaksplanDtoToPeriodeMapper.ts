import { UttaksPeriodeDto } from 'app/api/types/UttaksplanDto';
import {
    PeriodeType,
    Utsettelsesperiode,
    Uttaksperiode,
    Oppholdsperiode,
    TaptPeriode
} from 'app/types/uttaksplan/Periode';
import { getAntallUttaksdagerITidsperiode, erTaptPeriode } from 'app/components/periode-oversikt/periodeUtils';
import { Rolle } from 'app/types/Rolle';

const getPeriodetype = (
    uttaksperiodeDto: UttaksPeriodeDto
): PeriodeType.Opphold | PeriodeType.Utsettelse | PeriodeType.Uttak | PeriodeType.TaptPeriode => {
    if (erTaptPeriode(uttaksperiodeDto)) {
        return PeriodeType.TaptPeriode;
    }
    
    if (uttaksperiodeDto.oppholdAarsak) {
        return PeriodeType.Opphold;
    }

    return uttaksperiodeDto.stønadskontotype && uttaksperiodeDto.utsettelsePeriodeType === undefined
        ? PeriodeType.Uttak
        : PeriodeType.Utsettelse;
};

const getForelderForPeriode = (uttaksperiodeDto: UttaksPeriodeDto, søkerErFarEllerMedmor: boolean): Rolle => {
    if (uttaksperiodeDto.gjelderAnnenPart) {
        return søkerErFarEllerMedmor ? Rolle.mor : Rolle.farMedmor;
    }
    return søkerErFarEllerMedmor ? Rolle.farMedmor : Rolle.mor;
};

export const uttaksperiodeDtoToPeriode = (uttaksperiodeDto: UttaksPeriodeDto, søkerErFarEllerMedmor: boolean) => {
    switch (getPeriodetype(uttaksperiodeDto)) {
        case PeriodeType.Uttak:
            return uttaksperiodeDtoUTottaksperiode(uttaksperiodeDto, søkerErFarEllerMedmor);
        case PeriodeType.Utsettelse:
            return uttaksperiodeDtoToUtsettelsesperiode(uttaksperiodeDto, søkerErFarEllerMedmor);
        case PeriodeType.Opphold:
            return uttaksperiodeDtoUToOppholdsperiode(uttaksperiodeDto, søkerErFarEllerMedmor);
        case PeriodeType.TaptPeriode:
            return uttaksperiodeDtoUToTaptPeriode(uttaksperiodeDto, søkerErFarEllerMedmor);
    }
};

const uttaksperiodeDtoUToTaptPeriode = (
    uttaksperiodeDto: UttaksPeriodeDto,
    søkerErFarEllerMedmor: boolean
): TaptPeriode => ({
    type: PeriodeType.TaptPeriode,
    tidsperiode: uttaksperiodeDto.periode,
    antallUttaksdager: getAntallUttaksdagerITidsperiode(uttaksperiodeDto.periode),
    forelder: getForelderForPeriode(uttaksperiodeDto, søkerErFarEllerMedmor),
    stønadskontotype: uttaksperiodeDto.stønadskontotype
});

const uttaksperiodeDtoUToOppholdsperiode = (
    uttaksperiodeDto: UttaksPeriodeDto,
    søkerErFarEllerMedmor: boolean
): Oppholdsperiode => {
    return {
        type: PeriodeType.Opphold,
        gjelderAnnenPart: true,
        tidsperiode: uttaksperiodeDto.periode,
        forelder: getForelderForPeriode(uttaksperiodeDto, søkerErFarEllerMedmor),
        antallUttaksdager: getAntallUttaksdagerITidsperiode(uttaksperiodeDto.periode),
        oppholdsårsak: uttaksperiodeDto.oppholdAarsak!
    };
};

const uttaksperiodeDtoUTottaksperiode = (
    uttaksperiodeDto: UttaksPeriodeDto,
    søkerErFarEllerMedmor: boolean
): Uttaksperiode => {
    return {
        type: PeriodeType.Uttak,
        gjelderAnnenPart: uttaksperiodeDto.gjelderAnnenPart,
        tidsperiode: uttaksperiodeDto.periode,
        forelder: getForelderForPeriode(uttaksperiodeDto, søkerErFarEllerMedmor),
        antallUttaksdager: uttaksperiodeDto.trekkDager,
        stønadskontotype: uttaksperiodeDto.stønadskontotype,
        graderingInnvilget: uttaksperiodeDto.graderingInnvilget,
        graderingsprosent: (100 - uttaksperiodeDto.arbeidstidprosent).toFixed(1),
        samtidigUttak: uttaksperiodeDto.samtidigUttak,
        samtidigUttaksprosent: uttaksperiodeDto.samtidigUttaksprosent
    };
};

const uttaksperiodeDtoToUtsettelsesperiode = (
    uttaksperiodeDto: UttaksPeriodeDto,
    søkerErFarEllerMedmor: boolean
): Utsettelsesperiode => {
    return {
        type: PeriodeType.Utsettelse,
        gjelderAnnenPart: uttaksperiodeDto.gjelderAnnenPart,
        tidsperiode: uttaksperiodeDto.periode,
        forelder: getForelderForPeriode(uttaksperiodeDto, søkerErFarEllerMedmor),
        antallUttaksdager: getAntallUttaksdagerITidsperiode(uttaksperiodeDto.periode),
        årsak: uttaksperiodeDto.utsettelsePeriodeType
    };
};
