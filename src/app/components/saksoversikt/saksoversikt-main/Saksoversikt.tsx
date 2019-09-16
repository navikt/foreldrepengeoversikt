import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';
import { Knapp } from 'nav-frontend-knapper';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { guid } from 'nav-frontend-js-utils';
import { isSakEligableForEttersendelse, isSakTooOldForEttersendelse } from '../utils';
import { erInfotrygdSak, erForeldrepengesak, erSvangerskapepengesak } from '../../../utils/sakerUtils';
import MeldingOmVedtakLenkepanel from '../../melding-om-vedtak-lenkepanel/MeldingOmVedtakLenkepanel';
import UtsettelsePanel from '../../utsettelse-panel/UtsettelsePanel';
import Oversikt from '../../oversikt/Oversikt';
import Sak from '../../../api/types/sak/Sak';
import { Routes } from '../../../utils/routes';
import { lenker } from '../../../utils/lenker';
import BEMHelper from 'common/util/bem';
import Person from '../../../api/types/personinfo/Personinfo';
import SaksoversiktHeader from './SaksoversiktHeader';
import Etikett from '../../etikett/etikett';
import { isFeatureEnabled, Feature } from 'app/Feature';
import { utledHendelser } from 'app/components/historikk/util';
import { hentHistorikkForSak } from 'app/utils/historikkUtils';
import { HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';

import './saksoversikt.less';
import SectionSeparator from 'app/components/section-separator/SectionSeparator';
import PeriodeOversikt from 'app/components/periode-oversikt/PeriodeOversikt';

interface SaksoversiktProps {
    sak: Sak;
    søker?: Person;
    historikkInnslagListe?: HistorikkInnslag[];
    history: History;
    skalKunneSøkeOmEndring?: boolean;
    withHeader?: boolean;
}

class Saksoversikt extends Component<SaksoversiktProps> {
    onEttersendVedlegg(sak: Sak): void {
        this.props.history.push(Routes.ETTERSENDELSE, { sak });
    }

    onEndreSøknad(): void {
        window.location.href = erForeldrepengesak(this.props.sak)
            ? lenker.endringssøknad
            : lenker.svangerskapspengesøknad;
    }

    render() {
        const { sak, historikkInnslagListe, withHeader = false, søker } = this.props;
        const erSakForeldrepengesak = erForeldrepengesak(sak);

        const cls = BEMHelper('saksoversikt');
        return (
            <div className={'saksoversikt'}>
                {withHeader ? (
                    <SaksoversiktHeader sak={sak} />
                ) : (
                    <Etikett
                        className="blokk-xs"
                        etikett={<FormattedMessage id="saksoversikt.heading.saksnummer.label" />}
                        value={sak.saksnummer}
                    />
                )}

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
                            onClick={() => this.onEttersendVedlegg(sak)}
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
                            <Knapp onClick={() => this.onEndreSøknad()}>
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
                    sak.perioder &&
                    søker !== undefined &&
                    sak.saksnummer && (
                        <SectionSeparator
                            title="Din Plan"
                            sectionLink={{
                                path: Routes.DIN_PLAN,
                                search: new URLSearchParams({ saksnummer: sak.saksnummer }).toString(),
                                text: <FormattedMessage id="saksoversikt.section.dinPlan.sectionLink" />
                            }}>
                            <PeriodeOversikt perioder={sak.perioder} søker={søker} annenPart={sak.annenPart} />
                        </SectionSeparator>
                    )}

                {!erInfotrygdSak(sak) && (
                    <Oversikt
                        person={this.props.søker}
                        hendelser={utledHendelser(sak.behandlinger, hentHistorikkForSak(sak, historikkInnslagListe))}
                    />
                )}
            </div>
        );
    }
}

export default Saksoversikt;
