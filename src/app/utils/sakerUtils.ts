import { Familiehendelse } from 'app/types/Familiehendelse';
import { GruppertSak } from 'app/types/GruppertSak';
import { Sak } from 'app/types/Sak';
import dayjs from 'dayjs';

export const grupperSakerPåBarn = (saker: Sak[]): GruppertSak[] => {
    return saker.reduce((result, sak) => {
        const familiehendelsedato = getFamiliehendelseDato(sak.familiehendelse);
        const relevantSak = result.find((gruppertSak) => findRelevantSak(gruppertSak, familiehendelsedato));

        if (relevantSak) {
            relevantSak.saker.push(sak);
        }

        if (relevantSak && result.includes(relevantSak)) {
            return result;
        } else {
            const gruppertSak: GruppertSak = {
                antallBarn: sak.familiehendelse.antallBarn,
                familiehendelsedato,
                saker: [sak],
                type: utledGruppertSakType(sak.familiehendelse, sak.gjelderAdopsjon),
            };

            result.push(gruppertSak);

            return result;
        }
    }, [] as GruppertSak[]);
};

const findRelevantSak = (gruppertSak: GruppertSak, familiehendelsedato: string) => {
    const startdato = dayjs(familiehendelsedato).subtract(2, 'months');
    const sluttdato = dayjs(familiehendelsedato).add(3, 'weeks');

    if (gruppertSak) {
        return (
            dayjs(gruppertSak.familiehendelsedato).isAfter(startdato) &&
            dayjs(gruppertSak.familiehendelsedato).isSameOrBefore(sluttdato)
        );
    }

    return undefined;
};

const utledGruppertSakType = (familiehendelse: Familiehendelse, gjelderAdopsjon: boolean) => {
    if (gjelderAdopsjon) {
        return 'adopsjon';
    }

    const { fødselsdato } = familiehendelse;

    if (fødselsdato) {
        return 'fødsel';
    }

    return 'termin';
};

export const getFamiliehendelseDato = (familiehendelse: Familiehendelse): string => {
    const { fødselsdato, termindato } = familiehendelse;

    if (fødselsdato) {
        return fødselsdato;
    }

    return termindato!;
};
