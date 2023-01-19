import { bemUtils, intlUtils } from '@navikt/fp-common';
import ContentSection from 'app/components/content-section/ContentSection';
import SeDokumenter from 'app/components/se-dokumenter/SeDokumenter';
import SeOpplysninger from 'app/components/se-opplysninger/SeOpplysninger';
import DinPlan from 'app/sections/din-plan/DinPlan';
import Oppgaver from 'app/sections/oppgaver/Oppgaver';
import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import Topp from 'app/sections/topp/Topp';
import { Sak } from 'app/types/Sak';
import { slåSammenLikePerioder } from 'app/utils/planUtils';
import React from 'react';
import { useIntl } from 'react-intl';
import { Outlet } from 'react-router-dom';

import './saksoversikt.css';

interface Props {
    foreldrepengerSaker: Sak[];
    navnPåSøker: string;
}

const Saksoversikt: React.FunctionComponent<Props> = ({ foreldrepengerSaker, navnPåSøker }) => {
    const intl = useIntl();
    const bem = bemUtils('saksoversikt');
    const gjeldendeSak = foreldrepengerSaker.length > 0 ? foreldrepengerSaker[0] : undefined;
    let gjeldendeVedtak = undefined;

    if (gjeldendeSak) {
        gjeldendeVedtak = gjeldendeSak.gjeldendeVedtak;
    }

    return (
        <div className={bem.block}>
            <Topp saksnummer={gjeldendeSak?.saksnummer} />
            <ContentSection heading={intlUtils(intl, 'saksoversikt.oppgaver')} backgroundColor="yellow">
                <Oppgaver />
            </ContentSection>
            {gjeldendeSak && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.tidslinje')}>
                    <Tidslinje saksnummer={gjeldendeSak.saksnummer} />
                </ContentSection>
            )}
            <ContentSection padding="none">
                <SeDokumenter />
            </ContentSection>
            <ContentSection padding="none">
                <SeOpplysninger />
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
        </div>
    );
};

export default Saksoversikt;
