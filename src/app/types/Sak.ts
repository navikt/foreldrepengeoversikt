import Behandling from './Behandling';
import { FagsakStatus } from './FagsakStatus';

export default interface Sak {
    behandlinger?: Behandling[];
    status?: FagsakStatus;
    saksnummer: string;
    opprettet: string;
}
