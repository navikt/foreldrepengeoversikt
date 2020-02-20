import React from 'react';
import SectionSeparator from '../section-separator/SectionSeparator';
import SøknadsoversiktHendelseListe from './components/SøknadsoversiktHendelseListe';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { InntektsmeldingInnslag } from 'app/api/types/historikk/HistorikkInnslag';

interface Props {
    søknadsDato: string;
    arbeidsforhold: Arbeidsforhold[] | undefined;
    inntektsmeldinger: InntektsmeldingInnslag[];
}

const Søknadsoversikt: React.StatelessComponent<Props> = ({ søknadsDato, arbeidsforhold, inntektsmeldinger }) => {
    return (
        <SectionSeparator title="Søknad">
            <SøknadsoversiktHendelseListe
                søknadsDato={søknadsDato}
                arbeidsforhold={arbeidsforhold}
                inntektsmeldinger={inntektsmeldinger}
            />
        </SectionSeparator>
    );
};

export default Søknadsoversikt;
