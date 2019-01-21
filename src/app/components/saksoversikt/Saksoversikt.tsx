import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { Knapp } from 'nav-frontend-knapper';
import { HjelpetekstAuto } from 'nav-frontend-hjelpetekst';

import BEMHelper from 'common/util/bem';
import Sak from '../../types/Sak';
import { lenker } from '../../utils/lenker';
import FileIcon from '../ikoner/FileIcon';
import SaksoversiktHeader from './SaksoversiktHeader';
import { isSakTooOldForEttersendelse } from './util';
import { Routes } from '../../utils/routes';
import { Feature, isFeatureEnabled } from '../../Feature';
import Behandling from '../../types/Behandling';
import { behandlingByDescendingOrder } from '../../utils/sakerUtils';
import { guid } from 'nav-frontend-js-utils';

import './saksoversikt.less';

interface Props {
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

                    <div className={cls.element('din-søknad')}>
                        <FileIcon />
                        <Lenke href={lenker.dittNav}>
                            <Normaltekst>
                                <FormattedMessage id={'saksoversikt.content.dinSøknad'} />
                            </Normaltekst>
                        </Lenke>
                    </div>

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

                    {isFeatureEnabled(Feature.behandlingsOversikt) && sak.behandlinger && (
                        <ol>
                            {sak.behandlinger.sort(behandlingByDescendingOrder).map((b: Behandling) => (
                                <li key={guid()}>
                                    <Normaltekst>opprettetTidspunkt: {b.opprettetTidspunkt}</Normaltekst>
                                    <Normaltekst>endretTidspunkt: {b.endretTidspunkt}</Normaltekst>
                                    <Normaltekst>årsak: {b.årsak}</Normaltekst>
                                    <Normaltekst>tema: {b.tema}</Normaltekst>
                                    <Normaltekst>status: {b.status}</Normaltekst>
                                    <Normaltekst>behandlingResultatType: {b.behandlingResultatType}</Normaltekst>
                                    <Normaltekst>inntektsmeldinger: {b.inntektsmeldinger}</Normaltekst>
                                </li>
                            ))}
                        </ol>
                    )}
                </EkspanderbartpanelBase>
            </div>
        );
    }
}

export default Saksoversikt;
