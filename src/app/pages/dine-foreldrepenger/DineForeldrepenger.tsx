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

import IngenSaker from 'app/components/ingen-saker/IngenSaker';
import { datesByDescendingOrder, skalKunneSøkeOmEndring } from '../../utils/sakerUtils';

import './dineForeldrepenger.less';

interface Props {
    saker: Sak[];
    history: History;
    error?: AxiosError | any;
}

class DineForeldrepenger extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    renderSaksoversiktList() {
        const { saker, history } = this.props;
        if (!saker) {
            return null;
        }

        const cls = BEMHelper('saksoversikt-list');
        return (
            <ul className={cls.className}>
                {saker.sort(datesByDescendingOrder).map((sak: Sak, index: number) => (
                    <li className={cls.element('element')} key={sak.saksnummer}>
                        <Saksoversikt
                            sak={sak}
                            skalKunneSøkeOmEndring={index === 0 && skalKunneSøkeOmEndring(sak)}
                            history={history}
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
                        {saker !== undefined &&
                            saker.length > 0 && (
                                <AlertStripe className={cls.element('info')} type={'info'}>
                                    <FormattedMessage id={'dineForeldrepenger.alertstripe'} />
                                </AlertStripe>
                            )}

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
