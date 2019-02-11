import Bankkonto from './Bankkonto';

export type Kjønn =
    | 'M'
    | 'K';

interface Person {
    fnr: string;
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    adresse: string;
    kjønn: Kjønn;
    fødselsdato: string;
    ikkeNordiskEøsLand: boolean;
    bankkonto?: Bankkonto;
};

export default Person;
