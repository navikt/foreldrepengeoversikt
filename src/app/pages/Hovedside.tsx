import { intlUtils } from '@navikt/fp-common';
import ContentSection from 'app/components/content-section/ContextSection';
import DinPlan from 'app/sections/din-plan/DinPlan';
import Dokumentoversikt from 'app/sections/dokumentoversikt/Dokumentoversikt';
import Oppgaver from 'app/sections/oppgaver/Oppgaver';
import Saksoversikt from 'app/sections/saksoversikt/Saksoversikt';
import Samtaler from 'app/sections/samtaler/Samtaler';
import SeSøknad from 'app/sections/se-søknad/SeSøknad';
import Topp from 'app/sections/topp/Topp';
import { Sak } from 'app/types/Sak';
import { slåSammenLikePerioder } from 'app/utils/planUtils';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
    foreldrepengerSaker: Sak[];
    navnPåSøker: string;
}

const Hovedside: React.FunctionComponent<Props> = ({ foreldrepengerSaker, navnPåSøker }) => {
    const intl = useIntl();
    const gjeldendeSak = foreldrepengerSaker.length > 0 ? foreldrepengerSaker[0] : undefined;
    let gjeldendeVedtak = undefined;

    if (gjeldendeSak) {
        gjeldendeVedtak = gjeldendeSak.gjeldendeVedtak;
    }

    return (
        <>
            <Topp saksnummer={gjeldendeSak?.saksnummer} />
            <ContentSection heading={intlUtils(intl, 'hovedside.oppgaver')} backgroundColor="blue">
                <Oppgaver />
            </ContentSection>
            <ContentSection heading={intlUtils(intl, 'hovedside.saksoversikt')}>
                <Saksoversikt />
            </ContentSection>
            <ContentSection heading={intlUtils(intl, 'hovedside.dokumentoversikt')}>
                <Dokumentoversikt />
            </ContentSection>
            <ContentSection padding="none">
                <Samtaler />
            </ContentSection>
            <ContentSection padding="none">
                <SeSøknad />
            </ContentSection>
            {gjeldendeVedtak && (
                <ContentSection heading={intlUtils(intl, 'hovedside.dinPlan')} padding="large">
                    <DinPlan
                        vedtattUttaksplan={slåSammenLikePerioder(gjeldendeVedtak.perioder)}
                        navnPåSøker={navnPåSøker}
                    />
                </ContentSection>
            )}
        </>
    );
};

export default Hovedside;
