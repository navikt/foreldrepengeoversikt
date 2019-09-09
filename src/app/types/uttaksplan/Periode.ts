import { StønadskontoType, UtsettelsePeriodeType, PeriodeResultatType } from "app/api/types/UttaksplanDto";
import { Tidsperiode } from "../Tidsperiode";
import { Forelder } from "..";

export default interface Periode {
    type: PeriodeType;
    periodeResultatType?: PeriodeResultatType;
    gjelderAnnenPart?: boolean;
    tidsperiode: Tidsperiode;
    forelder?: Forelder;
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