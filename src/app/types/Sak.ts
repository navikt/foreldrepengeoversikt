import { FagsakStatus } from './FagsakStatus';
import { Saksgrunnlag } from './Søknadsgrunnlag';
import Behandling from './Behandling';

export default interface Sak {
    type?: SakType;
    erJornalført?: boolean;
    behandlinger?: Behandling[];
    status?: FagsakStatus;
    saksnummer?: string;
    opprettet: string;
    saksgrunnlag?: Saksgrunnlag;
}

export enum SakType {
    SAK = 'SAK', // Indicates that sak is from infotrygd
    FPSAK = 'FPSAK'
}
