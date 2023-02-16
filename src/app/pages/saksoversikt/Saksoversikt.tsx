import { bemUtils, intlUtils } from '@navikt/fp-common';
import ContentSection from 'app/components/content-section/ContentSection';
import SeDokumenter from 'app/components/se-dokumenter/SeDokumenter';
import SeOpplysninger from 'app/components/se-opplysninger/SeOpplysninger';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { useSetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useSetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import DinPlan from 'app/sections/din-plan/DinPlan';
import Oppgaver from 'app/sections/oppgaver/Oppgaver';
import Tidslinje from 'app/sections/tidslinje/Tidslinje';
import { HendelseType } from 'app/types/HendelseType';
import { MinidialogInnslag } from 'app/types/HistorikkInnslag';
import { SakOppslag } from 'app/types/SakOppslag';
import { Ytelse } from 'app/types/Ytelse';
import { slåSammenLikePerioder } from 'app/utils/planUtils';
import { getAlleYtelser } from 'app/utils/sakerUtils';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import './saksoversikt.css';

interface Props {
    minidialogerData: MinidialogInnslag[] | undefined;
    minidialogerError: AxiosError | null;
    navnPåSøker: string;
    saker: SakOppslag;
}

const Saksoversikt: React.FunctionComponent<Props> = ({ minidialogerData, minidialogerError, navnPåSøker, saker }) => {
    const intl = useIntl();
    const bem = bemUtils('saksoversikt');
    useSetBackgroundColor('blue');
    useSetSelectedRoute(OversiktRoutes.SAKSOVERSIKT);
    const params = useParams();
    const alleSaker = getAlleYtelser(saker);

    const gjeldendeSak = alleSaker.find((sak) => sak.saksnummer === params.saksnummer)!;
    useSetSelectedSak(gjeldendeSak);

    let gjeldendeVedtak = undefined;
    let ubehandletSøknad = undefined;

    if (gjeldendeSak.ytelse === Ytelse.FORELDREPENGER) {
        gjeldendeVedtak = gjeldendeSak.gjeldendeVedtak;
    }

    if (gjeldendeSak.ytelse === Ytelse.FORELDREPENGER && gjeldendeSak.åpenBehandling) {
        ubehandletSøknad = gjeldendeSak.åpenBehandling;
    }

    const aktiveMinidialogerForSaken = minidialogerData
        ? minidialogerData.filter(
              ({ gyldigTil, aktiv, hendelse, saksnr }) =>
                  aktiv &&
                  saksnr === gjeldendeSak.saksnummer &&
                  dayjs(gyldigTil).isSameOrAfter(new Date(), 'days') &&
                  hendelse !== HendelseType.TILBAKEKREVING_FATTET_VEDTAK
          )
        : undefined;

    return (
        <div className={bem.block}>
            {((aktiveMinidialogerForSaken && aktiveMinidialogerForSaken.length > 0) || minidialogerError) && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.oppgaver')} backgroundColor={'yellow'}>
                    <Oppgaver
                        minidialogerData={aktiveMinidialogerForSaken}
                        minidialogerError={minidialogerError}
                        saksnummer={gjeldendeSak!.saksnummer}
                    />
                </ContentSection>
            )}
            <ContentSection cornerStyle="square" heading={intlUtils(intl, 'saksoversikt.tidslinje')}>
                <Tidslinje />
            </ContentSection>
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

            {ubehandletSøknad && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.dinPlan')} padding="large">
                    <DinPlan
                        søktePerioder={slåSammenLikePerioder(ubehandletSøknad.søknadsperioder || [])}
                        navnPåSøker={navnPåSøker}
                    />
                </ContentSection>
            )}
        </div>
    );
};

export default Saksoversikt;
