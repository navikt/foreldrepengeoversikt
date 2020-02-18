import { erDuplikatPeriodePgaFlereArbeidsforhold, cleanupUttaksplanDto } from '../uttaksplanDtoUtils';
import {
    PeriodeDto,
    PeriodeResultatType,
    UtsettelsePeriodeType,
    StønadskontoType,
    UttakArbeidType,
    MorsAktivitetDto
} from 'app/api/types/UttaksplanDto';

describe('uttaksplanDtoUtils', () => {
    describe('isDuplicateCausedByDiffrentEmployers', () => {
        it('Should return true if uttaksperiodeDto is a duplicate with diffrent employer', () => {
            const list = [
                {
                    utsettelsePeriodeType: 'FERIE',
                    periodeResultatType: 'INNVILGET',
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    trekkDager: 0.0,
                    arbeidstidprosent: 0,
                    utbetalingsprosent: 0,
                    gjelderAnnenPart: false,
                    manueltBehandlet: false,
                    flerbarnsdager: false,
                    uttakArbeidType: 'ORDINÆRT_ARBEID',
                    arbeidsgiverInfo: {
                        id: '12345',
                        type: 'ORGANISASJON',
                        navn: 'NAV'
                    },
                    periode: { fom: '2019-10-29', tom: '2019-11-15' }
                },
                {
                    utsettelsePeriodeType: 'FERIE',
                    periodeResultatType: 'INNVILGET',
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    trekkDager: 0.0,
                    arbeidstidprosent: 0,
                    utbetalingsprosent: 0,
                    gjelderAnnenPart: false,
                    manueltBehandlet: false,
                    flerbarnsdager: false,
                    uttakArbeidType: 'ORDINÆRT_ARBEID',
                    arbeidsgiverInfo: {
                        id: '984042442',
                        type: 'ORGANISASJON',
                        navn: 'EQUINOR ASA, AVD TNE RD FORSKNINGSSENTER'
                    },
                    periode: { fom: '2019-10-29', tom: '2019-11-15' }
                }
            ] as PeriodeDto[];
            expect(erDuplikatPeriodePgaFlereArbeidsforhold(list[0], list)).toBeTruthy();
        });

        it('Should return false if not duplicate with diffrent employer', () => {
            const list = [
                {
                    periodeResultatType: PeriodeResultatType.Innvilget,
                    utsettelsePeriodeType: UtsettelsePeriodeType.Arbeid,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 0,
                    stønadskontotype: StønadskontoType.Fellesperiode,
                    trekkDager: 20,
                    arbeidstidprosent: 100,
                    utbetalingsprosent: 100,
                    gjelderAnnenPart: false,
                    flerbarnsdager: false,
                    manueltBehandlet: false,
                    uttakArbeidType: UttakArbeidType.OrdinærtArbeid,
                    arbeidsgiverInfo: {
                        id: '12345',
                        type: 'ORGANISASJON',
                        navn: 'NAV'
                    },
                    periode: { fom: '2019-10-29', tom: '2019-11-15' },
                    morsAktivitet: MorsAktivitetDto.Arbeid
                },
                {
                    utsettelsePeriodeType: UtsettelsePeriodeType.Ferie,
                    periodeResultatType: PeriodeResultatType.Innvilget,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    trekkDager: 0.0,
                    arbeidstidprosent: 0,
                    utbetalingsprosent: 0,
                    gjelderAnnenPart: false,
                    manueltBehandlet: false,
                    flerbarnsdager: false,
                    uttakArbeidType: UttakArbeidType.OrdinærtArbeid,
                    arbeidsgiverInfo: {
                        id: '984042442',
                        type: 'ORGANISASJON',
                        navn: 'EQUINOR ASA, AVD TNE RD FORSKNINGSSENTER'
                    },
                    periode: { fom: '2019-10-29', tom: '2019-11-15' }
                }
            ] as PeriodeDto[];
            expect(erDuplikatPeriodePgaFlereArbeidsforhold(list[0], list)).toBeFalsy();
        });
    });

    describe('cleanupUttaksplanDto', () => {
        it('skal fjerne perioden med kvote foreldrepenger før fødsel hvis perioden er avslått og utbetalingsprosent 0', () => {
            const list = [
                {
                    periodeResultatType: PeriodeResultatType.Avslått,
                    utsettelsePeriodeType: UtsettelsePeriodeType.Arbeid,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 0,
                    stønadskontotype: StønadskontoType.ForeldrepengerFørFødsel,
                    trekkDager: 20,
                    arbeidstidprosent: 100,
                    utbetalingsprosent: 0,
                    gjelderAnnenPart: false,
                    flerbarnsdager: false,
                    manueltBehandlet: false,
                    uttakArbeidType: UttakArbeidType.OrdinærtArbeid,
                    arbeidsgiverInfo: {
                        id: '12345',
                        type: 'ORGANISASJON',
                        navn: 'NAV'
                    },
                    periode: { fom: '2019-10-29', tom: '2019-11-15' },
                    morsAktivitet: MorsAktivitetDto.Arbeid
                },
                {
                    periodeResultatType: PeriodeResultatType.Innvilget,
                    utsettelsePeriodeType: UtsettelsePeriodeType.Arbeid,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 0,
                    stønadskontotype: StønadskontoType.Foreldrepenger,
                    trekkDager: 20,
                    arbeidstidprosent: 100,
                    utbetalingsprosent: 100,
                    gjelderAnnenPart: false,
                    flerbarnsdager: false,
                    manueltBehandlet: false,
                    uttakArbeidType: UttakArbeidType.OrdinærtArbeid,
                    arbeidsgiverInfo: {
                        id: '12345',
                        type: 'ORGANISASJON',
                        navn: 'NAV'
                    },
                    periode: { fom: '2019-11-16', tom: '2019-11-20' },
                    morsAktivitet: MorsAktivitetDto.Arbeid
                }
            ] as PeriodeDto[];
            expect(cleanupUttaksplanDto(list).length).toEqual(1);
            expect(cleanupUttaksplanDto(list)).toEqual([list[1]]);
        });

        it('Skal fjerne en tapt periode hvis perioden har en innvilget periode i samme tidsrom', () => {
            const list = [
                {
                    periodeResultatType: PeriodeResultatType.Avslått,
                    utsettelsePeriodeType: UtsettelsePeriodeType.Arbeid,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 0,
                    stønadskontotype: StønadskontoType.Mødrekvote,
                    trekkDager: 20,
                    arbeidstidprosent: 100,
                    utbetalingsprosent: 0,
                    gjelderAnnenPart: false,
                    flerbarnsdager: false,
                    manueltBehandlet: false,
                    uttakArbeidType: UttakArbeidType.OrdinærtArbeid,
                    arbeidsgiverInfo: {
                        id: '12345',
                        type: 'ORGANISASJON',
                        navn: 'NAV'
                    },
                    periode: { fom: '2019-11-16', tom: '2019-11-20' },
                    morsAktivitet: MorsAktivitetDto.Arbeid
                },
                {
                    periodeResultatType: PeriodeResultatType.Innvilget,
                    utsettelsePeriodeType: UtsettelsePeriodeType.Arbeid,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 0,
                    stønadskontotype: StønadskontoType.AktivitetsfriKvote,
                    trekkDager: 20,
                    arbeidstidprosent: 100,
                    utbetalingsprosent: 100,
                    gjelderAnnenPart: false,
                    flerbarnsdager: false,
                    manueltBehandlet: false,
                    uttakArbeidType: UttakArbeidType.OrdinærtArbeid,
                    arbeidsgiverInfo: {
                        id: '12345',
                        type: 'ORGANISASJON',
                        navn: 'NAV'
                    },
                    periode: { fom: '2019-11-16', tom: '2019-11-20' },
                    morsAktivitet: MorsAktivitetDto.Arbeid
                }
            ] as PeriodeDto[];
            expect(cleanupUttaksplanDto(list).length).toEqual(1);
            expect(cleanupUttaksplanDto(list)).toEqual([list[1]]);
        });

        it('Skal beholde perioder med samtidig uttak', () => {
            const list = [
                {
                    periodeResultatType: PeriodeResultatType.Innvilget,
                    utsettelsePeriodeType: UtsettelsePeriodeType.Arbeid,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 50,
                    stønadskontotype: StønadskontoType.Fellesperiode,
                    trekkDager: 20,
                    arbeidstidprosent: 100,
                    utbetalingsprosent: 100,
                    gjelderAnnenPart: false,
                    flerbarnsdager: false,
                    manueltBehandlet: false,
                    uttakArbeidType: UttakArbeidType.OrdinærtArbeid,
                    arbeidsgiverInfo: {
                        id: '12345',
                        type: 'ORGANISASJON',
                        navn: 'NAV'
                    },
                    periode: { fom: '2019-11-16', tom: '2019-11-20' },
                    morsAktivitet: MorsAktivitetDto.Arbeid
                },
                {
                    periodeResultatType: PeriodeResultatType.Innvilget,
                    utsettelsePeriodeType: UtsettelsePeriodeType.Arbeid,
                    graderingInnvilget: false,
                    samtidigUttak: true,
                    samtidigUttaksprosent: 50,
                    stønadskontotype: StønadskontoType.Fellesperiode,
                    trekkDager: 20,
                    arbeidstidprosent: 100,
                    utbetalingsprosent: 100,
                    gjelderAnnenPart: true,
                    flerbarnsdager: false,
                    manueltBehandlet: false,
                    uttakArbeidType: UttakArbeidType.OrdinærtArbeid,
                    arbeidsgiverInfo: {
                        id: '12345',
                        type: 'ORGANISASJON',
                        navn: 'NAV'
                    },
                    periode: { fom: '2019-11-16', tom: '2019-11-20' },
                    morsAktivitet: MorsAktivitetDto.Arbeid
                }
            ] as PeriodeDto[];
            expect(cleanupUttaksplanDto(list).length).toEqual(2);
            expect(cleanupUttaksplanDto(list)).toEqual(list);
        });

        it('Skal fjerne avslåtte perioder etter siste innvilget periode', () => {
            const list = [
                {
                    periodeResultatType: PeriodeResultatType.Innvilget,
                    utsettelsePeriodeType: UtsettelsePeriodeType.Arbeid,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 0,
                    stønadskontotype: StønadskontoType.Foreldrepenger,
                    trekkDager: 20,
                    arbeidstidprosent: 100,
                    utbetalingsprosent: 100,
                    gjelderAnnenPart: false,
                    flerbarnsdager: false,
                    manueltBehandlet: false,
                    uttakArbeidType: UttakArbeidType.OrdinærtArbeid,
                    arbeidsgiverInfo: {
                        id: '12345',
                        type: 'ORGANISASJON',
                        navn: 'NAV'
                    },
                    periode: { fom: '2019-11-16', tom: '2019-11-20' },
                    morsAktivitet: MorsAktivitetDto.Arbeid
                },
                {
                    periodeResultatType: PeriodeResultatType.Avslått,
                    utsettelsePeriodeType: UtsettelsePeriodeType.Arbeid,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 0,
                    stønadskontotype: StønadskontoType.Foreldrepenger,
                    trekkDager: 0,
                    arbeidstidprosent: 100,
                    utbetalingsprosent: 100,
                    gjelderAnnenPart: false,
                    flerbarnsdager: false,
                    manueltBehandlet: false,
                    uttakArbeidType: UttakArbeidType.OrdinærtArbeid,
                    arbeidsgiverInfo: {
                        id: '12345',
                        type: 'ORGANISASJON',
                        navn: 'NAV'
                    },
                    periode: { fom: '2019-11-16', tom: '2019-11-20' },
                    morsAktivitet: MorsAktivitetDto.Arbeid
                },
                {
                    periodeResultatType: PeriodeResultatType.Avslått,
                    utsettelsePeriodeType: UtsettelsePeriodeType.Arbeid,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 0,
                    stønadskontotype: StønadskontoType.Foreldrepenger,
                    trekkDager: 0,
                    arbeidstidprosent: 100,
                    utbetalingsprosent: 100,
                    gjelderAnnenPart: false,
                    flerbarnsdager: false,
                    manueltBehandlet: false,
                    uttakArbeidType: UttakArbeidType.OrdinærtArbeid,
                    arbeidsgiverInfo: {
                        id: '12345',
                        type: 'ORGANISASJON',
                        navn: 'NAV'
                    },
                    periode: { fom: '2019-11-16', tom: '2019-11-20' },
                    morsAktivitet: MorsAktivitetDto.Arbeid
                }
            ] as PeriodeDto[];

            expect(cleanupUttaksplanDto(list).length).toEqual(1);
            expect(cleanupUttaksplanDto(list)).toEqual([list[0]]);
        });
    });

    it('Skal fjerne perioder med foreldrepenger før fødsel hvis bruker ikke har søkt om foreldrepenger før fødsel', () => {
        const list = [
            {
                periodeResultatType: 'AVSLÅTT',
                graderingInnvilget: false,
                samtidigUttak: false,
                stønadskontotype: 'FORELDREPENGER_FØR_FØDSEL',
                trekkDager: 15.0,
                arbeidstidprosent: 0,
                utbetalingsprosent: 0,
                gjelderAnnenPart: false,
                manueltBehandlet: false,
                flerbarnsdager: false,
                uttakArbeidType: 'ORDINÆRT_ARBEID',
                arbeidsgiverInfo: {
                    id: '973861778',
                    type: 'ORGANISASJON',
                    navn: 'EQUINOR ASA, AVD STATOIL SOKKELVIRKSOMHET'
                },
                periode: { fom: '2019-08-19', tom: '2019-09-06' }
            },
            {
                periodeResultatType: 'AVSLÅTT',
                graderingInnvilget: false,
                samtidigUttak: false,
                stønadskontotype: 'FORELDREPENGER_FØR_FØDSEL',
                trekkDager: 15.0,
                arbeidstidprosent: 0,
                utbetalingsprosent: 0,
                gjelderAnnenPart: false,
                manueltBehandlet: false,
                flerbarnsdager: false,
                uttakArbeidType: 'ORDINÆRT_ARBEID',
                arbeidsgiverInfo: { id: '973135678', type: 'ORGANISASJON', navn: 'COLOR LINE CREW AS' },
                periode: { fom: '2019-08-19', tom: '2019-09-06' }
            }
        ] as PeriodeDto[];
        expect(cleanupUttaksplanDto(list).length).toEqual(0);
        expect(cleanupUttaksplanDto(list)).toEqual([]);
    });

    it('Skal plukke periode med høyeste arbeidstidprosent hvis det er pararelle perioder hos 2 forskjellige arbeidsgivere', () => {
        const list = [
            {
                periodeResultatType: 'INNVILGET',
                graderingInnvilget: true,
                samtidigUttak: false,
                stønadskontotype: 'FELLESPERIODE',
                trekkDager: 0.0,
                arbeidstidprosent: 0,
                utbetalingsprosent: 100,
                gjelderAnnenPart: false,
                manueltBehandlet: true,
                flerbarnsdager: false,
                uttakArbeidType: 'ORDINÆRT_ARBEID',
                arbeidsgiverInfo: { id: '973135678', type: 'ORGANISASJON', navn: 'COLOR LINE CREW AS' },
                periode: { fom: '2020-03-16', tom: '2020-03-27' }
            },
            {
                periodeResultatType: 'INNVILGET',
                graderingInnvilget: true,
                samtidigUttak: false,
                stønadskontotype: 'FELLESPERIODE',
                trekkDager: 5.0,
                arbeidstidprosent: 50,
                utbetalingsprosent: 0,
                gjelderAnnenPart: false,
                manueltBehandlet: true,
                flerbarnsdager: false,
                uttakArbeidType: 'ORDINÆRT_ARBEID',
                arbeidsgiverInfo: { id: '995428563', type: 'ORGANISASJON', navn: 'FORSVARET' },
                periode: { fom: '2020-03-16', tom: '2020-03-27' }
            }
        ] as PeriodeDto[];

        expect(cleanupUttaksplanDto(list).length).toEqual(1);
        expect(cleanupUttaksplanDto(list)).toEqual([list[1]]);

        expect(cleanupUttaksplanDto(list.reverse()).length).toEqual(1);
        expect(cleanupUttaksplanDto(list.reverse())).toEqual([list[1]]);
    });
});
