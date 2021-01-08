import { FagsakStatus } from '../../src/app/api/types/sak/FagsakStatus';
import Behandling, {
    BehandlingResultatType,
    BehandlingStatus,
    BehandlingTema,
    BehandlingÅrsak,
    BehandlingType,
} from '../../src/app/api/types/sak/Behandling';
import SakBase, { SakType } from 'app/api/types/sak/Sak';

export const engangssønadBehandlingMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: '4833',
    behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Oslo 1',
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.ENGANGSTØNAD,
    type: BehandlingType.ENGANGSSØNAD,
    årsak: BehandlingÅrsak.YTELSE,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: [],
};

export const foreldrepengesoknadBehandlingMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: '4833',
    behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Oslo 1',
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.FORELDREPENGER,
    type: BehandlingType.FORELDREPENGESØKNAD,
    årsak: BehandlingÅrsak.YTELSE,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: [],
};

export const svpBehandligMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: '4833',
    behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Oslo 1',
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.UDEFINERT,
    type: BehandlingType.SVANGERSKAPSPENGESØKNAD,
    årsak: BehandlingÅrsak.YTELSE,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: [],
};

export const endringssøknadBehandlingMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: '4833',
    behandlendeEnhetNavn: 'NAV Familie- og pensjonsytelser Oslo 1',
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.FORELDREPENGER,
    type: BehandlingType.FORELDREPENGESØKNAD,
    årsak: BehandlingÅrsak.ENDRING_FRA_BRUKER,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: [],
};

const infotrygd: SakBase = {
    type: SakType.SAK,
    saksnummer: '123',
    opprettet: '2018-09-01',
    mottattEndringssøknad: false,
};

const fpsakSVP: SakBase = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [svpBehandligMock],
    mottattEndringssøknad: false,
};

const fpsakFP: SakBase = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [foreldrepengesoknadBehandlingMock],
    mottattEndringssøknad: false,
};

const fpsakES: SakBase = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [engangssønadBehandlingMock],
    mottattEndringssøknad: false,
};

const fpsakEndring: SakBase = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [endringssøknadBehandlingMock],
    mottattEndringssøknad: true,
};

const SakerMock = { fpsakSVP, fpsakES, fpsakFP, fpsakEndring, infotrygd };
export default SakerMock;
