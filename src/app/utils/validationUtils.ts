import { IntlShape } from 'react-intl';

export type SkjemaelementFeil = string | undefined;

const textRegex =
    /^[\u034f0-9a-zA-ZÁáĄąÂâĀāĂăßČčĆćÇçĎďĐđÐðĔĕÉéĘęĖėÈèËëÊêĒēĢģİiĮįÍíÎîÏïĪīĶķŁłŊŋŇňŃńŅņÑñÞþŠšŚśŞşŤťŦŧŢţŲųŪūÚúŮůÝýŽžŹźŻżÕõÔôÓóÖöÜüÄäŒœÆæØøÅå .'\-/\n\r%§\\!?@_()+:;,="&\t\u00a0\u00ad\u061c\u115f\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200b\u200c\u200d\u200e\u200f\u202d\u202f\u205f\u2060\u2061\u2062\u2063\u2064\u206a\u206b\u206c\u206d\u206e\u206f\u3000\u2800\u3164\ufeff\uffa0\u1160]*$/;
const textGyldigRegex =
    /[\u034f0-9a-zA-ZÁáĄąÂâĀāĂăßČčĆćÇçĎďĐđÐðĔĕÉéĘęĖėÈèËëÊêĒēĢģİiĮįÍíÎîÏïĪīĶķŁłŊŋŇňŃńŅņÑñÞþŠšŚśŞşŤťŦŧŢţŲųŪūÚúŮůÝýŽžŹźŻżÕõÔôÓóÖöÜüÄäŒœÆæØøÅå .'\-/\n\r%§\\!?@_()+:;,="&\t\u00a0\u00ad\u061c\u115f\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200b\u200c\u200d\u200e\u200f\u202d\u202f\u205f\u2060\u2061\u2062\u2063\u2064\u206a\u206b\u206c\u206d\u206e\u206f\u3000\u2800\u3164\ufeff\uffa0\u1160]*/g;

export const getIllegalChars = (value: any): string => {
    const kunUgyldigeTegn = value.replace(textGyldigRegex, '');
    const ugyldigStringSet = new Set(kunUgyldigeTegn.split(''));
    return Array.from(ugyldigStringSet).join('');
};

export const getIllegalCharsErrorMessage = (value: string, feltNavn: string, intl: IntlShape): string => {
    const ugyldigeTegn = getIllegalChars(value).replace(/[\t]/g, 'Tabulatortegn');
    return intl.formatMessage(
        {
            id: 'valideringsfeil.fritekst.kanIkkeInneholdeTegn',
        },
        { ugyldigeTegn: ugyldigeTegn, feltNavn: feltNavn }
    );
};

export const validateTextHasLegalChars = (value: any): boolean => textRegex.test(value);

export const validateTextInputField = (value: string, feltNavn: string, intl: IntlShape): SkjemaelementFeil => {
    if (!validateTextHasLegalChars(value)) {
        return getIllegalCharsErrorMessage(value, feltNavn, intl);
    }
    return undefined;
};
