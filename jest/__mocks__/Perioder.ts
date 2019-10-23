import { Uttaksperiode, PeriodeType } from 'app/types/uttaksplan/Periode';
import { PeriodeResultatType, StønadskontoType } from 'app/api/types/UttaksplanDto';
import { Rolle } from 'app/types/Rolle';

export const uttaksperiodeMock: Uttaksperiode = {
    type: PeriodeType.Uttak,
    periodeResultatType: PeriodeResultatType.Innvilget,
    gjelderAnnenPart: false,
    tidsperiode: {
        fom: '01-01-2019',
        tom: '02-01-2019'
    },
    forelder: Rolle.mor,
    antallUttaksdager: 0,
    stønadskontotype: StønadskontoType.Mødrekvote,
    graderingInnvilget: false,
    graderingsprosent: '0',
    samtidigUttak: false
};
