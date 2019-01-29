import Sak from '../../types/Sak';
import { Hendelse } from './HistorikkElement';
import Behandling, { BehandlingStatus, BehandlingÅrsak } from '../../types/Behandling';
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
            return årsak ? årsak : 'årsak null';
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

const oversettStatus = (status: BehandlingStatus): string => {
    return status === BehandlingStatus.AVSLUTTET ? 'Behandlig avsluttet(ukjent status)' : 'ukjent';
};

const splittBehandlingTilHenderlser = (b: Behandling): Hendelse[] => {
    return [
        {
            dato: formaterDato(b.endretTidspunkt),
            beskrivelse: oversettStatus(b.status),
            brukerInitiertHendelse: false
        },
        {
            dato: formaterDato(b.opprettetTidspunkt),
            beskrivelse: oversettÅrsak(b.årsak),
            brukerInitiertHendelse: true
        }
    ];
};

const formaterDato = (dato: string) => {
    return formatDate(dato, 'D. MMMM YYYY [kl.] hh:mm:ss');
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

    hendelser[hendelser.length - 1].beskrivelse = 'Søknad Sendt';
    hendelser[hendelser.length - 1].brukerInitiertHendelse= true;

    return hendelser;
};
