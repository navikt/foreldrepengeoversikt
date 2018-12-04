import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';
import { AxiosError } from 'axios';
import AlertStripe from 'nav-frontend-alertstriper';
import { Systemtittel } from 'nav-frontend-typografi';

import Sak from '../../types/Sak';
import Saksoversikt from '../../components/saksoversikt/Saksoversikt';

import Header from '../../components/header/Header';
import BEMHelper from '../../../common/util/bem';
import AnnenInformasjon from '../../components/annen-informasjon/AnnenInformasjon';
import ResponsiveWrapper from '../ResponsiveWrapper';
import { lenker } from '../../utils/lenker';

import './dineForeldrepenger.less';
import IngenSaker from 'app/components/ingen-saker/IngenSaker';

interface Props {
    saker: Sak[];
    history: History;
    error?: AxiosError | any;
}

class DineForeldrepenger extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onEttersendVedlegg = this.onEttersendVedlegg.bind(this);
        this.onEndreSøknad = this.onEndreSøknad.bind(this);
    }

    onEttersendVedlegg(sak: Sak): void {
        this.props.history.push('/ettersendelse', { sak });
    }

    onEndreSøknad(): void {
        window.location.href = lenker.endringssøknad;
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
        const { saker, error } = this.props;
        const cls = BEMHelper('dine-foreldrepenger');
        return (
            <>
                <Header history={this.props.history} />
                <div className={cls.className}>
                    <ResponsiveWrapper>
                        <AlertStripe className={cls.element('info')} type={'info'}>
                            <FormattedMessage id={'dineForeldrepenger.alertstripe'} />
                        </AlertStripe>

                        {error && (
                            <Systemtittel className={cls.element('feilmelding')}>
                                <FormattedMessage id={'dineForeldrepenger.feilmelding'} />
                            </Systemtittel>
                        )}

                        {!error && ((saker === undefined || saker.length === 0) && <IngenSaker />)}

                        {saker !== undefined && error === undefined && this.renderSaksoversiktList()}

                        <AnnenInformasjon />
                    </ResponsiveWrapper>
                </div>
            </>
        );
    }
}
export default DineForeldrepenger;
