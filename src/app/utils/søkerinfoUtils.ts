import Arbeidsforhold from 'app/types/Arbeidsforhold';
import moment, { Moment } from 'moment';

export const getAktiveArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], fraDato: Moment): Arbeidsforhold[] => {
    return arbeidsforhold.reduce((aktiveArbeidsforhold: Arbeidsforhold[], a: Arbeidsforhold) => {
        if (a.tom === undefined) {
            aktiveArbeidsforhold.push(a);

            return aktiveArbeidsforhold;
        } else {
            if (moment(a.tom).isSameOrAfter(fraDato, 'days')) {
                aktiveArbeidsforhold.push(a);
            }

            return aktiveArbeidsforhold;
        }
    }, []);
};

export const harAktivtArbeidsforhold = (arbeidsforhold: Arbeidsforhold[]): boolean => {
    return getAktiveArbeidsforhold(arbeidsforhold, moment()).length > 0;
};
