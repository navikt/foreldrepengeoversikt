import Arbeidsforhold from 'app/types/Arbeidsforhold';
import moment, { Moment } from 'moment';
import { Rolle } from 'app/types/Rolle';
import Person from 'app/types/Person';
import { NavnPåForeldre } from 'common/components/oversikt-brukte-dager/OversiktBrukteDager';
import AnnenPart from 'app/api/types/sak/AnnenPart';
import Sak from 'app/api/types/sak/Sak';

export const getAktiveArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], fom: Moment): Arbeidsforhold[] => {
    return arbeidsforhold.filter(
        (a) => a.tom === undefined || a.tom === null || (fom !== undefined && moment(fom).isSameOrBefore(a.tom, 'days'))
    );
};

export const harAktivtArbeidsforhold = (arbeidsforhold: Arbeidsforhold[]): boolean => {
    return getAktiveArbeidsforhold(arbeidsforhold, moment()).length > 0;
};

export const getNavnPåForeldre = (sak: Sak, søker: Person): NavnPåForeldre => {
    const søkerErFarEllerMedmor = sak.saksgrunnlag && sak.saksgrunnlag.grunnlag.søkerErFarEllerMedmor;
    return {
        farMedmor: getNavnForRolle(Rolle.farMedmor, søker, sak.annenPart, søkerErFarEllerMedmor),
        mor: getNavnForRolle(Rolle.mor, søker, sak.annenPart, søkerErFarEllerMedmor)
    };
};

const getNavnForRolle = (
    rolle: Rolle,
    søker: Person,
    annenPart?: AnnenPart,
    søkerErFarEllerMedmor?: boolean
): string => {
    let fornavn;
    if (rolle === Rolle.farMedmor) {
        fornavn = søkerErFarEllerMedmor ? søker.fornavn : annenPart && annenPart.navn.fornavn;
    }
    if(rolle === Rolle.mor) {
        fornavn = !søkerErFarEllerMedmor ? søker.fornavn : annenPart && annenPart.navn.fornavn;
    }
    return fornavn ? fornavn : 'Den andre forelderen';
};
