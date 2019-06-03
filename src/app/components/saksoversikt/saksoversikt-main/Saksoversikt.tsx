import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';
import { Knapp } from 'nav-frontend-knapper';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { guid } from 'nav-frontend-js-utils';

import { isSakEligableForEttersendelse, isSakTooOldForEttersendelse } from '../utils';
import { erInfotrygdSak, erEngangsstønad } from '../../../utils/sakerUtils';
import MeldingOmVedtakLenkepanel from '../../melding-om-vedtak-lenkepanel/MeldingOmVedtakLenkepanel';
import UtsettelsePanel from '../../utsettelse-panel/UtsettelsePanel';
import Oversikt from '../../oversikt/Oversikt';
import Sak from '../../../types/Sak';
import { Routes } from '../../../utils/routes';
import { lenker } from '../../../utils/lenker';
import BEMHelper from 'common/util/bem';
import Person from '../../../types/Personinfo';
import SaksoversiktHeader from './SaksoversiktHeader';
import Etikett from '../../etikett/etikett';

import './saksoversikt.less';

interface SaksoversiktProps {
    sak: Sak;
    person?: Person;
    history: History;
    skalKunneSøkeOmEndring?: boolean;
    withHeader?: boolean;
}

class Saksoversikt extends Component<SaksoversiktProps> {
    onEttersendVedlegg(sak: Sak): void {
        this.props.history.push(Routes.ETTERSENDELSE, { sak });
    }

    onEndreSøknad(): void {
        window.location.href = lenker.endringssøknad;
    }

    render() {
        const { sak, withHeader = false } = this.props;
        const erSakEngangsstønad = erEngangsstønad(sak);

        const cls = BEMHelper('saksoversikt');
        return (
            <div className={'saksoversikt'}>
                {withHeader && <SaksoversiktHeader sak={sak} />}

                {withHeader === false && (
                    <Etikett
                        className="blokk-xs"
                        etikett={<FormattedMessage id="saksoversikt.heading.saksnummer.label" />}
                        value={sak.saksnummer}
                    />
                )}
                {erInfotrygdSak(sak) && <MeldingOmVedtakLenkepanel />}

                {!erSakEngangsstønad && (
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

                    {!erSakEngangsstønad && (
                        <div className={cls.element('btn')}>
                            <Knapp onClick={() => this.onEndreSøknad()}>
                                <FormattedMessage id="saksoversikt.content.endringssøknad.button" />
                            </Knapp>
                        </div>
                    )}
                </div>

                {!erInfotrygdSak(sak) && (
                    <Oversikt person={this.props.person} sak={sak} />
                )}
            </div>
        );
    }
}

export default Saksoversikt;
