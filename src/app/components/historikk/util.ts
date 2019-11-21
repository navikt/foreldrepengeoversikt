import { Hendelse } from './HistorikkElement';
import Behandling, { BehandlingResultatType, BehandlingÅrsak } from '../../api/types/sak/Behandling';
import { formatDate } from '../saksoversikt/utils';
import { Innsendingsinnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { erBehandlingAvsluttet } from 'app/utils/sakerUtils';

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

const utledSøknadMotattHendelse = (hendelser: Hendelse[]) => {
    const søknadMotattHendelseIndex = hendelser
        .slice()
        .reverse()
        .findIndex((h: Hendelse) => h.beskrivelse !== 'inntektsmelding-motatt');

    hendelser[hendelser.length - 1 - søknadMotattHendelseIndex] = {
        ...hendelser[hendelser.length - 1 - søknadMotattHendelseIndex],
        beskrivelse: 'søknad-sendt',
        brukerInitiertHendelse: true
    };
    return hendelser;
};

const erHendelseRelevant = (h: Hendelse): boolean => {
    return (
        Object.values(BehandlingResultatType)
            .map((brt) => brt.toString())
            .includes(h.beskrivelse) ||
        h.beskrivelse === 'søknad-sendt' ||
        h.beskrivelse === 'inntektsmelding-motatt' ||
        h.beskrivelse === BehandlingÅrsak.ENDRET_INNTEKTSMELDING ||
        h.beskrivelse === BehandlingÅrsak.ENDRING_FRA_BRUKER
    );
};

export const opprettHendelserFraHistorikkinnslagListe = (historikkInnslagListe: Innsendingsinnslag[]): Hendelse[] => {
    return historikkInnslagListe.map((historikkInnslagEttersendelser) => ({
        dato: historikkInnslagEttersendelser.opprettet,
        beskrivelse: historikkInnslagEttersendelser.hendelse,
        brukerInitiertHendelse: true
    }));
};

const utledHendelserUtenHistorikkInnslag = (behandlinger: Behandling[]): Hendelse[] => {
    const behanldingerUtenDuplikater = behandlinger.filter(fjernBehandlingerMedLikOpprettetDato);
    const behandlingsresultatHendelser = behanldingerUtenDuplikater
        .filter(erBehandlingAvsluttet)
        .map(behandlingsResultatTilHendelse);

    const behandlingsÅrsakHendelser = behanldingerUtenDuplikater
        .filter((b) => b.årsak !== null)
        .map(behandlingÅrsakTilHendelse);

    const inntektsmeldingHendeliser = behanldingerUtenDuplikater
        .filter((b) => b.inntektsmeldinger.length > 0)
        .map(behandlingMedInntektmeldingerTilHendelse);

    return [...behandlingsresultatHendelser, ...behandlingsÅrsakHendelser, ...inntektsmeldingHendeliser].sort(
        sortHendlser
    );
};

const behandlingMedInntektmeldingerTilHendelse = (behandling: Behandling): Hendelse => {
    return {
        dato: behandling.opprettetTidspunkt,
        beskrivelse: 'inntektsmelding-motatt',
        brukerInitiertHendelse: false
    };
};

const behandlingsResultatTilHendelse = (behandling: Behandling): Hendelse => {
    return {
        dato: behandling.endretTidspunkt,
        beskrivelse: behandling.behandlingResultat,
        brukerInitiertHendelse: false
    };
};

const behandlingÅrsakTilHendelse = (behandling: Behandling): Hendelse => {
    return {
        dato: behandling.opprettetTidspunkt,
        beskrivelse: behandling.årsak!,
        brukerInitiertHendelse: erInitiertAvBruker(behandling.årsak)
    };
};

export const utledHendelser = (
    behandlinger?: Behandling[],
    historikkInnslagListe?: Innsendingsinnslag[]
): Hendelse[] => {
    if (behandlinger === undefined || behandlinger.length === 0) {
        return [];
    }

    let hendelser = utledHendelserUtenHistorikkInnslag(behandlinger);
    hendelser = utledSøknadMotattHendelse(hendelser);

    return hendelser.filter(erHendelseRelevant).sort(sortHendlser);
};

const sortHendlser = (h1: Hendelse, h2: Hendelse) => h2.dato.localeCompare(h1.dato);
