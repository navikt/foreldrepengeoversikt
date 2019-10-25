import { FagsakStatus } from '../../src/app/api/types/sak/FagsakStatus';
import Behandling, { BehandlingResultatType, BehandlingStatus, BehandlingTema, BehandlingÅrsak, BehandligType } from '../../src/app/api/types/sak/Behandling';
import SakBase, { SakType } from 'app/api/types/sak/Sak';


export const engangssønadBehandligMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: "4833",
    behandlendeEnhetNavn: "NAV Familie- og pensjonsytelser Oslo 1",
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.ENGANGSTØNAD,
    type: BehandligType.ENGANGSSØNAD,
    årsak: BehandlingÅrsak.YTELSE,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: []
};

export const foreldrepengesoknadBehandlingMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: "4833",
    behandlendeEnhetNavn: "NAV Familie- og pensjonsytelser Oslo 1",
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.FORELDREPENGER,
    type: BehandligType.FORELDREPENGESØKNAD,
    årsak: BehandlingÅrsak.YTELSE,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: []
};

export const svpBehandligMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: "4833",
    behandlendeEnhetNavn: "NAV Familie- og pensjonsytelser Oslo 1",
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.UDEFINERT,
    type: BehandligType.SVANGERSKAPSPENGESØKNAD,
    årsak: BehandlingÅrsak.YTELSE,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: []
}

export const endringssøknadBehandligMock: Behandling = {
    opprettetTidspunkt: '2019-01-01',
    endretTidspunkt: '2019-01-02',
    behandlendeEnhet: "4833",
    behandlendeEnhetNavn: "NAV Familie- og pensjonsytelser Oslo 1",
    status: BehandlingStatus.OPPRETTET,
    tema: BehandlingTema.FORELDREPENGER,
    type: BehandligType.FORELDREPENGESØKNAD,
    årsak: BehandlingÅrsak.ENDRING_FRA_BRUKER,
    behandlingResultat: BehandlingResultatType.INNVILGET,
    inntektsmeldinger: []
}

const infotrygd: SakBase = {
    type: SakType.SAK,
    saksnummer: '123',
    opprettet: '2018-09-01'
};

const fpsakSVP:  SakBase = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [svpBehandligMock]
};

const fpsakFP:  SakBase = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [foreldrepengesoknadBehandlingMock]
};

const fpsakES: SakBase = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [engangssønadBehandligMock]
};

const fpsakEndring: SakBase = {
    type: SakType.FPSAK,
    saksnummer: '234',
    opprettet: '2018-10-01',
    status: FagsakStatus.OPPRETTET,
    behandlinger: [endringssøknadBehandligMock]
}

const SakerMock = { fpsakSVP, fpsakES, fpsakFP, fpsakEndring, infotrygd };
export default SakerMock;
