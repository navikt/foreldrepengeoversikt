import { EngangsstønadSak, EngangsstønadSakDTO } from 'app/types/EngangsstønadSak';
import { Familiehendelse } from 'app/types/Familiehendelse';
import { GruppertSak } from 'app/types/GruppertSak';
import { Sak, SakDTO } from 'app/types/Sak';
import { SakOppslag, SakOppslagDTO } from 'app/types/SakOppslag';
import { SvangerskapspengeSak, SvangerskapspengeSakDTO } from 'app/types/SvangerskapspengeSak';
import { Ytelse } from 'app/types/Ytelse';
import dayjs from 'dayjs';

export const getAlleSaker = (saker: SakOppslag) => {
    return [...saker.engangsstønad, ...saker.foreldrepenger, ...saker.svangerskapspenger];
};

export const grupperSakerPåBarn = (saker: SakOppslag): GruppertSak[] => {
    const alleSaker = getAlleSaker(saker);

    return alleSaker.reduce((result, sak) => {
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
                ytelse: sak.ytelse,
            };

            result.push(gruppertSak);

            return result;
        }
    }, [] as GruppertSak[]);
};

const addYtelseToSak = (
    saker: SakDTO[] | SvangerskapspengeSakDTO[] | EngangsstønadSakDTO[],
    ytelse: Ytelse
): Sak[] | SvangerskapspengeSak[] | EngangsstønadSak[] => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        return saker.map(
            (sak) =>
                ({
                    ...sak,
                    ytelse,
                } as EngangsstønadSak)
        );
    }

    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return saker.map(
            (sak) =>
                ({
                    ...sak,
                    ytelse,
                } as SvangerskapspengeSak)
        );
    }

    return saker.map(
        (sak) =>
            ({
                ...sak,
                ytelse,
            } as Sak)
    );
};

export const mapSakerDTOToSaker = (saker: SakOppslagDTO): SakOppslag => {
    return {
        foreldrepenger: addYtelseToSak(saker.foreldrepenger, Ytelse.FORELDREPENGER) as Sak[],
        engangsstønad: addYtelseToSak(saker.engangsstønad, Ytelse.ENGANGSSTØNAD) as EngangsstønadSak[],
        svangerskapspenger: addYtelseToSak(
            saker.svangerskapspenger,
            Ytelse.SVANGERSKAPSPENGER
        ) as SvangerskapspengeSak[],
    };
};

// export const grupperSakerPåBarn = (saker: Sak[]): GruppertSak[] => {
//     return saker.reduce((result, sak) => {
//         const familiehendelsedato = getFamiliehendelseDato(sak.familiehendelse);
//         const relevantSak = result.find((gruppertSak) => findRelevantSak(gruppertSak, familiehendelsedato));

//         if (relevantSak) {
//             relevantSak.saker.push(sak);
//         }

//         if (relevantSak && result.includes(relevantSak)) {
//             return result;
//         } else {
//             const gruppertSak: GruppertSak = {
//                 antallBarn: sak.familiehendelse.antallBarn,
//                 familiehendelsedato,
//                 saker: [sak],
//                 type: utledGruppertSakType(sak.familiehendelse, sak.gjelderAdopsjon),
//             };

//             result.push(gruppertSak);

//             return result;
//         }
//     }, [] as GruppertSak[]);
// };

export const getAntallSaker = (saker: SakOppslag) => {
    const { foreldrepenger, svangerskapspenger, engangsstønad } = saker;
    return foreldrepenger.length + svangerskapspenger.length + engangsstønad.length;
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
