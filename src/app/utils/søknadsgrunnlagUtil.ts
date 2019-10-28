import { Søknadsgrunnlag } from "app/api/types/UttaksplanDto";


export const erAleneOmOmsorg = ({ søkerErFarEllerMedmor, farMedmorErAleneOmOmsorg, morErAleneOmOmsorg}: Søknadsgrunnlag) => {
    return søkerErFarEllerMedmor ? farMedmorErAleneOmOmsorg : morErAleneOmOmsorg;
}