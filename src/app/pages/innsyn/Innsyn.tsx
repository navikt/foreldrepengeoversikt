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
import { AxiosError } from 'axios';
import { lenker } from '../../utils/lenker';

interface Props {
    saker: Sak[];
    history: History;
    loading: boolean;
    error?: AxiosError | any;
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

    onEndreSøknad(sak: Sak): void {
        window.location.href = lenker.endringssøknad.href;
    }

    renderSaksoversiktList() {
        const { saker } = this.props;
        if (!saker) {
            return null;
        }

        const cls = BEMHelper('saksoversikt-list');
        return (
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
        );
    }

    render() {
        const { saker, loading, error } = this.props;
        const cls = BEMHelper('innsyn');
        return (
            <>
                <Header history={this.props.history} />
                <div className={cls.className}>
                    <ResponsiveWrapper>
                        {loading && <ApplicationSpinner />}
                        {!loading &&
                            error && (
                                <Systemtittel className={cls.element('feilmelding')}>
                                    En feil har oppstått. Prøv igjen senere.
                                </Systemtittel>
                            )}

                        {!loading &&
                            !error &&
                            ((saker === undefined || saker.length === 0) && (
                                <Systemtittel className={cls.element('ingen-saker')}>Vi fant ingen saker</Systemtittel>
                            ))}

                        {saker !== undefined && error === undefined && this.renderSaksoversiktList()}
                        <AnnenInformasjon />
                    </ResponsiveWrapper>
                </div>
            </>
        );
    }
}
export default Innsyn;
