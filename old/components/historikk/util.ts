import { Hendelse } from './HistorikkElement';
import Behandling, { BehandlingResultatType } from '../../api/types/sak/Behandling';
import { formatDate } from '../saksoversikt/utils';
import {
    Innsendingsinnslag,
    HistorikkInnslagType,
    HistorikkInnslag,
    HendelseType,
    isInntektsmeldingInnslag,
    isMinidialogInnslag,
    isInnsendingInnslag,
    isEttersendelseHendelse,
} from 'app/api/types/historikk/HistorikkInnslag';
import { erBehandlingAvsluttet } from 'app/utils/sakerUtils';
import moment from 'moment';
import { Skjemanummer } from '../old/common/storage/attachment/types/Skjemanummer';

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

const erHendelseRelevant = (h: Hendelse): boolean => {
    return (
        Object.values(BehandlingResultatType)
            .map((brt) => brt.toString())
            .includes(h.type) ||
        h.type === 'søknad-sendt' ||
        h.type === 'inntektsmelding-motatt' ||
        h.type === HistorikkInnslagType.søknad ||
        h.type === HistorikkInnslagType.inntekt ||
        h.type === HistorikkInnslagType.minidialog
    );
};

const utledHendelserMedBehandlinger = (
    behandlinger: Behandling[],
    utledInntektsmeldingerTom: string | undefined
): Hendelse[] => {
    const behandlingerUtenDuplikater = behandlinger.filter(fjernBehandlingerMedLikOpprettetDato);
    const behandlingsresultatHendelser = behandlingerUtenDuplikater
        .filter(erBehandlingAvsluttet)
        .map(behandlingsResultatTilHendelse);

    const inntektsmeldingHendelser = behandlingerUtenDuplikater
        .filter((b) =>
            utledInntektsmeldingerTom ? moment(b.endretTidspunkt).isBefore(utledInntektsmeldingerTom, 'days') : true
        )
        .filter((b) => b.inntektsmeldinger.length > 0)
        .map(behandlingMedInntektmeldingerTilHendelse);

    return [...behandlingsresultatHendelser, ...inntektsmeldingHendelser].sort(sortHendelser);
};

const behandlingMedInntektmeldingerTilHendelse = (behandling: Behandling): Hendelse => {
    return {
        dato: behandling.opprettetTidspunkt,
        type: 'inntektsmelding-motatt',
        beskrivelse: 'inntektsmelding-motatt',
        brukerInitiertHendelse: false,
    };
};

const behandlingsResultatTilHendelse = (behandling: Behandling): Hendelse => {
    return {
        dato: behandling.endretTidspunkt,
        type: behandling.behandlingResultat,
        beskrivelse: behandling.behandlingResultat,
        brukerInitiertHendelse: false,
    };
};

const getRelevanteSkjemanumre = (historikkInnslag: HistorikkInnslag): Skjemanummer[] | undefined => {
    if (isInnsendingInnslag(historikkInnslag)) {
        if (isEttersendelseHendelse(historikkInnslag.hendelse)) {
            return historikkInnslag.opplastedeVedlegg;
        }

        return historikkInnslag.ikkeOpplastedeVedlegg;
    }

    return undefined;
};

const historikkInnslagTilHendelse = (historikkInnslag: HistorikkInnslag): Hendelse => {
    return {
        dato: historikkInnslag.opprettet,
        type: historikkInnslag.type,
        beskrivelse: getBeskrivelseForHistorikkInnslag(historikkInnslag),
        brukerInitiertHendelse: historikkInnslag.type === HistorikkInnslagType.søknad,
        skjemanumre: getRelevanteSkjemanumre(historikkInnslag),
        arbeidsgiver: isInntektsmeldingInnslag(historikkInnslag) ? historikkInnslag.arbeidsgiver : undefined,
    };
};

const getBeskrivelseForHistorikkInnslag = (historikkInnslag: HistorikkInnslag): string => {
    if (isInnsendingInnslag(historikkInnslag)) {
        switch (historikkInnslag.hendelse) {
            case HendelseType.ETTERSENDING_ENGANGSSTØNAD:
            case HendelseType.ETTERSENDING_FORELDREPENGER:
            case HendelseType.ETTERSENDING_SVANGERSKAPSPENGER:
                return 'ettersendelse';
            default:
                return (historikkInnslag as Innsendingsinnslag).hendelse;
        }
    }

    if (isMinidialogInnslag(historikkInnslag)) {
        return historikkInnslag.hendelse;
    }

    return historikkInnslag.type;
};

export const hentHendelserFraHistorikkinnslagListe = (historikkInnslagListe?: HistorikkInnslag[]): Hendelse[] => {
    if (historikkInnslagListe === undefined) {
        return [];
    }

    const historikkInnslag = historikkInnslagListe.filter(
        (h) =>
            h.type === HistorikkInnslagType.inntekt ||
            h.type === HistorikkInnslagType.søknad ||
            h.type === HistorikkInnslagType.minidialog
    );

    return historikkInnslag.map(historikkInnslagTilHendelse);
};

export const utledHendelser = (behandlinger?: Behandling[], historikkInnslagListe?: HistorikkInnslag[]): Hendelse[] => {
    if (behandlinger === undefined || behandlinger.length === 0) {
        return [];
    }

    const førsteInntektsmeldingHendelse =
        historikkInnslagListe &&
        historikkInnslagListe.find((historikkInnslag) => historikkInnslag.type === HistorikkInnslagType.inntekt);

    return utledHendelserMedBehandlinger(
        behandlinger,
        førsteInntektsmeldingHendelse ? førsteInntektsmeldingHendelse.opprettet : undefined
    )
        .concat(...hentHendelserFraHistorikkinnslagListe(historikkInnslagListe))
        .filter(erHendelseRelevant)
        .sort(sortHendelser);
};

const sortHendelser = (h1: Hendelse, h2: Hendelse) => h2.dato.localeCompare(h1.dato);
