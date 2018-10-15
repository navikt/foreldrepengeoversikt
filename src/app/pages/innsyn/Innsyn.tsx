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
import ApplicationSpinner from '../../components/application-spinner/ApplicationSpinner';

interface Props {
    saker: Sak[];
    history: History;
    loading: boolean;
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
        const { saker, loading } = this.props;
        return (
            <>
                <Header />
                <div className={'innsyn'}>
                    <ResponsiveWrapper>
                        {loading && <ApplicationSpinner />}
                        {!loading &&
                            (saker === undefined || saker.length === 0) && (
                                <div className={'innsyn__ingenSaker'}>
                                    <Systemtittel>Vi fant ingen saker</Systemtittel>
                                </div>
                            )}
                        {saker !== undefined && (
                            <ul className={cls.className}>
                                {saker.map((sak: Sak) => (
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
