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
    type: PeriodeType.Uttak;
    stønadskontotype: StønadskontoType;
    graderingInnvilget: boolean;
    samtidigUttak: boolean;
    samtidigUttaksprosent?: number;
}

export interface Utsettelsesperiode extends Periode {
    type: PeriodeType.Utsettelse;
    årsak: UtsettelsePeriodeType;
}

export interface Oppholdsperiode extends Periode {
    oppholdsårsak: OppholdsÅrsak;
}

export interface TaptPeriode extends Periode {
    type: PeriodeType.TaptPeriode;
    stønadskontotype: StønadskontoType;
};

export enum PeriodeType {
    "Uttak" = "UTTAK",
    "Hull" = "HULL",
    "Utsettelse" = "UTSETTELSE",
    "Opphold" = "OPPHOLD",
    "TaptPeriode" = "TAPT_PERIODE"
}