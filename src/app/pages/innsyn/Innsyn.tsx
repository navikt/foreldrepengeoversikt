import * as React from 'react';
import Sak from '../../types/Sak';
import Saksoversikt from '../../components/saksoversikt/Saksoversikt';

import './innsyn.less';
import Header from '../../components/header/Header';
import { History } from 'history';
import BEMHelper from '../../../common/util/bem';

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
        console.log('not implemented yet');
    }

    render() {
        const cls = BEMHelper('innsyn');
        return (
            <>
                <Header />
                <div className={cls.className}>
                    <ul className={cls.element('saksoversiktList')}>
                        {this.props.saker.map((sak: Sak) => (
                            <li key={sak.saksnummer}>
                                <Saksoversikt
                                    sak={sak}
                                    onEttersendVedlegg={this.onEttersendVedlegg}
                                    onEndreSøknad={this.onEndreSøknad}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }
}
export default Innsyn;
