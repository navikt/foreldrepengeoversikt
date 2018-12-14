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
import { erForeldrepengesak } from '../../utils/sakerUtils';
import { Routes } from '../../utils/routes';

import './saksoversikt.less';

interface Props {
    sak: Sak;
    skalKunneSøkeOmEndring: boolean;
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
        const { sak, skalKunneSøkeOmEndring } = this.props;
        const cls = BEMHelper('saksoversikt');
        return (
            <div className={cls.className}>
                <EkspanderbartpanelBase
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
                        <Lenke href={lenker.dittNav.href}>
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

                    {erForeldrepengesak(sak) && (
                        <>
                            <Normaltekst className={cls.element('endringssoknad-intro')}>
                                <FormattedMessage id={'saksoversikt.content.endringssøknad.intro'} />
                            </Normaltekst>
                            <div className={cls.element('valg')}>
                                <Knapp
                                    className={cls.element('endringssoknad-btn')}
                                    onClick={() => this.onEndreSøknad()}
                                    disabled={!skalKunneSøkeOmEndring}>
                                    <FormattedMessage id={'saksoversikt.content.endringssøknad.button'} />
                                </Knapp>
                                {!skalKunneSøkeOmEndring && (
                                    <HjelpetekstAuto id={'endringssøknad-disabled-info'} tittel={''}>
                                        <FormattedMessage id={'saksoversikt.endringssøknad.hjelpetekst'} />
                                    </HjelpetekstAuto>
                                )}
                            </div>
                        </>
                    )}
                </EkspanderbartpanelBase>
            </div>
        );
    }
}

export default Saksoversikt;
