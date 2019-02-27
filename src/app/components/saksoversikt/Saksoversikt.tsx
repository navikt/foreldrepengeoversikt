import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { HjelpetekstAuto } from 'nav-frontend-hjelpetekst';

import BEMHelper from 'common/util/bem';
import Sak from '../../types/Sak';
import { lenker } from '../../utils/lenker';
import SaksoversiktHeader from './SaksoversiktHeader';
import { isSakTooOldForEttersendelse } from './util';
import { Routes } from '../../utils/routes';
import { Feature, isFeatureEnabled } from '../../Feature';
import Oversikt from '../oversikt/Oversikt';
import Person from '../../types/Person';
import { erInfotrygdSak } from '../../utils/sakerUtils';

import './saksoversikt.less';

interface Props {
    person?: Person;
    sak: Sak;
    skalKunneSøkeOmEndring: boolean;
    expanded: boolean;
    history: History;
}

class Saksoversikt extends React.Component<Props> {
    onEttersendVedlegg(sak: Sak): void {
        this.props.history.push(Routes.ETTERSENDELSE, { sak });
    }

    onEndreSøknad(): void {
        window.location.href = lenker.endringssøknad;
    }

    render() {
        const { sak, skalKunneSøkeOmEndring, expanded } = this.props;
        const cls = BEMHelper('saksoversikt');

        return (
            <div className={cls.className}>
                <EkspanderbartpanelBase
                    apen={expanded}
                    heading={<SaksoversiktHeader sak={sak} />}
                    ariaTittel={'søknad om foreldrepenger'}>
                    <Normaltekst className={cls.element('saksnummer')}>
                        <FormattedMessage
                            id={'saksoversikt.content.saksnummer'}
                            values={{ saksnummer: sak.saksnummer }}
                        />
                    </Normaltekst>

                    <Normaltekst className={cls.element('ettersendelse-intro')}>
                        <FormattedMessage id={'saksoversikt.content.ettersendelse.intro'} />
                    </Normaltekst>
                    <div className={cls.element('valg')}>
                        <Knapp
                            className={cls.element('ettersendelse-btn')}
                            onClick={() => this.onEttersendVedlegg(sak)}
                            disabled={isSakTooOldForEttersendelse(sak.opprettet)}>
                            <FormattedMessage id={'saksoversikt.content.ettersendelse.button'} />
                        </Knapp>
                        {isSakTooOldForEttersendelse(sak.opprettet) && (
                            <HjelpetekstAuto id={'ettersendelse-disabled-info'} tittel={''}>
                                <FormattedMessage id={'saksoversikt.ettersendelse.hjelpetekst'} />
                            </HjelpetekstAuto>
                        )}
                    </div>

                    {skalKunneSøkeOmEndring && (
                        <>
                            <Normaltekst className={cls.element('endringssoknad-intro')}>
                                <FormattedMessage id={'saksoversikt.content.endringssøknad.intro'} />
                            </Normaltekst>
                            <div className={cls.element('valg')}>
                                <Knapp
                                    className={cls.element('endringssoknad-btn')}
                                    onClick={() => this.onEndreSøknad()}>
                                    <FormattedMessage id={'saksoversikt.content.endringssøknad.button'} />
                                </Knapp>
                            </div>
                        </>
                    )}

                    {isFeatureEnabled(Feature.behandlingsOversikt) && !erInfotrygdSak(sak) && (
                        <Oversikt person={this.props.person} sak={sak} />
                    )}
                </EkspanderbartpanelBase>
            </div>
        );
    }
}

export default Saksoversikt;
