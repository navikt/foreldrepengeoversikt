import {
    getUkerOgDagerFromDager,
    finnFremtidigePerioder,
    slåSammenLikeOgSammenhengendeUttaksperioder,
    erSammenhengende
} from '../periodeUtils';
import {
    UttaksPeriodeDto,
    MorsAktivitetDto,
    StønadskontoType,
    PeriodeResultatType,
    UttakArbeidType,
    UtsettelsePeriodeType
} from 'app/api/types/UttaksplanDto';
import moment from 'moment';
import Periode from 'app/types/uttaksplan/Periode';

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
        const mockPeriode: UttaksPeriodeDto = {
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

        const perioder = [
            mockPeriode,
            { ...mockPeriode, periode: { fom: '2019-01-03', tom: '2019-01-04' } }
        ];

        expect(
            slåSammenLikeOgSammenhengendeUttaksperioder(perioder).length
        ).toEqual(1);

        expect(slåSammenLikeOgSammenhengendeUttaksperioder(perioder)[0].trekkDager).toEqual(40);
    });

    it('en periode skal regnes som sammenhengende selv om forrige periode slutter på en sønadg', () => {
        expect(
            erSammenhengende({ fom: '2019-09-02', tom: '2019-09-27' }, { fom: '2019-09-28', tom: '2019-10-08' })
        ).toBeTruthy();
    });
});
