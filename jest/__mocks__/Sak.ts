import { FagsakStatus } from '../../src/app/types/FagsakStatus';
import Sak, { SakType } from '../../src/app/types/Sak';
import Behandling, { BehandlingTema, BehanldingStatus } from '../../src/app/types/Behandling';

const behandling: Behandling = {
    behandlendeEnhet: "4833",
    behandlendeEnhetNavn: "NAV Familie- og pensjonsytelser Oslo 1",
    id: null,
    status: BehanldingStatus.OPPRETTET,
    tema: BehandlingTema.FORELDREPENGER,
    type: "FP",
    årsak: null,
};

const infotrygdSak: Sak = {
    type: SakType.SAK,
    saksnummer: '123',
    opprettet: '2018-10-1',
};

const fpsakSak: Sak = {
    type: SakType.FPSAK,
    saksnummer: '123',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [behandling]
};

const SakerMock = { infotrygdSak, fpsakSak };
export default SakerMock;
