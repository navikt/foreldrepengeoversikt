import Behandling from './Behandling';
import { Status } from './Status';

export default interface Sak {
    behandlingTema?: string;
    behandlinger?: Behandling[];
    status: Status;
    saksnummer: string;
    opprettet?: string;
}
