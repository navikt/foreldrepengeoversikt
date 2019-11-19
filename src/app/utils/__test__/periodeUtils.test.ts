import {
    getUkerOgDagerFromDager,
    finnFremtidigePerioder,
    erSammenhengende,
    harAnnenForelderSamtidigUttakISammePeriode,
    skalVisesIPeriodeListe
} from '../periodeUtils';
import {
    PeriodeDto,
    MorsAktivitetDto,
    StønadskontoType,
    PeriodeResultatType,
    UttakArbeidType,
    UtsettelsePeriodeType
} from 'app/api/types/UttaksplanDto';
import moment from 'moment';
import Periode, { Uttaksperiode, PeriodeType } from 'app/types/uttaksplan/Periode';
import { slåSammenLikeOgSammenhengendeUttaksperioder } from 'app/utils/uttaksplanDtoUtils';
import { Rolle } from 'app/types/Rolle';

describe('periodeUtils', () => {
    describe('getUkerOgDagerFromDager', () => {
        it('converts trekkdager to uttak days and weeks', () => {
            expect(getUkerOgDagerFromDager(0)).toEqual({
                dager: 0,
                uker: 0
            });
            expect(getUkerOgDagerFromDager(5)).toEqual({
                dager: 0,
                uker: 1
            });
            expect(getUkerOgDagerFromDager(6)).toEqual({
                dager: 1,
                uker: 1
            });
            expect(getUkerOgDagerFromDager(4)).toEqual({
                dager: 4,
                uker: 0
            });
        });
    });

    describe('finnFremtidigePerioder', () => {
        const periodeMock: Periode = { tidsperiode: {} } as Periode;
        it('returns empty list if future period does not exist', () => {
            expect(
                finnFremtidigePerioder([
                    {
                        ...periodeMock,
                        tidsperiode: {
                            fom: moment()
                                .subtract(2, 'months')
                                .format('YYYY-MM-DD'),
                            tom: moment()
                                .subtract(1, 'months')
                                .format('YYYY-MM-DD')
                        }
                    },
                    {
                        ...periodeMock,
                        tidsperiode: {
                            fom: moment()
                                .subtract(1, 'days')
                                .format('YYYY-MM-DD'),
                            tom: moment()
                                .add(1, 'days')
                                .format('YYYY-MM-DD')
                        }
                    }
                ]).length
            ).toEqual(0);
        });

        it('should retrun periods where fom date is ahead of time', () => {
            expect(
                finnFremtidigePerioder([
                    {
                        ...periodeMock,
                        tidsperiode: {
                            fom: moment()
                                .subtract(2, 'months')
                                .format('YYYY-MM-DD'),
                            tom: moment()
                                .subtract(1, 'months')
                                .format('YYYY-MM-DD')
                        }
                    },
                    {
                        ...periodeMock,
                        tidsperiode: {
                            fom: moment()
                                .add(1, 'days')
                                .format('YYYY-MM-DD'),
                            tom: moment()
                                .add(1, 'months')
                                .format('YYYY-MM-DD')
                        }
                    }
                ]).length
            ).toEqual(1);
        });
    });

    it('like og sammenhengende perioder skal slås sammen', () => {
        const mockPeriode: PeriodeDto = {
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
                id: 'string',
                type: 'string',
                navn: 'string'
            },
            periode: {
                fom: '2019-01-01',
                tom: '2019-01-02'
            },
            morsAktivitet: MorsAktivitetDto.Arbeid
        };
        const perioder = [mockPeriode, { ...mockPeriode, periode: { fom: '2019-01-03', tom: '2019-01-04' } }];
        expect(slåSammenLikeOgSammenhengendeUttaksperioder(perioder).length).toEqual(1);
        expect(slåSammenLikeOgSammenhengendeUttaksperioder(perioder)[0].trekkDager).toEqual(40);
    });

    it('en periode skal regnes som sammenhengende selv om forrige periode slutter på en sønadg', () => {
        expect(
            erSammenhengende({ fom: '2019-09-02', tom: '2019-09-27' }, { fom: '2019-09-28', tom: '2019-10-08' })
        ).toBeTruthy();
    });

    it('en periode skal regnes som sammenhengende selv om forrige periode slutter på en sønadg', () => {
        expect(
            erSammenhengende({ fom: '2020-03-02', tom: '2020-03-15' }, { fom: '2020-03-16', tom: '2020-03-27' })
        ).toBeTruthy();
    });

    it('en periode skal regnes som sammenhengende selv om neste periode starter på en lørdag', () => {
        expect(
            erSammenhengende({ fom: '2019-08-30', tom: '2019-09-01' }, { fom: '2019-09-02', tom: '2019-10-08' })
        ).toBeTruthy();
    });

    it('like tidsperioder skal ikke betraktes som sammenhengende', () => {
        expect(
            erSammenhengende({ fom: '2019-09-02', tom: '2019-09-27' }, { fom: '2019-09-02', tom: '2019-09-27' })
        ).toBeFalsy();
    });

    it('like tidsperioder skal ikke betraktes som sammenhengende', () => {
        expect(
            erSammenhengende({ fom: '2019-08-28', tom: '2019-09-01' }, { fom: '2019-09-02', tom: '2019-09-27' })
        ).toBeTruthy();
    });

    it('Skal finne annen parts periode hvis det er samtidig uttak', () => {
        const perioder = [
            {
                type: 'UTTAK',
                gjelderAnnenPart: false,
                tidsperiode: {
                    fom: '2019-09-28',
                    tom: '2019-10-08'
                },
                forelder: 'farMedmor',
                antallUttaksdager: 7,
                stønadskontotype: 'FEDREKVOTE',
                graderingInnvilget: false,
                samtidigUttak: true,
                samtidigUttaksprosent: 100
            },
            {
                type: 'UTTAK',
                gjelderAnnenPart: true,
                tidsperiode: {
                    fom: '2019-09-28',
                    tom: '2019-10-08'
                },
                forelder: 'mor',
                antallUttaksdager: 7,
                stønadskontotype: 'MØDREKVOTE',
                graderingInnvilget: false,
                samtidigUttak: false
            }
        ];

        expect(
            harAnnenForelderSamtidigUttakISammePeriode(perioder[1] as Uttaksperiode, perioder as Periode[])
        ).toBeTruthy();
    });

    describe('skalVisesIPeriodeListe', () => {
        it('skal returnere false hvis perioden er annen parts samtidig uttak', () => {
            const perioder = [
                {
                    type: PeriodeType.Uttak,
                    gjelderAnnenPart: true,
                    tidsperiode: {
                        fom: '2019-09-28',
                        tom: '2019-10-08'
                    },
                    forelder: Rolle.mor,
                    antallUttaksdager: 7,
                    stønadskontotype: StønadskontoType.Mødrekvote,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 100
                },
                {
                    type: PeriodeType.Uttak,
                    gjelderAnnenPart: false,
                    tidsperiode: {
                        fom: '2019-09-28',
                        tom: '2019-10-08'
                    },
                    forelder: Rolle.farMedmor,
                    antallUttaksdager: 7,
                    stønadskontotype: StønadskontoType.Mødrekvote,
                    graderingInnvilget: false,
                    samtidigUttak: true,
                    samtidigUttaksprosent: 100
                }
            ] as Uttaksperiode[];
            expect(skalVisesIPeriodeListe(perioder[0], perioder)).toBeFalsy();
        });

        it('skal returnere false hvis perioden er annen parts samtidig uttak', () => {
            const perioder = [
                {
                    type: PeriodeType.Uttak,
                    gjelderAnnenPart: true,
                    tidsperiode: {
                        fom: '2019-09-28',
                        tom: '2019-10-08'
                    },
                    forelder: Rolle.mor,
                    antallUttaksdager: 7,
                    stønadskontotype: StønadskontoType.Mødrekvote,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 100
                },
                {
                    type: PeriodeType.Uttak,
                    gjelderAnnenPart: false,
                    tidsperiode: {
                        fom: '2019-09-28',
                        tom: '2019-10-08'
                    },
                    forelder: Rolle.farMedmor,
                    antallUttaksdager: 7,
                    stønadskontotype: StønadskontoType.Mødrekvote,
                    graderingInnvilget: false,
                    samtidigUttak: true,
                    samtidigUttaksprosent: 100
                }
            ] as Uttaksperiode[];
            expect(skalVisesIPeriodeListe(perioder[0], perioder)).toBeFalsy();
        });

        it('skal returnere true hvis perioden er søkers periode med samtidig uttak', () => {
            const perioder = [
                {
                    type: PeriodeType.Uttak,
                    gjelderAnnenPart: false,
                    tidsperiode: {
                        fom: '2019-09-28',
                        tom: '2019-10-08'
                    },
                    forelder: Rolle.mor,
                    antallUttaksdager: 7,
                    stønadskontotype: StønadskontoType.Mødrekvote,
                    graderingInnvilget: false,
                    samtidigUttak: false,
                    samtidigUttaksprosent: 100
                },
                {
                    type: PeriodeType.Uttak,
                    gjelderAnnenPart: true,
                    tidsperiode: {
                        fom: '2019-09-28',
                        tom: '2019-10-08'
                    },
                    forelder: Rolle.farMedmor,
                    antallUttaksdager: 7,
                    stønadskontotype: StønadskontoType.Mødrekvote,
                    graderingInnvilget: false,
                    samtidigUttak: true,
                    samtidigUttaksprosent: 100
                }
            ] as Uttaksperiode[];
            expect(skalVisesIPeriodeListe(perioder[0], perioder)).toBeTruthy();
        });

    });
});
