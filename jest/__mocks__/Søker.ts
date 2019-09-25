import Personinfo from "app/api/types/personinfo/Personinfo";
import { Kjønn } from "app/api/types/personinfo/Kjønn";

export const søkerMock: Personinfo = {
    fnr: '12345678910',
    fornavn: 'fornavn',
    mellomnavn: 'mellomnavn',
    etternavn: 'etternavn',
    adresse: 'adresse 1',
    kjønn: Kjønn.K,
    fødselsdato: '01-01-90',
    ikkeNordiskEøsLand: false
};