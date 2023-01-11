import { Sak } from './Sak';

export interface GruppertSak {
    antallBarn: number;
    familiehendelsedato: string;
    type: 'fødsel' | 'termin' | 'adopsjon';
    saker: Sak[];
}
