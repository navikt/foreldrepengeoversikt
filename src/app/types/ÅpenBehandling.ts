import { BehandlingTilstand } from './BehandlingTilstand';
import { PeriodeDTO } from './Periode';

export interface ÅpenBehandling {
    tilstand: BehandlingTilstand;
    søknadsperioder?: PeriodeDTO[];
}
