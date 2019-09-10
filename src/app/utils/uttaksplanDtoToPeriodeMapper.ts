import { UttaksPeriodeDto } from 'app/api/types/UttaksplanDto';
import { PeriodeType, Utsettelsesperiode, Uttaksperiode } from 'app/types/uttaksplan/Periode';
import { getAntallUttaksdagerITidsperiode } from 'app/components/periode-oversikt/periodeUtils';
import { Rolle } from 'app/types/Rolle';

const getPeriodetype = (uttaksperiodeDto: UttaksPeriodeDto): PeriodeType => {
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
    return getPeriodetype(uttaksperiodeDto) === PeriodeType.Uttak
        ? uttaksperiodeDtoUTottaksperiode(uttaksperiodeDto, søkerErFarEllerMedmor)
        : uttaksperiodeDtoToUtsettelsesperiode(uttaksperiodeDto, søkerErFarEllerMedmor);
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
        samtidigUttak: uttaksperiodeDto.samtidigUttak
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
