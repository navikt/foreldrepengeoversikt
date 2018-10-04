import * as React from 'react';
import Sak from '../../types/Sak';
import Saksoversikt from '../../components/saksoversikt/Saksoversikt';

import Header from '../../components/header/Header';
import { History } from 'history';
import BEMHelper from '../../../common/util/bem';
import { Systemtittel } from 'nav-frontend-typografi';
import './innsyn.less';
import AnnenInformasjon from '../../components/annen-informasjon/AnnenInformasjon';
import ResponsiveWrapper from '../ResponsiveWrapper';

interface Props {
    saker: Sak[];
    history: History;
}

class Innsyn extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onEttersendVedlegg = this.onEttersendVedlegg.bind(this);
        this.onEndreSøknad = this.onEndreSøknad.bind(this);
    }

    onEttersendVedlegg(sak: Sak): void {
        this.props.history.push('/ettersendelse', { sak });
    }

    // TODO
    onEndreSøknad(sak: Sak): void {
        alert('ikke implementert enda');
    }

    render() {
        const cls = BEMHelper('saksoversiktList');
        return (
            <>
                <Header />
                <div className={'innsyn'}>
                    {(this.props.saker === undefined || this.props.saker.length === 0) && (
                        <div>
                            <Systemtittel>Vi fant ingen saker</Systemtittel>
                        </div>
                    )}
                    <ResponsiveWrapper>
                        {this.props.saker !== undefined && (
                            <ul className={cls.className}>
                                {this.props.saker.map((sak: Sak) => (
                                    <li className={cls.element('element')} key={sak.saksnummer}>
                                        <Saksoversikt
                                            sak={sak}
                                            onEttersendVedlegg={this.onEttersendVedlegg}
                                            onEndreSøknad={this.onEndreSøknad}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                        <AnnenInformasjon />
                    </ResponsiveWrapper>
                </div>
            </>
        );
    }
}
export default Innsyn;
