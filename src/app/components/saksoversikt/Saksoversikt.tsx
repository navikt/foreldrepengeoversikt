import * as React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';

import Sak from '../../types/Sak';
import Block from 'common/components/block/Block';
import { isSakTooOldForEttersendelse } from './util';

import './saksoversikt.less';

interface Props {
    sak: Sak;
    onEttersendVedlegg: (sak: Sak) => void;
    onEndreSøknad: (sak: Sak) => void;
}

class Saksoversikt extends React.Component<Props> {
    renderSaksoversiktHeader(sak: Sak) {
        return (
            <div className={'saksoversiktHeader'}>
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
                <Block>
                    <Normaltekst>Saksnummer: {sak.saksnummer}</Normaltekst>
                </Block>
                <Block margin={'xs'}>
                    <Normaltekst>Her kan du ettersende dokumentasjon til søknaden din</Normaltekst>
                </Block>
                <Block>
                    <Knapp
                        onClick={() => onEttersendVedlegg(sak)}
                        disabled={isSakTooOldForEttersendelse(sak.opprettet)}>
                        Last opp vedlegg
                    </Knapp>
                </Block>
                <Block margin={'xs'}>
                    <Normaltekst>
                        Endre din periode med foreldrepenger (legge til ferie, hvis du skal jobbe eller har vært syk)
                    </Normaltekst>
                </Block>
                <Block margin={'xs'}>
                    <Knapp onClick={() => onEndreSøknad(sak)}>Endre perioden din</Knapp>
                </Block>
            </EkspanderbartpanelBase>
        );
    }
}
export default Saksoversikt;
