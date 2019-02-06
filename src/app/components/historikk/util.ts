import Sak from '../../types/Sak';
import { Hendelse } from './HistorikkElement';
import Behandling, { BehandlingResultatType, BehandlingStatus, BehandlingÅrsak } from '../../types/Behandling';
import { formatDate } from '../saksoversikt/util';
import { behandlingByDescendingOrder } from '../../utils/sakerUtils';

const oversettÅrsak = (årsak?: BehandlingÅrsak): string => {
    switch (årsak) {
        case BehandlingÅrsak.ENDRING_FRA_BRUKER:
            return 'Endringssøknad sendt';
        case BehandlingÅrsak.ENDRET_INNTEKTSMELDING:
            return 'Inntektsmelding mottatt';
        case BehandlingÅrsak.MANGLENDE_FØDSEL:
            return 'Manglende informasjon om fødsel i folkeregisteret';
        default:
            return årsak ? årsak : 'Søknad Sendt';
    }
};

const erInitiertAvBruker = (årsak?: BehandlingÅrsak): boolean => {
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

const oversettResultat = (resultatType: BehandlingResultatType) => {
    switch (resultatType) {
        case BehandlingResultatType.INNVILGET:
            return 'Søknad innvilget';
        case BehandlingResultatType.FORELDREPENGER_ENDRET:
            return 'Endring godkjent'
        default:
            return resultatType ? resultatType : 'Resultat ikke definert';
    }
};


const oversettStatus = (b: Behandling): string => {
    return b.status === BehandlingStatus.AVSLUTTET ? oversettResultat(b.behandlingResultat) : 'ukjent';
};

const splittBehandlingTilHenderlser = (b: Behandling): Hendelse[] => {
    const hendelser: Hendelse[] = [
        {
            dato: formaterDato(b.endretTidspunkt),
            beskrivelse: oversettStatus(b),
            brukerInitiertHendelse: false
        },
        {
            dato: formaterDato(b.opprettetTidspunkt),
            beskrivelse: oversettÅrsak(b.årsak),
            brukerInitiertHendelse: true
        }
    ];

    if (b.inntektsmeldinger.length > 0) {
        hendelser.push({
            dato: formaterDato(b.opprettetTidspunkt),
            beskrivelse: 'Inntektsmelding mottatt',
            brukerInitiertHendelse: false
        });
    }

    return hendelser;
};

const formaterDato = (dato: string) => {
    return formatDate(dato, 'D. MMMM YYYY [kl.] HH:mm:ss');
};

export const utledHendelser = (sak: Sak): Hendelse[] => {
    const hendelser: Hendelse[] = [];

    if (sak.behandlinger) {
        sak.behandlinger.sort(behandlingByDescendingOrder).forEach((b: Behandling) => {
            erBehandlingAvsluttet(b)
                ? hendelser.push(...splittBehandlingTilHenderlser(b))
                : hendelser.push({
                      dato: formaterDato(b.opprettetTidspunkt),
                      beskrivelse: oversettÅrsak(b.årsak),
                      brukerInitiertHendelse: erInitiertAvBruker(b.årsak)
                  });
        });
    }
    return hendelser;
};
