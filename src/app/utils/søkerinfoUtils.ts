import Arbeidsforhold from 'app/types/Arbeidsforhold';
import moment, { Moment } from 'moment';

export const getAktiveArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], fom: Moment): Arbeidsforhold[] => {
    return arbeidsforhold.filter((a) => (
        a.tom === undefined ||
        a.tom === null ||
        fom !== undefined && moment(fom).isSameOrBefore(a.tom, 'days')
    ));
};

export const harAktivtArbeidsforhold = (arbeidsforhold: Arbeidsforhold[]): boolean => {
    return getAktiveArbeidsforhold(arbeidsforhold, moment()).length > 0;
};
