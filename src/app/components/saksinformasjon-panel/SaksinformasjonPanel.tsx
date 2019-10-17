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
import {
    finnNåværendePerioder,
    skalVisesIPeriodeListe,
    finnFremtidigePerioder
} from '../periode-oversikt/periodeUtils';
import Oversikt from '../oversikt/Oversikt';
import { utledHendelser } from '../historikk/util';
import Sak from 'app/api/types/sak/Sak';
import BEMHelper from 'common/util/bem';
import { lenker } from 'app/utils/lenker';
import { HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import { redirect } from 'app/utils/redirect';
import Behandligsfrist from '../behandligsfrist/Behandligsfrist';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Hendelse } from 'app/api/types/historikk/Hendelse';
import { harAktivtArbeidsforhold } from 'app/utils/søkerinfoUtils';

import './saksinformasjonPanel.less';

interface Props {
    søkerinfo?: Søkerinfo;
    sak: Sak;
    history: History;
    historikkInnslagListe: HistorikkInnslag[];
}

const SaksinformasjonPanel: React.StatelessComponent<Props> = ({ søkerinfo, sak, history, historikkInnslagListe }) => {
    const erSakForeldrepengesak = erForeldrepengesak(sak);
    const { perioder } = sak;
    const initiellForeldrepengesøknadHendelse = historikkInnslagListe.find(
        ({ hendelse }) => hendelse === Hendelse.InitiellForeldrepenger
    );

    const cls = BEMHelper('saksinformasjon-panel');
    return (
        <div>
            {søkerinfo &&
                initiellForeldrepengesøknadHendelse &&
                initiellForeldrepengesøknadHendelse.behandlingsdato &&
                !harEnAvsluttetBehandling(sak) && (
                    <Behandligsfrist
                        harLøpendeArbeidsforhold={harAktivtArbeidsforhold(søkerinfo.arbeidsforhold)}
                        behandligsdato={initiellForeldrepengesøknadHendelse.behandlingsdato}
                    />
                )}

            {erInfotrygdSak(sak) && <MeldingOmVedtakLenkepanel />}

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
                                values={{ erEndringssøknad: skalKunneSøkeOmEndring(sak) }}
                            />
                        </Knapp>
                    </div>
                )}
            </div>

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
                            annenPart={sak.annenPart}
                        />
                    </SectionSeparator>
                )}

            {!erInfotrygdSak(sak) && (
                <Oversikt
                    søker={søkerinfo ? søkerinfo.person : undefined}
                    hendelser={utledHendelser(sak.behandlinger, undefined)}
                />
            )}
        </div>
    );
};

export default SaksinformasjonPanel;
