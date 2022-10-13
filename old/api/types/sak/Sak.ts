import { FagsakStatus } from './FagsakStatus';
import Behandling from './Behandling';
import AnnenPart from './AnnenPart';
import Periode from '../../../types/uttaksplan/Periode';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { UttaksplanDto } from '../UttaksplanDto';

export interface SakBase {
    type: SakType;
    behandlinger?: Behandling[];
    status?: FagsakStatus;
    saksnummer?: string;
    opprettet: string;
    annenPart?: AnnenPart;
    mottattEndringssøknad: boolean;
}

export default interface Sak extends SakBase {
    saksgrunnlag?: UttaksplanDto;
    perioder?: Periode[];
    tilgjengeligeKontoer?: TilgjengeligStønadskonto[];
}

export enum SakType {
    SAK = 'SAK', // Indicates that sak is from infotrygd
    FPSAK = 'FPSAK',
}
