import { getAktiveArbeidsforhold } from '../søkerinfoUtils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import moment from 'moment';

const mockedArbeidsforhold: Arbeidsforhold = {
    fom: '',
    arbeidsgiverIdType: 'orgnr',
    arbeidsgiverNavn: 'navn',
    arbeidsgiverId: '123412341',
    stillingsprosent: 80,
};

describe('søkerinfoUtils', () => {
    describe('getAktiveArbeidsforhold', () => {
        it('Skal gi en tom liste tilbake hvis det er ingen arbeidsforhold', () => {
            expect(getAktiveArbeidsforhold([], moment())).toEqual([]);
        });

        it('Skal finne aktivt arbeidsforhold', () => {
            expect(getAktiveArbeidsforhold([mockedArbeidsforhold], moment())).toEqual([mockedArbeidsforhold]);
        });

        it('Skal fjerne inaktivt arbeidsforhold', () => {
            const inaktivtArbeidsforhold: Arbeidsforhold = {
                ...mockedArbeidsforhold,
                fom: '2016-01-01',
                tom: '2019-01-01',
            };

            expect(getAktiveArbeidsforhold([inaktivtArbeidsforhold], moment('2019-06-01'))).toEqual([]);
        });
    });
});
