import { PeriodeResultatType, StønadskontoType, UtsettelsePeriodeType, OppholdsÅrsak } from "app/api/types/UttaksplanDto";
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
    samtidigUttaksprosent?: number; 
}

export interface Utsettelsesperiode extends Periode {
    årsak: UtsettelsePeriodeType;
}

export interface Oppholdsperiode extends Periode {
    oppholdsårsak: OppholdsÅrsak;
}

export enum PeriodeType {
    "Uttak" = "UTTAK",
    "Hull" = "HULL",
    "Utsettelse" = "UTSETTELSE",
    "Opphold" = "Opphold"
}