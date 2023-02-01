import { bemUtils, intlUtils } from '@navikt/fp-common';
import ContentSection from 'app/components/content-section/ContentSection';
import SeDokumenter from 'app/components/se-dokumenter/SeDokumenter';
import SeOpplysninger from 'app/components/se-opplysninger/SeOpplysninger';
import { useSetBackgroundColor } from 'app/hooks/useSetBackgroundColor';
import DinPlan from 'app/sections/din-plan/DinPlan';
import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import { SakOppslag } from 'app/types/SakOppslag';
import { Ytelse } from 'app/types/Ytelse';
import { slåSammenLikePerioder } from 'app/utils/planUtils';
import { getAlleSaker } from 'app/utils/sakerUtils';
import React from 'react';
import { useIntl } from 'react-intl';
import { Outlet, useParams } from 'react-router-dom';

import './saksoversikt.css';

interface Props {
    navnPåSøker: string;
    saker: SakOppslag;
}

const Saksoversikt: React.FunctionComponent<Props> = ({ saker, navnPåSøker }) => {
    const intl = useIntl();
    const bem = bemUtils('saksoversikt');
    useSetBackgroundColor('blue');
    const params = useParams();
    const alleSaker = getAlleSaker(saker);

    const gjeldendeSak = alleSaker.find((fp) => fp.saksnummer === params.saksnummer);
    let gjeldendeVedtak = undefined;

    if (gjeldendeSak && gjeldendeSak.ytelse === Ytelse.FORELDREPENGER) {
        gjeldendeVedtak = gjeldendeSak.gjeldendeVedtak;
    }

    return (
        <div className={bem.block}>
            {gjeldendeSak && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.tidslinje')}>
                    <Tidslinje />
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
