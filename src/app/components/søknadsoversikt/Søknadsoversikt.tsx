import React from 'react';
import SectionSeparator from '../section-separator/SectionSeparator';
import SøknadsoversiktHendelseListe from './components/SøknadsoversiktHendelseListe';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { InntektsmeldingInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { ManglendeVedlegg } from 'app/api/types/sak/ManglendeVedlegg';

interface Props {
    søknadsDato: string;
    arbeidsforhold: Arbeidsforhold[] | undefined;
    inntektsmeldinger: InntektsmeldingInnslag[];
    brukerHarSendtSøknad: boolean;
    behandlingsdato: string;
    manglendeVedlegg: ManglendeVedlegg[];
    navigateToEttersendelse: () => void;
}

const Søknadsoversikt: React.StatelessComponent<Props> = ({
    søknadsDato,
    arbeidsforhold,
    brukerHarSendtSøknad,
    inntektsmeldinger,
    behandlingsdato,
    manglendeVedlegg,
    navigateToEttersendelse
}) => {
    return (
        <SectionSeparator title="Søknad">
            <SøknadsoversiktHendelseListe
                søknadsDato={søknadsDato}
                arbeidsforhold={arbeidsforhold}
                inntektsmeldinger={inntektsmeldinger}
                brukerHarSendtSøknad={brukerHarSendtSøknad}
                behandlingsdato={behandlingsdato}
                manglendeVedlegg={manglendeVedlegg}
                navigateToEttersendelse={navigateToEttersendelse}
            />
        </SectionSeparator>
    );
};

export default Søknadsoversikt;
