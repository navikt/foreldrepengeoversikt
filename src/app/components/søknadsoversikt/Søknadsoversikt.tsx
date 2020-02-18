import React from 'react';
import SectionSeparator from '../section-separator/SectionSeparator';
import SøknadsoversiktHendelseListe from './components/SøknadsoversiktHendelseListe';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

interface Props {
    søknadsDato: string;
    arbeidsforhold: Arbeidsforhold[] | undefined;
}

const Søknadsoversikt: React.StatelessComponent<Props> = ({ søknadsDato, arbeidsforhold }) => {
    return (
        <SectionSeparator title="Søknad">
            <SøknadsoversiktHendelseListe søknadsDato={søknadsDato} arbeidsforhold={arbeidsforhold} />
        </SectionSeparator>
    );
};

export default Søknadsoversikt;
