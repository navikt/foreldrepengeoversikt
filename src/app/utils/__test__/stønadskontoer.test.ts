import { getBrukteStønadskontoer, stønadskontoerDtoTilTilgjengeligStønadskontoMapper } from '../stønadskontoerUtils';
import { StønadskontoType } from 'app/api/types/UttaksplanDto';
import { PeriodeType, Uttaksperiode } from 'app/types/uttaksplan/Periode';

describe('stønadskontoerUtils', () => {
    describe('stønadskontoerDtoTilTilgjengeligStønadskontoMapper', () => {
        expect(
            stønadskontoerDtoTilTilgjengeligStønadskontoMapper({
                kontoer: { MØDREKVOTE: 75, FEDREKVOTE: 75, FELLESPERIODE: 80, FORELDREPENGER_FØR_FØDSEL: 15 }
            })
        ).toEqual([
            {
                konto: StønadskontoType.Mødrekvote,
                dager: 75
            },
            {
                konto: StønadskontoType.Fedrekvote,
                dager: 75
            },
            {
                konto: StønadskontoType.Fellesperiode,
                dager: 80
            },
            {
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                dager: 15
            }
        ]);
    });

    describe('getBrukteStønadskontoer', () => {
        let periodeMock: Uttaksperiode;
        beforeEach(() => {
            periodeMock = {
                type: PeriodeType.Uttak,
                stønadskontotype: StønadskontoType.Mødrekvote,
                graderingInnvilget: false,
                graderingsprosent: '0',
                samtidigUttak: false,
                antallUttaksdager: 10,
                tidsperiode: {
                    fom: '2019-05-21',
                    tom: '"2019-06-05" '
                }
            };
        });

        it('should correctly calculate used stønadskonto mødrekvote', () => {
            expect(
                getBrukteStønadskontoer([
                    { ...periodeMock, stønadskontotype: StønadskontoType.Mødrekvote },
                    { ...periodeMock, stønadskontotype: StønadskontoType.Fedrekvote },
                    { ...periodeMock, stønadskontotype: StønadskontoType.Fellesperiode },
                    { ...periodeMock, stønadskontotype: StønadskontoType.ForeldrepengerFørFødsel },
                    { ...periodeMock, stønadskontotype: StønadskontoType.Foreldrepenger },
                    { ...periodeMock, stønadskontotype: StønadskontoType.AktivitetsfriKvote }
                ] as Uttaksperiode[])
            ).toEqual([
                {
                    konto: StønadskontoType.Mødrekvote,
                    dager: 10
                },
                {
                    konto: StønadskontoType.Fedrekvote,
                    dager: 10
                },
                {
                    konto: StønadskontoType.Fellesperiode,
                    dager: 10
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 10
                },
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 10
                },
                {
                    konto: StønadskontoType.AktivitetsfriKvote,
                    dager: 10
                }
            ]);
        });

        it('should return empty list if periode list is empty', () => {
            expect(getBrukteStønadskontoer([])).toEqual([]);
        });
    });
});
