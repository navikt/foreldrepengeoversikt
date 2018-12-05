import Behandling from './Behandling';
import { FagsakStatus } from './FagsakStatus';

export default interface Sak {
    type: SakType;
    behandlinger?: Behandling[];
    status?: FagsakStatus;
    saksnummer: string;
    opprettet: string;
}

export enum SakType {
    SAK = 'SAK', // Indicates that sak is from infotrygd
    FPSAK = 'FPSAK'
}
