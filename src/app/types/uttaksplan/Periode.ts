import { PeriodeResultatType, StønadskontoType, UtsettelsePeriodeType } from "app/api/types/UttaksplanDto";
import { Tidsperiode } from "../Tidsperiode";
import { Rolle } from "../Rolle";

export default interface Periode {
    type: PeriodeType;
    periodeResultatType?: PeriodeResultatType;
    gjelderAnnenPart?: boolean;
    tidsperiode: Tidsperiode;
    forelder?: Rolle;
    antallUttaksdager: number;
}

export interface Uttaksperiode extends Periode {
    stønadskontotype: StønadskontoType;
    graderingInnvilget: boolean;
    samtidigUttak: boolean;
}

export interface Utsettelsesperiode extends Periode {
    årsak: UtsettelsePeriodeType;
}

export enum PeriodeType {
    "Uttak" = "UTTAK",
    "Hull" = "HULL",
    "Utsettelse" = "UTSETTELSE"
}