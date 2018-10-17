import * as React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import Sak from '../../types/Sak';
import { formatDate, isSakTooOldForEndringssøknad, isSakTooOldForEttersendelse } from './util';
import BEMHelper from 'common/util/bem';
import Lenke from 'nav-frontend-lenker';
import { andreLenker } from '../../utils/lenker';

import './saksoversikt.less';
import FileIcon from '../ikoner/FileIcon';

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
                        <Undertittel>Søknad om foreldrepenger</Undertittel>
                        <Normaltekst>Dato: {formatDate(sak.opprettet)}</Normaltekst>
                    </div>
                }
                ariaTittel={'søknad om foreldrepenger'}>
                <Normaltekst className={cls.element('saksnummer')}>Saksnummer: {sak.saksnummer}</Normaltekst>
                <div className={cls.element('din-søknad')}>
                    <FileIcon />
                    <Lenke href={andreLenker.dittNav.href}>
                        <Normaltekst>Din innsendte søknad</Normaltekst>
                    </Lenke>
                </div>
                <Normaltekst className={cls.element('ettersendelse-intro')}>
                    Her kan du ettersende dokumentasjon til søknaden din
                </Normaltekst>
                <Knapp
                    className={cls.element('ettersendelse-btn')}
                    onClick={() => onEttersendVedlegg(sak)}
                    disabled={isSakTooOldForEttersendelse(sak.opprettet)}>
                    Last opp vedlegg
                </Knapp>
                <Normaltekst className={cls.element('endringssoknad-intro')}>
                    Endre din periode med foreldrepenger (legge til ferie, hvis du skal jobbe eller har vært syk)
                </Normaltekst>
                <Knapp
                    className={cls.element('endringssoknad-btn')}
                    onClick={() => onEndreSøknad(sak)}
                    disabled={isSakTooOldForEndringssøknad(sak.opprettet)}>
                    Endre perioden din
                </Knapp>
            </EkspanderbartpanelBase>
        </div>
    );
};
export default Saksoversikt;
