import Bankkonto from './Bankkonto';
import { Kjønn } from './Kjønn';

interface Personinfo {
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

export default Personinfo;
