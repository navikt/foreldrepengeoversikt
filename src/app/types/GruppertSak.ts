import { EngangsstønadSak } from './EngangsstønadSak';
import { Sak } from './Sak';
import { SvangerskapspengeSak } from './SvangerskapspengeSak';
import { Ytelse } from './Ytelse';

export interface GruppertSak {
    antallBarn: number;
    familiehendelsedato: string;
    type: 'fødsel' | 'termin' | 'adopsjon';
    saker: Array<Sak | SvangerskapspengeSak | EngangsstønadSak>;
    ytelse: Ytelse;
}
