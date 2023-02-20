import { Loader } from '@navikt/ds-react';
import { bemUtils, intlUtils, Kjønn } from '@navikt/fp-common';
import Api from 'app/api/api';
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
import { getKjønnFromFnr } from 'app/utils/personUtils';
import { slåSammenLikePerioder } from 'app/utils/planUtils';
import { getAlleYtelser, getFamiliehendelseDato } from 'app/utils/sakerUtils';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import './saksoversikt.css';

interface Props {
    kjønnPåSøker: Kjønn;
    minidialogerData: MinidialogInnslag[] | undefined;
    minidialogerError: AxiosError | null;
    navnPåSøker: string;
    saker: SakOppslag;
}

const Saksoversikt: React.FunctionComponent<Props> = ({
    minidialogerData,
    minidialogerError,
    navnPåSøker,
    kjønnPåSøker,
    saker,
}) => {
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
    let familiehendelsesdato = undefined;
    let annenPartFnr = undefined;
    let annenPartVedtakIsSuspended = true;
    let navnPåAnnenPart = undefined;
    let kjønnPåAnnenPart = undefined;

    if (gjeldendeSak.ytelse === Ytelse.FORELDREPENGER) {
        gjeldendeVedtak = gjeldendeSak.gjeldendeVedtak;
        familiehendelsesdato = getFamiliehendelseDato(gjeldendeSak.familiehendelse);
        annenPartFnr = gjeldendeSak.annenPart && gjeldendeSak.annenPart.fnr ? gjeldendeSak.annenPart.fnr : undefined;
        annenPartVedtakIsSuspended =
            annenPartFnr === undefined || annenPartFnr === '' || familiehendelsesdato === undefined;
        navnPåAnnenPart =
            gjeldendeSak.annenPart && gjeldendeSak.annenPart.fornavn ? gjeldendeSak.annenPart.fornavn : undefined;
        kjønnPåAnnenPart = gjeldendeSak.annenPart ? getKjønnFromFnr(gjeldendeSak.annenPart.fnr) : undefined;
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

    const { annenPartsVedakData, annenPartsVedtakError } = Api.useGetAnnenPartsVedtak(annenPartVedtakIsSuspended);

    useEffect(() => {
        if (annenPartsVedtakError) {
            throw new Error('Vi klarte ikke å hente opp informasjon om den andre forelderen.');
        }
    }, [annenPartsVedtakError]);

    if (!annenPartsVedakData) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader type="XXL" />
            </div>
        );
    }

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
                <Tidslinje sak={gjeldendeSak!} />
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
                        annenPartsPerioder={annenPartsVedakData.perioder}
                        kjønnPåAnnenPart={kjønnPåAnnenPart}
                        kjønnPåSøker={kjønnPåSøker}
                        navnPåAnnenPart={navnPåAnnenPart}
                        navnPåSøker={navnPåSøker}
                        vedtattUttaksplan={slåSammenLikePerioder(gjeldendeVedtak.perioder)}
                    />
                </ContentSection>
            )}

            {ubehandletSøknad && (
                <ContentSection heading={intlUtils(intl, 'saksoversikt.dinPlan')} padding="large">
                    <DinPlan
                        annenPartsPerioder={annenPartsVedakData.perioder}
                        kjønnPåAnnenPart={kjønnPåAnnenPart}
                        kjønnPåSøker={kjønnPåSøker}
                        navnPåAnnenPart={navnPåAnnenPart}
                        navnPåSøker={navnPåSøker}
                        søktePerioder={slåSammenLikePerioder(ubehandletSøknad.søknadsperioder || [])}
                    />
                </ContentSection>
            )}
        </div>
    );
};

export default Saksoversikt;
