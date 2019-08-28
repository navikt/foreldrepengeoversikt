import { FagsakStatus } from '../FagsakStatus';
import { Saksgrunnlag } from '../uttaksplan/Søknadsgrunnlag';
import Behandling from './Behandling';
import AnnenPart from './AnnenPart';

export default interface Sak {
    type?: SakType;
    erJornalført?: boolean;
    behandlinger?: Behandling[];
    status?: FagsakStatus;
    saksnummer?: string;
    opprettet: string;
    saksgrunnlag?: Saksgrunnlag;
    annenPart?: AnnenPart;
}

export enum SakType {
    SAK = 'SAK', // Indicates that sak is from infotrygd
    FPSAK = 'FPSAK'
}
