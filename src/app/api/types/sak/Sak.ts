import { FagsakStatus } from './FagsakStatus';
import Behandling from './Behandling';
import AnnenPart from './AnnenPart';
import Periode from '../../../types/uttaksplan/Periode';
import { UttaksplanDto } from 'app/api/types/UttaksplanDto';

export default interface Sak {
    type?: SakType;
    erJornalført?: boolean;
    behandlinger?: Behandling[];
    status?: FagsakStatus;
    saksnummer?: string;
    opprettet: string;
    saksgrunnlag?: UttaksplanDto;
    perioder?: Periode[];
    annenPart?: AnnenPart;
}

export enum SakType {
    SAK = 'SAK', // Indicates that sak is from infotrygd
    FPSAK = 'FPSAK'
}