import ContentSection from 'app/components/content-section/ContextSection';
import DinPlan from 'app/sections/din-plan/DinPlan';
import Dokumentoversikt from 'app/sections/dokumentoversikt/Dokumentoversikt';
import Oppgaver from 'app/sections/oppgaver/Oppgaver';
import Saksoversikt from 'app/sections/saksoversikt/Saksoversikt';
import Samtaler from 'app/sections/samtaler/Samtaler';
import SeSøknad from 'app/sections/se-søknad/SeSøknad';
import Topp from 'app/sections/topp/Topp';
import { Sak } from 'app/types/Sak';
import React from 'react';

interface Props {
    foreldrepengerSaker: Sak[];
}

const Hovedside: React.FunctionComponent<Props> = ({ foreldrepengerSaker }) => {
    const vedtattUttaksplan =
        foreldrepengerSaker.length > 0 ? foreldrepengerSaker[0].gjeldendeVedtak.perioder : undefined;

    return (
        <>
            <Topp />
            <ContentSection heading="Oppgaver" backgroundColor="blue">
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
            {vedtattUttaksplan && (
                <ContentSection heading="Din Plan" padding="large">
                    <DinPlan vedtattUttaksplan={vedtattUttaksplan} />
                </ContentSection>
            )}
        </>
    );
};

export default Hovedside;
