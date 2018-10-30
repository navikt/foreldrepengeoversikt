import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { Knapp } from 'nav-frontend-knapper';
import { HjelpetekstAuto } from 'nav-frontend-hjelpetekst';

import BEMHelper from 'common/util/bem';
import Sak from '../../types/Sak';
import { lenker } from '../../utils/lenker';
import FileIcon from '../ikoner/FileIcon';
import { formatDate, isSakTooOldForEndringssøknad, isSakTooOldForEttersendelse } from './util';

import './saksoversikt.less';

interface Props {
    sak: Sak;
    onEttersendVedlegg: (sak: Sak) => void;
    onEndreSøknad: (sak: Sak) => void;
}

const Saksoversikt: React.StatelessComponent<Props> = (props: Props) => {
    const { sak, onEttersendVedlegg, onEndreSøknad } = props;
    const cls = BEMHelper('saksoversikt');
    return (
        <div className={cls.className}>
            <EkspanderbartpanelBase
                heading={
                    <div>
                        <Undertittel>
                            <FormattedMessage id={'saksoversikt.heading.top'} />
                        </Undertittel>
                        <Normaltekst>
                            <FormattedMessage
                                id={'saksoversikt.heading.bottom'}
                                values={{ date: formatDate(sak.opprettet) }}
                            />
                        </Normaltekst>
                    </div>
                }
                ariaTittel={'søknad om foreldrepenger'}>
                <Normaltekst className={cls.element('saksnummer')}>
                    <FormattedMessage id={'saksoversikt.content.saksnummer'} values={{ saksnummer: sak.saksnummer }} />
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
                        onClick={() => onEttersendVedlegg(sak)}
                        disabled={isSakTooOldForEttersendelse(sak.opprettet)}>
                        <FormattedMessage id={'saksoversikt.content.ettersendelse.button'} />
                    </Knapp>
                    {isSakTooOldForEttersendelse(sak.opprettet) && (
                        <HjelpetekstAuto id={'ettersendelse-disabled-info'} tittel={''}>
                            <FormattedMessage id={'saksoversikt.ettersendelse.hjelpetekst'} />
                        </HjelpetekstAuto>
                    )}
                </div>

                <Normaltekst className={cls.element('endringssoknad-intro')}>
                    <FormattedMessage id={'saksoversikt.content.endringssøknad.intro'} />
                </Normaltekst>

                <div className={cls.element('valg')}>
                    <Knapp
                        className={cls.element('endringssoknad-btn')}
                        onClick={() => onEndreSøknad(sak)}
                        disabled={isSakTooOldForEndringssøknad(sak.opprettet)}>
                        <FormattedMessage id={'saksoversikt.content.endringssøknad.button'} />
                    </Knapp>
                    {isSakTooOldForEndringssøknad(sak.opprettet) && (
                        <HjelpetekstAuto id={'endringssøknad-disabled-info'} tittel={''}>
                            <FormattedMessage id={'saksoversikt.endringssøknad.hjelpetekst'} />
                        </HjelpetekstAuto>
                    )}
                </div>
            </EkspanderbartpanelBase>
        </div>
    );
};
export default Saksoversikt;
