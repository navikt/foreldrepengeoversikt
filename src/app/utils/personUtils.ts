import { Kjønn } from '@navikt/fp-common';

export const getKjønnFromFnr = (fnr: string | undefined): Kjønn | undefined => {
    if (fnr === undefined || fnr === '') {
        return undefined;
    }

    return parseInt(fnr.charAt(8), 10) % 2 === 0 ? 'K' : 'M';
};
