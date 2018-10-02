import * as React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Sak from '../../types/Sak';
import { Knapp } from 'nav-frontend-knapper';

import './saksoversikt.less';

interface Props {
    sak: Sak;
    onEttersendVedlegg: (sak: Sak) => void;
    onEndreSøknad: (sak: Sak) => void;
}

class Saksoversikt extends React.Component<Props> {
    renderSaksoversiktHeader(sak: Sak) {
        return (
            <div className={'saksoversikt__header'}>
                <Undertittel>Søknad om foreldrepenger</Undertittel>
                <Normaltekst>Dato: {sak.opprettet}</Normaltekst>
            </div>
        );
    }

    render() {
        const { sak, onEttersendVedlegg, onEndreSøknad } = this.props;
        return (
            <EkspanderbartpanelBase
                heading={this.renderSaksoversiktHeader(sak)}
                ariaTittel={'søknad om foreldrepenger'}>
                <Normaltekst>Saksnummer: {sak.saksnummer}</Normaltekst>
                <Normaltekst>Her kan du ettersende dokumentasjon til søknaden din</Normaltekst>
                <Knapp onClick={() => onEttersendVedlegg(sak)}>Last opp vedlegg</Knapp>{' '}
                <Normaltekst>
                    Endre din periode med foreldrepenger (legge til ferie, hvis du skal jobbe eller har vært syk)
                </Normaltekst>
                <Knapp onClick={() => onEndreSøknad(sak)}>Endre perioden din</Knapp>
            </EkspanderbartpanelBase>
        );
    }
}
export default Saksoversikt;
