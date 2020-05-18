import React from 'react';
import { History } from 'history';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import {
    erInfotrygdSak,
    erSvangerskapepengesak,
    erForeldrepengesak,
    harEnAvsluttetBehandling,
    skalKunneSøkeOmEndring
} from 'app/utils/sakerUtils';
import MeldingOmVedtakLenkepanel from '../melding-om-vedtak-lenkepanel/MeldingOmVedtakLenkepanel';
import { Knapp } from 'nav-frontend-knapper';
import { isSakEligableForEttersendelse, isSakTooOldForEttersendelse } from '../saksoversikt/utils';
import { FormattedMessage } from 'react-intl';
import { guid } from 'nav-frontend-js-utils';
import { isFeatureEnabled, Feature } from 'app/Feature';
import SectionSeparator from '../section-separator/SectionSeparator';
import { Routes } from 'app/utils/routes';
import PeriodeOversikt from '../periode-oversikt/PeriodeOversikt';
import { finnNåværendePerioder, skalVisesIPeriodeListe, finnFremtidigePerioder } from '../../utils/periodeUtils';
import Oversikt from '../oversikt/Oversikt';
import { utledHendelser } from '../historikk/util';
import SakBase from 'app/api/types/sak/Sak';
import BEMHelper from 'common/util/bem';
import { lenker } from 'app/utils/lenker';
import { Innsendingsinnslag, HendelseType, HistorikkInnslagType, HistorikkInnslag, InntektsmeldingInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { redirect } from 'app/utils/redirect';
// import Behandlingsfrist from '../behandlingsfrist/Behandlingsfrist';
// import { harAktivtArbeidsforhold } from 'app/utils/søkerinfoUtils';
import { Søkerinfo } from 'app/types/Søkerinfo';
import UtsettelsePanel from '../utsettelse-panel/UtsettelsePanel';
import moment from 'moment';
import MidlertidigInfo from './MidlertidigInfo';

import './saksinformasjonPanel.less';
import Søknadsoversikt from '../søknadsoversikt/Søknadsoversikt';
import { FagsakStatus } from 'app/api/types/sak/FagsakStatus';
import { ManglendeVedlegg } from 'app/api/types/sak/ManglendeVedlegg';

interface Props {
    søkerinfo?: Søkerinfo;
    sak: SakBase;
    history: History;
    historikkInnslagListe: HistorikkInnslag[];
    manglendeVedlegg: ManglendeVedlegg[];
}

const SaksinformasjonPanel: React.StatelessComponent<Props> = ({ søkerinfo, sak, history, historikkInnslagListe, manglendeVedlegg }) => {
    const erSakForeldrepengesak = erForeldrepengesak(sak);
    const { perioder, status } = sak;
    const initiellForeldrepengesøknadHendelse = historikkInnslagListe
        .filter(({ saksnr }) => sak.saksnummer === saksnr)
        .sort((a, b) => (moment(a.opprettet).isSameOrBefore(moment(b.opprettet)) ? 1 : -1))
        .find((innslag: Innsendingsinnslag) => innslag.type === HistorikkInnslagType.søknad && innslag.hendelse === HendelseType.INITIELL_FORELDREPENGER) as Innsendingsinnslag;
    const tidligesteBehandlingsdato =
        perioder && perioder.length > 0 ? moment(perioder[0].tidsperiode.fom).subtract(4, 'weeks') : initiellForeldrepengesøknadHendelse?.behandlingsdato;
    const opprettetDato = initiellForeldrepengesøknadHendelse
        ? initiellForeldrepengesøknadHendelse.opprettet
        : undefined;
    const behandlingsdato = moment(opprettetDato).isSameOrAfter(moment(tidligesteBehandlingsdato))
        ? moment(opprettetDato)
        : tidligesteBehandlingsdato;
    const inntektsmeldinger = historikkInnslagListe.filter(h => h.type === HistorikkInnslagType.inntekt) as InntektsmeldingInnslag[];
    const sakErFerdigBehandlet = status !== undefined && (status === FagsakStatus.LOPENDE || status === FagsakStatus.AVSLUTTET);

    const cls = BEMHelper('saksinformasjon-panel');
    return (
        <div>
            {/* {søkerinfo &&
                behandlingsdato &&
                !harEnAvsluttetBehandling(sak) &&
                !erInfotrygdSak(sak) &&
                erForeldrepengesak(sak) && (
                    <Behandlingsfrist
                        harLøpendeArbeidsforhold={harAktivtArbeidsforhold(søkerinfo.arbeidsforhold)}
                        behandlingsdato={moment(behandlingsdato).format('YYYY-MM-DD')}
                    />
                )} */}

            {tidligesteBehandlingsdato === undefined &&
                initiellForeldrepengesøknadHendelse !== undefined &&
                erInfotrygdSak(sak) &&
                !harEnAvsluttetBehandling(sak) && (
                    <MidlertidigInfo erArbeidstaker={søkerinfo !== undefined && søkerinfo.arbeidsforhold.length > 0} />
                )}

            {erInfotrygdSak(sak) && (
                <>
                    <MeldingOmVedtakLenkepanel />
                    <div className="blokk-xs">
                        <UtsettelsePanel />
                    </div>
                </>
            )}

            <div className={cls.element('valg')}>
                <div className={cls.element('btn')}>
                    <Knapp
                        className={cls.element('ettersendelse-btn')}
                        onClick={() =>
                            history.push({
                                pathname: Routes.ETTERSENDELSE,
                                search: new URLSearchParams({ saksnummer: sak.saksnummer! }).toString()
                            })
                        }
                        disabled={!isSakEligableForEttersendelse(sak)}>
                        <FormattedMessage id="saksoversikt.content.ettersendelse.button" />
                    </Knapp>

                    {!isSakEligableForEttersendelse(sak) && (
                        <Hjelpetekst id={guid()}>
                            <FormattedMessage
                                id={
                                    isSakTooOldForEttersendelse(sak)
                                        ? 'saksoversikt.ettersendelse.hjelpetekst.utløptFrist'
                                        : 'saksoversikt.ettersendelse.hjelpetekst.ikkeJournalført'
                                }
                            />
                        </Hjelpetekst>
                    )}
                </div>

                {(erSakForeldrepengesak || erSvangerskapepengesak(sak)) && (
                    <div className={cls.element('btn')}>
                        <Knapp
                            onClick={() =>
                                erForeldrepengesak(sak)
                                    ? redirect(lenker.endringssøknad)
                                    : redirect(lenker.svangerskapspengesøknad)
                            }>
                            <FormattedMessage
                                id={
                                    erSakForeldrepengesak
                                        ? 'saksoversikt.content.endringssøknad.button'
                                        : 'saksoversikt.content.endringssøknad.button.svp'
                                }
                                values={{ erEndringssøknad: skalKunneSøkeOmEndring(sak) }}
                            />
                        </Knapp>
                    </div>
                )}
            </div>

            {erSakForeldrepengesak
                && !sakErFerdigBehandlet
                && initiellForeldrepengesøknadHendelse !== undefined
                && !erInfotrygdSak(sak)
                && isFeatureEnabled(Feature.saksoversikt) &&
                <Søknadsoversikt
                    søknadsDato={sak.opprettet}
                    behandlingsdato={moment(behandlingsdato).format('YYYY-MM-DD')}
                    arbeidsforhold={søkerinfo?.arbeidsforhold}
                    inntektsmeldinger={inntektsmeldinger}
                    brukerHarSendtSøknad={initiellForeldrepengesøknadHendelse !== undefined}
                    manglendeVedlegg={manglendeVedlegg}
                />
            }

            {isFeatureEnabled(Feature.dinPlan) &&
                erSakForeldrepengesak &&
                sak.saksnummer &&
                perioder &&
                søkerinfo !== undefined && (
                    <SectionSeparator
                        title="Din Plan"
                        sectionLink={{
                            path: Routes.DIN_PLAN,
                            search: new URLSearchParams({ saksnummer: sak.saksnummer }).toString(),
                            text: <FormattedMessage id="saksoversikt.section.dinPlan.sectionLink" />
                        }}>
                        <PeriodeOversikt
                            nåværendePerioder={finnNåværendePerioder(perioder)
                                .filter((p) => skalVisesIPeriodeListe(p, perioder))
                                .slice(0, 1)}
                            fremtidigePerioder={finnFremtidigePerioder(perioder)
                                .filter((p) => skalVisesIPeriodeListe(p, perioder))
                                .slice(0, 1)}
                            søker={søkerinfo.person}
                            sak={sak}
                        />
                    </SectionSeparator>
                )}

            {!erInfotrygdSak(sak) && (
                <Oversikt
                    søker={søkerinfo ? søkerinfo.person : undefined}
                    hendelser={utledHendelser(sak.behandlinger, historikkInnslagListe)}
                />
            )}
        </div>
    );
};

export default SaksinformasjonPanel;
