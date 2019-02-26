import { Hendelse } from './HistorikkElement';
import Behandling, { BehandlingResultatType, BehandlingStatus, BehandlingÅrsak } from '../../types/Behandling';
import { formatDate } from '../saksoversikt/util';
import { behandlingByDescendingOrder } from '../../utils/sakerUtils';

export const formaterDatoForHendelse = (dato: string) => {
    return formatDate(dato, 'D. MMMM YYYY [kl.] HH:mm:ss');
};

const erBehandlingAvsluttet = (b: Behandling): boolean => {
    return b.status === BehandlingStatus.AVSLUTTET;
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
        case BehandlingÅrsak.MANGLENDE_FØDSEL:
        case BehandlingÅrsak.MANGLENDE_FØDSEL_TERMIN:
        case BehandlingÅrsak.ENDRET_INNTEKTSMELDING:
        case BehandlingÅrsak.BERØRT_BEHANDLING:
            return false;
        case BehandlingÅrsak.ENDRING_FRA_BRUKER:
        default:
            return true;
    }
};

const splittBehandlingTilHenderlser = (b: Behandling): Hendelse[] => {
    const hendelser: Hendelse[] = [
        {
            dato: b.endretTidspunkt,
            beskrivelse: b.behandlingResultat,
            brukerInitiertHendelse: false
        },
        {
            dato: b.opprettetTidspunkt,
            beskrivelse: b.årsak === null ? 'null' : b.årsak,
            brukerInitiertHendelse: erInitiertAvBruker(b.årsak)
        }
    ];
    return hendelser;
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
        Object.values(BehandlingResultatType).includes(h.beskrivelse) ||
        h.beskrivelse === 'søknad-sendt' ||
        h.beskrivelse === 'inntektsmelding-motatt' ||
        h.beskrivelse === BehandlingÅrsak.ENDRET_INNTEKTSMELDING ||
        h.beskrivelse === BehandlingÅrsak.ENDRING_FRA_BRUKER
    );
};

export const utledHendelser = (behandlinger?: Behandling[]): Hendelse[] => {
    const hendelser: Hendelse[] = [];
    if (behandlinger === undefined || behandlinger.length === 0) {
        return hendelser;
    }

    behandlinger
        .filter(fjernBehandlingerMedLikOpprettetDato)
        .sort(behandlingByDescendingOrder)
        .forEach((b: Behandling, index: number, filtrerteBehandlinger: Behandling[]) => {
            erBehandlingAvsluttet(b)
                ? hendelser.push(...splittBehandlingTilHenderlser(b))
                : hendelser.push({
                      dato: b.opprettetTidspunkt,
                      beskrivelse: b.årsak === null ? 'null' : b.årsak,
                      brukerInitiertHendelse: erInitiertAvBruker(b.årsak)
                  });

            if (b.inntektsmeldinger.length > 0 && (index !== 0 || filtrerteBehandlinger.length === 1)) {
                hendelser.push({
                    dato: b.årsak === BehandlingÅrsak.ENDRET_INNTEKTSMELDING ? b.opprettetTidspunkt : b.endretTidspunkt,
                    beskrivelse: 'inntektsmelding-motatt',
                    brukerInitiertHendelse: false
                });
            }
        });

    return utledSøknadMotattHendelse(hendelser)
        .filter(erHendelseRelevant)
        .sort((h1: Hendelse, h2: Hendelse) => h2.dato.localeCompare(h1.dato));
};
