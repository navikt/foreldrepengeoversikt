import { Kjønn } from 'app/api/types/personinfo/Kjønn';
import Person from 'app/types/Person';

export const søkerMock: Person = {
    fnr: '12345678910',
    fornavn: 'fornavn',
    mellomnavn: 'mellomnavn',
    etternavn: 'etternavn',
    kjønn: Kjønn.K,
    fødselsdato: '01-01-90',
    ikkeNordiskEøsLand: false,
    erMyndig: true,
};
