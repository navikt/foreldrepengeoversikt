import {
    getUkerOgDagerFromDager,
    finnFremtidigePerioder,
    slåSammenLikeOgSammenhengendeUttaksperioder
} from '../periodeUtils';
import { Uttaksperiode, MorsAktivitetDto, OppholdsÅrsak } from 'app/types/Søknadsgrunnlag';
import moment from 'moment';

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
        const periodeMock: Uttaksperiode = { periode: {} } as Uttaksperiode;
        it('returns empty list if future period does not exist', () => {
            expect(
                finnFremtidigePerioder([
                    {
                        ...periodeMock,
                        periode: {
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
                        periode: {
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
                        periode: {
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
                        periode: {
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
        const mockPeriode: Uttaksperiode = {
            periodeResultatType: 'string',
            utsettelsePeriodeType: 'string',
            graderingInnvilget: false,
            samtidigUttak: false,
            samtidigUttaksprosent: 0,
            stønadskontotype: 'string',
            trekkDager: 20,
            arbeidstidprosent: 100,
            utbetalingprosent: 100,
            gjelderAnnenPart: false,
            flerbarnsdager: false,
            uttakArbeidType: 'string',
            arbeidsgiverInfo: {
                id: 'string',
                type: 'string',
                navn: 'string'
            },
            periode: {
                fom: '2019-01-01',
                tom: '2019-01-02'
            },
            morsAktivitet: MorsAktivitetDto.Arbeid,
            oppholdAarsak: OppholdsÅrsak.INGEN
        };
        expect(
            slåSammenLikeOgSammenhengendeUttaksperioder([
                mockPeriode,
                { ...mockPeriode, periode: { fom: '2019-01-03', tom: '2019-01-04' } }
            ]).length
        ).toEqual(1);
    });
});
