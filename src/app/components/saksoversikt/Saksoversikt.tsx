import React, { Component } from 'react';
import { History } from 'history';
import { Knapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';

import { formatDate, isSakTooOldForEttersendelse } from '../ekspanderbar-saksoversikt/util';
import { Feature, isFeatureEnabled } from '../../Feature';
import { erInfotrygdSak, behandlingByDescendingOrder } from '../../utils/sakerUtils';
import MeldingOmVedtakLenkepanel from '../melding-om-vedtak-lenkepanel/MeldingOmVedtakLenkepanel';
import UtsettelsePanel from '../utsettelse-panel/UtsettelsePanel';
import Oversikt from '../oversikt/Oversikt';
import Sak from '../../types/Sak';
import { Routes } from '../../utils/routes';
import { lenker } from '../../utils/lenker';
import BEMHelper from 'common/util/bem';
import Person from '../../types/Person';
import SaksoversiktHeader from './SaksoversiktHeader';

import './saksoversikt.less';
import { Normaltekst } from 'nav-frontend-typografi';
import Behandling from 'app/types/Behandling';

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
        const { sak, skalKunneSøkeOmEndring = false, withHeader = false } = this.props;
        const nyesteBehandling: Behandling | undefined = sak.behandlinger && sak.behandlinger.sort(behandlingByDescendingOrder)[0]

        const cls = BEMHelper('saksoversikt');
        return (
            <div className={'saksoversikt'}>
                {withHeader && <SaksoversiktHeader sak={sak} />}

                {nyesteBehandling && nyesteBehandling.endretTidspunkt && (
                    <Normaltekst className="blokk-xs">
                        <FormattedMessage
                            id="saksoversikt.heading.bottom.sistEndret"
                            values={{ date: formatDate(nyesteBehandling.endretTidspunkt) }}
                        />
                    </Normaltekst>
                )}

                <MeldingOmVedtakLenkepanel />

                <div className="blokk-xs">
                    <UtsettelsePanel />
                </div>

                <div className={cls.element('valg')}>
                    {!isSakTooOldForEttersendelse(sak.opprettet) && sak.saksnummer !== undefined && (
                        <Knapp onClick={() => this.onEttersendVedlegg(sak)}>
                            <FormattedMessage id="saksoversikt.content.ettersendelse.button" />
                        </Knapp>
                    )}
                    {skalKunneSøkeOmEndring && sak.saksnummer !== undefined && (
                        <Knapp onClick={() => this.onEndreSøknad()}>
                            <FormattedMessage id="saksoversikt.content.endringssøknad.button" />
                        </Knapp>
                    )}
                </div>

                {isFeatureEnabled(Feature.behandlingsOversikt) && !erInfotrygdSak(sak) && (
                    <Oversikt person={this.props.person} sak={sak} />
                )}
            </div>
        );
    }
}

export default Saksoversikt;
