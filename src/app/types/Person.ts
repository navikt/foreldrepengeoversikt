import { Kjønn } from 'app/api/types/personinfo/Kjønn';
import Bankkonto from 'app/api/types/personinfo/Bankkonto';

export interface PersonBase {
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: Kjønn;
    fødselsdato: string;
}

interface Person extends PersonBase {
    ikkeNordiskEøsLand: boolean;
    erMyndig: boolean;
    bankkonto?: Bankkonto;
}

export interface RegistrertBarn extends PersonBase {
    annenForelder?: RegistrertAnnenForelder;
}

export interface RegistrertAnnenForelder extends Omit<PersonBase, 'kjønn'> {
    harOpplystOmSinPågåendeSak?: boolean;
}

export default Person;
