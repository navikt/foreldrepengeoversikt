import { EngangsstønadSak, EngangsstønadSakDTO } from 'app/types/EngangsstønadSak';
import { Familiehendelse } from 'app/types/Familiehendelse';
import { GruppertSak } from 'app/types/GruppertSak';
import { Foreldrepengesak, ForeldrepengesakDTO } from 'app/types/Foreldrepengesak';
import { SakOppslag, SakOppslagDTO } from 'app/types/SakOppslag';
import { SvangerskapspengeSak, SvangerskapspengeSakDTO } from 'app/types/SvangerskapspengeSak';
import { Ytelse } from 'app/types/Ytelse';
import dayjs from 'dayjs';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Sak } from 'app/types/Sak';
import { Person } from 'app/types/Person';
import { getErDatoInnenEnDagFraAnnenDato, ISOStringToDate } from './dateUtils';
import { getLeverPerson } from './personUtils';
import { BarnGruppering } from 'app/types/BarnGruppering';

export const getAlleYtelser = (saker: SakOppslag): Sak[] => {
    return [...saker.engangsstønad, ...saker.foreldrepenger, ...saker.svangerskapspenger];
};

const getBarnGrupperingFraSak = (sak: Sak, registrerteBarn: Person[] | undefined): BarnGruppering => {
    const erForeldrepengesak = sak.ytelse === Ytelse.FORELDREPENGER;
    const barnFnrFraSaken = erForeldrepengesak && sak.barn !== undefined ? sak.barn.map((b) => b.fnr).flat() : [];
    const pdlBarnMedSammeFnr =
        erForeldrepengesak && registrerteBarn ? registrerteBarn.filter((b) => barnFnrFraSaken.includes(b.fnr)) : [];
    const fødselsdatoFraSak = ISOStringToDate(sak.familiehendelse.fødselsdato);
    const pdlBarnMedSammeFødselsdato =
        fødselsdatoFraSak !== undefined && registrerteBarn
            ? registrerteBarn.filter(
                  (barn) =>
                      getErDatoInnenEnDagFraAnnenDato(ISOStringToDate(barn.fødselsdato), fødselsdatoFraSak) &&
                      !pdlBarnMedSammeFnr?.find((pdlBarn) => pdlBarn.fnr === barn.fnr)
              )
            : [];

    const alleBarn = pdlBarnMedSammeFnr.concat(pdlBarnMedSammeFødselsdato);

    return {
        fornavn: alleBarn
            ?.filter((b) => b.fornavn !== undefined && b.fornavn.trim() !== '')
            .map((b) => [b.fornavn, b.mellomnavn !== undefined ? b.mellomnavn : ''].join(' ')),
        fødselsdatoer: alleBarn.filter((b) => b.fødselsdato !== undefined).map((b) => ISOStringToDate(b.fødselsdato)!),
        alleBarnaLever: !!alleBarn?.every((barn) => getLeverPerson(barn)),
    };
};

export const grupperSakerPåBarn = (registrerteBarn: Person[] | undefined, saker: SakOppslag): GruppertSak[] => {
    const alleSaker = getAlleYtelser(saker);

    return alleSaker.reduce((result, sak) => {
        const familiehendelsedato = getFamiliehendelseDato(sak.familiehendelse);
        const relevantSak = result.find((gruppertSak) => findRelevantSak(gruppertSak, familiehendelsedato));

        if (relevantSak) {
            relevantSak.saker.push(sak);
        }

        if (relevantSak && result.includes(relevantSak)) {
            return result;
        } else {
            const type = utledFamiliesituasjon(sak.familiehendelse, sak.gjelderAdopsjon);
            const gruppertSak: GruppertSak = {
                antallBarn: sak.familiehendelse.antallBarn,
                familiehendelsedato,
                saker: [sak],
                type,
                ytelse: sak.ytelse,
                barn: type !== 'termin' ? getBarnGrupperingFraSak(sak, registrerteBarn) : undefined,
            };

            result.push(gruppertSak);

            return result;
        }
    }, [] as GruppertSak[]);
};

const addYtelseToSak = (
    saker: ForeldrepengesakDTO[] | SvangerskapspengeSakDTO[] | EngangsstønadSakDTO[],
    ytelse: Ytelse
): Foreldrepengesak[] | SvangerskapspengeSak[] | EngangsstønadSak[] => {
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
            } as Foreldrepengesak)
    );
};

export const mapSakerDTOToSaker = (saker: SakOppslagDTO): SakOppslag => {
    return {
        foreldrepenger: addYtelseToSak(saker.foreldrepenger, Ytelse.FORELDREPENGER) as Foreldrepengesak[],
        engangsstønad: addYtelseToSak(saker.engangsstønad, Ytelse.ENGANGSSTØNAD) as EngangsstønadSak[],
        svangerskapspenger: addYtelseToSak(
            saker.svangerskapspenger,
            Ytelse.SVANGERSKAPSPENGER
        ) as SvangerskapspengeSak[],
    };
};

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

export const utledFamiliesituasjon = (familiehendelse: Familiehendelse, gjelderAdopsjon: boolean) => {
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
    const { fødselsdato, termindato, omsorgsovertakelse } = familiehendelse;

    if (omsorgsovertakelse) {
        return omsorgsovertakelse;
    }

    if (fødselsdato) {
        return fødselsdato;
    }

    return termindato!;
};

export const getNavnAnnenForelder = (
    søkerinfo: SøkerinfoDTO,
    sak: Foreldrepengesak | EngangsstønadSak | SvangerskapspengeSak | undefined
) => {
    const fødselsdatoFraSak = sak ? sak.familiehendelse.fødselsdato : undefined;
    const barn =
        søkerinfo.søker.barn && fødselsdatoFraSak
            ? søkerinfo.søker.barn.find((b) => dayjs(b.fødselsdato).isSame(fødselsdatoFraSak, 'd'))
            : undefined;
    const annenForelderNavn = barn && barn.annenForelder ? barn.annenForelder.fornavn : undefined;
    return annenForelderNavn !== undefined && annenForelderNavn.trim() !== '' ? annenForelderNavn : 'Annen forelder';
};
