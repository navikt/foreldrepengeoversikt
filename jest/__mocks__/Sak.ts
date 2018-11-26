import { Status } from '../../src/app/types/Status';
import Sak from '../../src/app/types/Sak';
import Behandling from '../../src/app/types/Behandling';

const behandling: Behandling = {
    behandlendeEnhet: "4833",
    behandlendeEnhetNavn: "NAV Familie- og pensjonsytelser Oslo 1",
    id: null,
    status: "UTRED",
    tema: "FORP_FODS",
    type: "FP",
    årsak: null,
};

const infotrygdSak: Sak = {
    saksnummer: '123',
    opprettet: '2018-10-1',
};

const fpsakSak: Sak = {
    saksnummer: '123',
    opprettet: '2018-10-01',
    status: Status.OPPRETTET,
    behandlinger: [behandling]
};

const Saker = { infotrygdSak, fpsakSak };
export default Saker;
