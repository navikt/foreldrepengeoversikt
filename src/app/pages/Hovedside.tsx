import ContentSection from 'app/components/content-section/ContextSection';
import DinPlan from 'app/sections/din-plan/DinPlan';
import Dokumentoversikt from 'app/sections/dokumentoversikt/Dokumentoversikt';
import Oppgaver from 'app/sections/oppgaver/Oppgaver';
import Saksoversikt from 'app/sections/saksoversikt/Saksoversikt';
import Samtaler from 'app/sections/samtaler/Samtaler';
import SeSøknad from 'app/sections/se-søknad/SeSøknad';
import Topp from 'app/sections/topp/Topp';
import React from 'react';

const Hovedside = () => {
    return (
        <>
            <Topp />
            <ContentSection backgroundColor="blue">
                <Oppgaver />
            </ContentSection>
            <ContentSection heading="Dette skjer i saken">
                <Saksoversikt />
            </ContentSection>
            <ContentSection heading="Dokumenter">
                <Dokumentoversikt />
            </ContentSection>
            <ContentSection padding="none">
                <Samtaler />
            </ContentSection>
            <ContentSection padding="none">
                <SeSøknad />
            </ContentSection>
            <ContentSection heading="Din Plan" padding="large">
                <DinPlan />
            </ContentSection>
        </>
    );
};

export default Hovedside;
