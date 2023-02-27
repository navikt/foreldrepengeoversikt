import { PeriodeResultat } from 'app/types/PeriodeResultat';
import { StønadskontoType } from 'app/types/StønadskontoType';
import { UttaksplanColor } from 'app/types/UttaksplanColor';

export const getStønadskontoFarge = (
    konto: StønadskontoType,
    periodeResultat: PeriodeResultat | undefined
): UttaksplanColor => {
    if (periodeResultat && periodeResultat.innvilget !== true) {
        return UttaksplanColor.gray;
    }
    switch (konto) {
        case StønadskontoType.Fedrekvote:
        case StønadskontoType.AktivitetsfriKvote:
            return UttaksplanColor.blue;
        case StønadskontoType.Mødrekvote:
        case StønadskontoType.Foreldrepenger:
        case StønadskontoType.ForeldrepengerFørFødsel:
            return UttaksplanColor.purple;
        case StønadskontoType.Fellesperiode:
            return UttaksplanColor.purpleBlue;
        default:
            return UttaksplanColor.transparent;
    }
};
