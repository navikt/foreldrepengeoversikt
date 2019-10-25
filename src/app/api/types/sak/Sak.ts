import { FagsakStatus } from './FagsakStatus';
import Behandling from './Behandling';
import AnnenPart from './AnnenPart';
import Periode from '../../../types/uttaksplan/Periode';
import { UttaksplanDto } from 'app/api/types/UttaksplanDto';

export interface SakBase {
    type: SakType;
    erJornalført?: boolean;
    behandlinger?: Behandling[];
    status?: FagsakStatus;
    saksnummer: string;
    opprettet: string;
    annenPart?: AnnenPart;
}

export default interface Sak extends SakBase {
    saksgrunnlag?: UttaksplanDto;
    perioder?: Periode[];    
}

export enum SakType {
    SAK = 'SAK', // Indicates that sak is from infotrygd
    FPSAK = 'FPSAK'
}