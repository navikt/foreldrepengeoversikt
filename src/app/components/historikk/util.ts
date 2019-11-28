import { Hendelse } from './HistorikkElement';
import Behandling, { BehandlingResultatType, BehandlingÅrsak } from '../../api/types/sak/Behandling';
import { formatDate } from '../saksoversikt/utils';
import {
    Innsendingsinnslag,
    HistorikkInnslagType,
    HistorikkInnslag,
    HendelseType,
    InntektsmeldingInnslag
} from 'app/api/types/historikk/HistorikkInnslag';
import { erBehandlingAvsluttet, getEldsteBehadnling } from 'app/utils/sakerUtils';

export const formaterDatoForHendelse = (dato: string) => {
    return formatDate(dato, 'D. MMMM YYYY [kl.] HH:mm:ss');
};

export const fjernBehandlingerMedLikOpprettetDato = (
    behandling: Behandling,
    index: number,
    behandlinger: Behandling[]
): boolean => {
    return behandlinger.map((b: Behandling) => b.opprettetTidspunkt).indexOf(behandling.opprettetTidspunkt) === index;
};

const erInitiertAvBruker = (årsak?: BehandlingÅrsak | null): boolean => {
    switch (årsak) {
        case BehandlingÅrsak.ENDRET_INNTEKTSMELDING:
        case BehandlingÅrsak.BERØRT_BEHANDLING:
            return false;
        case BehandlingÅrsak.ENDRING_FRA_BRUKER:
        default:
            return true;
    }
};

const erHendelseRelevant = (h: Hendelse): boolean => {
    return (
        Object.values(BehandlingResultatType)
            .map((brt) => brt.toString())
            .includes(h.type) ||
        h.type === 'søknad-sendt' ||
        h.type === 'inntektsmelding-motatt' ||
        h.type === BehandlingÅrsak.ENDRET_INNTEKTSMELDING ||
        h.type === BehandlingÅrsak.ENDRING_FRA_BRUKER ||
        h.type === HistorikkInnslagType.søknad ||
        h.type === HistorikkInnslagType.inntekt
    );
};

const utledHendelserMedBehandlinger = (
    behandlinger: Behandling[],
    utledInnteksmeldinger: boolean,
    skalUtledInnsendingstidspunkt: boolean
): Hendelse[] => {
    const behanldingerUtenDuplikater = behandlinger.filter(fjernBehandlingerMedLikOpprettetDato);
    const behandlingsresultatHendelser = behanldingerUtenDuplikater
        .filter(erBehandlingAvsluttet)
        .map(behandlingsResultatTilHendelse);

    const behandlingsÅrsakHendelser = behanldingerUtenDuplikater
        .filter((b) => b.årsak !== null && b.årsak !== BehandlingÅrsak.ENDRET_INNTEKTSMELDING)
        .map(behandlingÅrsakTilHendelse);

    const inntektsmeldingHendeliser = utledInnteksmeldinger
        ? behanldingerUtenDuplikater
              .filter((b) => b.inntektsmeldinger.length > 0)
              .map(behandlingMedInntektmeldingerTilHendelse)
        : [];

    if (skalUtledInnsendingstidspunkt) {
        const søknadSendtHendelse = utledInnsendingstidspunkt(behandlinger);
        if (søknadSendtHendelse) {
            behandlingsÅrsakHendelser.push(søknadSendtHendelse);
        }
    }

    return [...behandlingsresultatHendelser, ...behandlingsÅrsakHendelser, ...inntektsmeldingHendeliser].sort(
        sortHendlser
    );
};

const utledInnsendingstidspunkt = (behandlinger: Behandling[]): Hendelse | undefined => {
    const eldsteBehandling = getEldsteBehadnling(behandlinger);
    if (eldsteBehandling) {
        return {
            dato: eldsteBehandling.opprettetTidspunkt,
            type: 'søknad-sendt',
            beskrivelse: 'søknad-sendt',
            brukerInitiertHendelse: true
        };
    }
    return undefined;
};

const behandlingMedInntektmeldingerTilHendelse = (behandling: Behandling): Hendelse => {
    return {
        dato: behandling.opprettetTidspunkt,
        type: 'inntektsmelding-motatt',
        beskrivelse: 'inntektsmelding-motatt',
        brukerInitiertHendelse: false
    };
};

const behandlingsResultatTilHendelse = (behandling: Behandling): Hendelse => {
    return {
        dato: behandling.endretTidspunkt,
        type: behandling.behandlingResultat,
        beskrivelse: behandling.behandlingResultat,
        brukerInitiertHendelse: false
    };
};

const behandlingÅrsakTilHendelse = (behandling: Behandling): Hendelse => {
    return {
        dato: behandling.opprettetTidspunkt,
        type: behandling.årsak!,
        beskrivelse: behandling.årsak!,
        brukerInitiertHendelse: erInitiertAvBruker(behandling.årsak)
    };
};

const historikkInnslagTilHendelse = (historikkInnslag: HistorikkInnslag): Hendelse => {
    return {
        dato: historikkInnslag.opprettet,
        type: historikkInnslag.type,
        beskrivelse: getBeskrivelseForHistorikkInnslag(historikkInnslag),
        brukerInitiertHendelse: historikkInnslag.type === HistorikkInnslagType.søknad,
        skjemanumre: (historikkInnslag as Innsendingsinnslag).vedlegg,
        arbeidsgiver: (historikkInnslag as InntektsmeldingInnslag).arbeidsgiver
    };
};

const getBeskrivelseForHistorikkInnslag = (historikkInnslag: HistorikkInnslag): string => {
    if (historikkInnslag.type === HistorikkInnslagType.søknad) {
        switch ((historikkInnslag as Innsendingsinnslag).hendelse) {
            case HendelseType.ETTERSENDING_ENGANGSSTØNAD:
            case HendelseType.ETTERSENDING_FORELDREPENGER:
            case HendelseType.ETTERSENDING_SVANGERSKAPSPENGER:
                return 'ettersendelse';
            default:
                return (historikkInnslag as Innsendingsinnslag).hendelse;
        }
    }
    return historikkInnslag.type;
};

export const hentHendelserFraHistorikkinnslagListe = (historikkInnslagListe?: HistorikkInnslag[]): Hendelse[] => {
    if (historikkInnslagListe === undefined) {
        return [];
    }

    const historikkInnslag = historikkInnslagListe
        .filter((h) => h.type === HistorikkInnslagType.inntekt || HistorikkInnslagType.søknad)
        .filter(
            (h) =>
                (h as Innsendingsinnslag).hendelse !== HendelseType.INITIELL_FORELDREPENGER &&
                (h as Innsendingsinnslag).hendelse !== HendelseType.ENDRING_FORELDREPENGER &&
                (h as Innsendingsinnslag).hendelse !== HendelseType.INITIELL_ENGANGSSTØNAD &&
                (h as Innsendingsinnslag).hendelse !== HendelseType.INITIELL_SVANGERSKAPSPENGER
        );

    return historikkInnslag.map(historikkInnslagTilHendelse);
};

export const utledHendelser = (behandlinger?: Behandling[], historikkInnslagListe?: HistorikkInnslag[]): Hendelse[] => {
    if (behandlinger === undefined || behandlinger.length === 0) {
        return [];
    }

    const utledInnteksmeldingerVedHjelpAvBehandlinger =
        historikkInnslagListe === undefined ||
        !historikkInnslagListe.some((historikkInnslag) => historikkInnslag.type === HistorikkInnslagType.inntekt);

    return utledHendelserMedBehandlinger(behandlinger, utledInnteksmeldingerVedHjelpAvBehandlinger, true)
        .concat(...hentHendelserFraHistorikkinnslagListe(historikkInnslagListe))
        .filter(erHendelseRelevant)
        .sort(sortHendlser);
};

const sortHendlser = (h1: Hendelse, h2: Hendelse) => h2.dato.localeCompare(h1.dato);
