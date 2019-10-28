import { StønadskontoType } from "app/api/types/UttaksplanDto";

export interface TilgjengeligStønadskonto {
    konto: StønadskontoType;
    dager: number;
}
