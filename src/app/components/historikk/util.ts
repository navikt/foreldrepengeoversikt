import { Hendelse } from './HistorikkElement';
import Behandling, { BehandlingResultatType, BehandlingStatus, BehandlingÅrsak } from '../../types/Behandling';
import { formatDate } from '../saksoversikt/util';
import { behandlingByDescendingOrder } from '../../utils/sakerUtils';

const oversettÅrsak = (årsak?: BehandlingÅrsak | null): string => {
    switch (årsak) {
        case BehandlingÅrsak.ENDRING_FRA_BRUKER:
            return 'Endringssøknad sendt';
        case BehandlingÅrsak.ENDRET_INNTEKTSMELDING:
            return 'Inntektsmelding mottatt';
        case BehandlingÅrsak.MANGLENDE_FØDSEL:
            return 'Manglende informasjon om fødsel i folkeregisteret';
        case BehandlingÅrsak.REGISTER_OPPLYSNING:
        case null:
            return 'Søknad Sendt';
        default:
            return årsak ? årsak : 'Ukjent årsak';
    }
};

export const oversettResultat = (resultatType: BehandlingResultatType) => {
    switch (resultatType) {
        case BehandlingResultatType.INNVILGET:
            return 'Søknad innvilget';
        case BehandlingResultatType.FORELDREPENGER_ENDRET:
            return 'Endring innvilget';
        default:
            return resultatType ? resultatType : 'Resultat ikke definert';
    }
};

const oversettStatus = (b: Behandling): string => {
    return b.status === BehandlingStatus.AVSLUTTET ? oversettResultat(b.behandlingResultat) : 'ukjent';
};

const erInitiertAvBruker = (årsak?: BehandlingÅrsak | null): boolean => {
    switch (årsak) {
        case BehandlingÅrsak.MANGLENDE_FØDSEL:
        case BehandlingÅrsak.MANGLENDE_FØDSEL_TERMIN:
        case BehandlingÅrsak.ENDRET_INNTEKTSMELDING:
            return false;
        case BehandlingÅrsak.ENDRING_FRA_BRUKER:
        default:
            return true;
    }
};

const erBehandlingAvsluttet = (b: Behandling): boolean => {
    return b.status === BehandlingStatus.AVSLUTTET;
};

const splittBehandlingTilHenderlser = (b: Behandling): Hendelse[] => {
    const hendelser: Hendelse[] = [
        {
            dato: b.endretTidspunkt,
            beskrivelse: oversettStatus(b),
            brukerInitiertHendelse: false
        },
        {
            dato: b.opprettetTidspunkt,
            beskrivelse: oversettÅrsak(b.årsak),
            brukerInitiertHendelse: true
        }
    ];
    return hendelser;
};

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


export const utledHendelser = (behandlinger?: Behandling[]): Hendelse[] => {
    const hendelser: Hendelse[] = [];
    if (behandlinger === undefined || behandlinger.length === 0) {
        return hendelser;
    }

    behandlinger
        .filter(fjernBehandlingerMedLikOpprettetDato)
        .sort(behandlingByDescendingOrder)
        .forEach((b: Behandling) => {
            erBehandlingAvsluttet(b)
                ? hendelser.push(...splittBehandlingTilHenderlser(b))
                : hendelser.push({
                      dato: b.opprettetTidspunkt,
                      beskrivelse: oversettÅrsak(b.årsak),
                      brukerInitiertHendelse: erInitiertAvBruker(b.årsak)
                  });

            if (b.inntektsmeldinger.length > 0 && b.årsak !== BehandlingÅrsak.ENDRET_INNTEKTSMELDING) {
                hendelser.push({
                    dato: b.opprettetTidspunkt,
                    beskrivelse: 'Inntektsmelding mottatt',
                    brukerInitiertHendelse: false
                });
            }
        });

    return hendelser;
};
