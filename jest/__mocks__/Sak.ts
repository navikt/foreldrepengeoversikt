import { FagsakStatus } from '../../src/app/types/FagsakStatus';
import Sak, { SakType } from '../../src/app/types/Sak';
import Behandling, { BehandlingResultatType, BehandlingStatus, BehandlingTema, BehandlingÅrsak } from '../../src/app/types/Behandling';

export const behandlingMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: "4833",
    behandlendeEnhetNavn: "NAV Familie- og pensjonsytelser Oslo 1",
    id: null,
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.FORELDREPENGER,
    type: "FP",
    årsak: BehandlingÅrsak.YTELSE,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: []
};

const infotrygdSak: Sak = {
    type: SakType.SAK,
    saksnummer: '123',
    opprettet: '2018-09-01'
};

const fpsakSak: Sak = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [behandlingMock]
};

const SakerMock = { infotrygdSak, fpsakSak };
export default SakerMock;
