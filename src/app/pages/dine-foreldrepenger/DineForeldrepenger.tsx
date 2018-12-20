import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';

import { History } from 'history';
import { AxiosError } from 'axios';
import AlertStripe from 'nav-frontend-alertstriper';

import Sak from '../../types/Sak';
import Saksoversikt from '../../components/saksoversikt/Saksoversikt';

import Header from '../../components/header/Header';
import BEMHelper from '../../../common/util/bem';
import AnnenInformasjon from '../../components/annen-informasjon/AnnenInformasjon';

import IngenSaker from 'app/components/ingen-saker/IngenSaker';
import {
    datesByDescendingOrder,
    erForeldrepengesak,
    erInfotrygdSak,
    erUnderBehandling,
    skalKunneSøkeOmEndring
} from '../../utils/sakerUtils';

import InfoPanel from '../../components/info-panel/InfoPanel';
import ChatBubble from '../../components/chat-bubble/ChatBubble';
import DineUtbetalinger from '../../components/dine-utbetalinger/DineUtbetalinger';

import './dineForeldrepenger.less';
import { Routes } from '../../utils/routes';

interface Props {
    saker: Sak[];
    history: History;
    error?: AxiosError | any;
}

class DineForeldrepenger extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        if (props.error) {
            this.props.history.push(Routes.FEIL, { error: true });
        }
    }

    shouldRenderAlertStripe(saker?: Sak[]): boolean {
        return saker !== undefined && saker.length > 0 && (erUnderBehandling(saker[0]) || erInfotrygdSak(saker[0]));
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
                            expanded={index === 0}
                            history={history}
                        />
                    </li>
                ))}
            </ul>
        );
    }

    renderInfoPanel() {
        const cls = BEMHelper('sak-info-panel');
        return (
            <div className={cls.className}>
                <InfoPanel />
            </div>
        );
    }

    renderChatBubblePanel() {
        const cls = BEMHelper('chat-bubble-link');
        return (
            <div className={cls.className}>
                <ChatBubble />
            </div>
        );
    }

    renderDineUtbetalingerPanel() {
        const cls = BEMHelper('dine-utbetalinger-wrapper');
        return (
            <div className={cls.className}>
                <DineUtbetalinger />
            </div>
        );
    }

    render() {
        const { saker, error } = this.props;
        const cls = BEMHelper('dine-foreldrepenger');
        return (
            <>
                <Header history={this.props.history} />
                <div className={cls.className}>
                    {this.shouldRenderAlertStripe(saker) && (
                        <AlertStripe className={cls.element('alertstipe')} type={'info'}>
                            <FormattedMessage
                                id={
                                    erForeldrepengesak(saker[0])
                                        ? 'dineForeldrepenger.alertstripe.fpsak'
                                        : 'dineForeldrepenger.alertstripe.infotrygd'
                                }
                            />
                        </AlertStripe>
                    )}
                    <div className={cls.element('content')}>
                        {!error && ((saker === undefined || saker.length === 0) && <IngenSaker />)}
                        {saker !== undefined && error === undefined && this.renderSaksoversiktList()}

                        <MediaQuery maxWidth={1114}>{this.renderInfoPanel()}</MediaQuery>
                        {saker !== undefined && saker.length > 0 && this.renderDineUtbetalingerPanel()}
                        <MediaQuery maxWidth={1114}>{this.renderChatBubblePanel()}</MediaQuery>

                        <AnnenInformasjon />
                    </div>

                    <MediaQuery minWidth={1115}>
                        <div className={cls.element('side-bar')}>
                            {saker !== undefined && saker.length > 0 && this.renderInfoPanel()}
                            {this.renderChatBubblePanel()}
                        </div>
                    </MediaQuery>
                </div>
            </>
        );
    }
}
export default DineForeldrepenger;
