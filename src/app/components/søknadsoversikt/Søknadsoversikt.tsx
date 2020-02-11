import React from 'react';
import SectionSeparator from '../section-separator/SectionSeparator';
import SøknadsoversiktHendelseListe from './components/SøknadsoversiktHendelseListe';

interface Props {
    søknadsDato: string;
}

const Søknadsoversikt: React.StatelessComponent<Props> = ({ søknadsDato }) => {
    return (
        <SectionSeparator title="Søknad">
            <SøknadsoversiktHendelseListe søknadsDato={søknadsDato} />
        </SectionSeparator>
    );
};

export default Søknadsoversikt;
