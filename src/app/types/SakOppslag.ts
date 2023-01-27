import { EngangsstønadSak, EngangsstønadSakDTO } from './EngangsstønadSak';
import { Sak, SakDTO } from './Sak';
import { SvangerskapspengeSak, SvangerskapspengeSakDTO } from './SvangerskapspengeSak';

export interface SakOppslagDTO {
    engangsstønad: EngangsstønadSakDTO[];
    foreldrepenger: SakDTO[];
    svangerskapspenger: SvangerskapspengeSakDTO[];
}

export interface SakOppslag {
    engangsstønad: EngangsstønadSak[];
    foreldrepenger: Sak[];
    svangerskapspenger: SvangerskapspengeSak[];
}
