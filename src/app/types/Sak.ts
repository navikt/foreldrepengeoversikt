import Behandling from './Behandling';
import { Status } from './Status';

export default interface Sak {
    behandlinger?: Behandling[];
    status?: Status;
    saksnummer: string;
    opprettet?: string;
}
