import * as React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import Sak from '../../types/Sak';
import { formatDate, isSakTooOldForEttersendelse } from './util';
import BEMHelper from 'common/util/bem';

import './saksoversikt.less';

interface Props {
    sak: Sak;
    onEttersendVedlegg: (sak: Sak) => void;
    onEndreSøknad: (sak: Sak) => void;
}

class Saksoversikt extends React.Component<Props> {
    render() {
        const { sak, onEttersendVedlegg, onEndreSøknad } = this.props;
        const cls = BEMHelper('saksoversikt');
        return (
            <EkspanderbartpanelBase
                heading={
                    <div className={cls.className}>
                        <Undertittel>Søknad om foreldrepenger</Undertittel>
                        <Normaltekst>Dato: {formatDate(sak.opprettet)}</Normaltekst>
                    </div>
                }
                ariaTittel={'søknad om foreldrepenger'}>
                <Normaltekst className={cls.element('saksnummer')}>Saksnummer: {sak.saksnummer}</Normaltekst>
                <Normaltekst className={cls.element('ettersend-vedlegg')}>
                    Her kan du ettersende dokumentasjon til søknaden din
                </Normaltekst>
                <Knapp
                    className={cls.element('ettersend-vedlegg-btn')}
                    onClick={() => onEttersendVedlegg(sak)}
                    disabled={isSakTooOldForEttersendelse(sak.opprettet)}>
                    Last opp vedlegg
                </Knapp>
                <Normaltekst className={cls.element('endringssoknad')}>
                    Endre din periode med foreldrepenger (legge til ferie, hvis du skal jobbe eller har vært syk)
                </Normaltekst>
                <Knapp className={cls.element('endringssoknad-btn')} onClick={() => onEndreSøknad(sak)}>
                    Endre perioden din
                </Knapp>
            </EkspanderbartpanelBase>
        );
    }
}
export default Saksoversikt;
