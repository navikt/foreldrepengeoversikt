import { UttaksplanGrunnlagDto } from 'app/api/types/UttaksplanDto';

export const erAleneOmOmsorg = ({
    søkerErFarEllerMedmor,
    farMedmorErAleneOmOmsorg,
    morErAleneOmOmsorg,
}: UttaksplanGrunnlagDto) => {
    return søkerErFarEllerMedmor ? farMedmorErAleneOmOmsorg : morErAleneOmOmsorg;
};

export const erEksisterendeSakErDeltUttak = (dto: UttaksplanGrunnlagDto): boolean => {
    const { farMedmorErAleneOmOmsorg, farMedmorHarRett, morErAleneOmOmsorg, morHarRett } = dto;
    if (farMedmorErAleneOmOmsorg || morErAleneOmOmsorg || farMedmorHarRett === false || morHarRett === false) {
        return false;
    }
    return true;
};
