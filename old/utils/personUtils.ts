import moment from 'moment';

export const erMyndig = (fødselsdato: string) => {
    return moment().diff(fødselsdato, 'years') >= 18;
};
