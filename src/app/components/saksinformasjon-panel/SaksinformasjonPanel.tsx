import React from 'react';
import { History } from 'history';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { erInfotrygdSak, erSvangerskapepengesak, erForeldrepengesak } from 'app/utils/sakerUtils';
import MeldingOmVedtakLenkepanel from '../melding-om-vedtak-lenkepanel/MeldingOmVedtakLenkepanel';
import UtsettelsePanel from '../utsettelse-panel/UtsettelsePanel';
import { Knapp } from 'nav-frontend-knapper';
import { isSakEligableForEttersendelse, isSakTooOldForEttersendelse } from '../saksoversikt/utils';
import { FormattedMessage } from 'react-intl';
import { guid } from 'nav-frontend-js-utils';
import { isFeatureEnabled, Feature } from 'app/Feature';
import SectionSeparator from '../section-separator/SectionSeparator';
import { Routes } from 'app/utils/routes';
import PeriodeOversikt from '../periode-oversikt/PeriodeOversikt';
import {
    finnNåværendePerioder,
    skalVisesIPeriodeListe,
    finnFremtidigePerioder
} from '../periode-oversikt/periodeUtils';
import Oversikt from '../oversikt/Oversikt';
import { utledHendelser } from '../historikk/util';
import { hentHistorikkForSak } from 'app/utils/historikkUtils';
import Sak from 'app/api/types/sak/Sak';
import BEMHelper from 'common/util/bem';
import { lenker } from 'app/utils/lenker';
import { HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { redirect } from 'app/utils/redirect';
import Person from 'app/types/Person';

import './saksinformasjonPanel.less';

interface Props {
    søker?: Person;
    sak: Sak;
    history: History;
    historikkInnslagListe?: HistorikkInnslag[];
}

const SaksinformasjonPanel: React.StatelessComponent<Props> = ({ søker, sak, history, historikkInnslagListe }) => {
    const erSakForeldrepengesak = erForeldrepengesak(sak);
    const { perioder } = sak;
    const cls = BEMHelper('saksinformasjon-panel');
    return (
        <div>
            {erInfotrygdSak(sak) && <MeldingOmVedtakLenkepanel />}

            {erSakForeldrepengesak && (
                <div className="blokk-xs">
                    <UtsettelsePanel />
                </div>
            )}

            <div className={cls.element('valg')}>
                <div className={cls.element('btn')}>
                    <Knapp
                        className={cls.element('ettersendelse-btn')}
                        onClick={() =>
                            history.push({
                                pathname: Routes.ETTERSENDELSE,
                                search: new URLSearchParams({ saksnummer: sak.saksnummer }).toString()
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
                            />
                        </Knapp>
                    </div>
                )}
            </div>

            {isFeatureEnabled(Feature.dinPlan) &&
                erSakForeldrepengesak &&
                sak.saksnummer &&
                perioder &&
                søker !== undefined && (
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
                            søker={søker}
                            annenPart={sak.annenPart}
                        />
                    </SectionSeparator>
                )}

            {!erInfotrygdSak(sak) && (
                <Oversikt
                    søker={søker}
                    hendelser={utledHendelser(sak.behandlinger, hentHistorikkForSak(sak, historikkInnslagListe))}
                />
            )}
        </div>
    );
};

export default SaksinformasjonPanel;
