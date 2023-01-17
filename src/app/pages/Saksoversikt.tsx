import { intlUtils } from '@navikt/fp-common';
import ContentSection from 'app/components/content-section/ContentSection';
import DinPlan from 'app/sections/din-plan/DinPlan';
import Dokumentoversikt from 'app/sections/dokumentoversikt/Dokumentoversikt';
import Oppgaver from 'app/sections/oppgaver/Oppgaver';
import Samtaler from 'app/sections/samtaler/Samtaler';
import SeSøknad from 'app/sections/se-søknad/SeSøknad';
import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import Topp from 'app/sections/topp/Topp';
import { Sak } from 'app/types/Sak';
import { slåSammenLikePerioder } from 'app/utils/planUtils';
import React from 'react';
import { useIntl } from 'react-intl';
import { Outlet } from 'react-router-dom';

interface Props {
    foreldrepengerSaker: Sak[];
    navnPåSøker: string;
}

const Saksoversikt: React.FunctionComponent<Props> = ({ foreldrepengerSaker, navnPåSøker }) => {
    const intl = useIntl();
    const gjeldendeSak = foreldrepengerSaker.length > 0 ? foreldrepengerSaker[0] : undefined;
    let gjeldendeVedtak = undefined;

    if (gjeldendeSak) {
        gjeldendeVedtak = gjeldendeSak.gjeldendeVedtak;
    }

    return (
        <>
            <Topp saksnummer={gjeldendeSak?.saksnummer} />
            <ContentSection heading={intlUtils(intl, 'saksoversikt.oppgaver')} backgroundColor="yellow">
                <Oppgaver />
            </ContentSection>
            {gjeldendeSak && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.tidslinje')}>
                    <Tidslinje saksnummer={gjeldendeSak.saksnummer} />
                </ContentSection>
            )}
            <ContentSection heading={intlUtils(intl, 'saksoversikt.dokumentoversikt')}>
                <Dokumentoversikt />
            </ContentSection>
            <ContentSection padding="none">
                <Samtaler />
            </ContentSection>
            <ContentSection padding="none">
                <SeSøknad />
            </ContentSection>
            {gjeldendeVedtak && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.dinPlan')} padding="large">
                    <DinPlan
                        vedtattUttaksplan={slåSammenLikePerioder(gjeldendeVedtak.perioder)}
                        navnPåSøker={navnPåSøker}
                    />
                </ContentSection>
            )}
            <Outlet />
        </>
    );
};

export default Saksoversikt;
