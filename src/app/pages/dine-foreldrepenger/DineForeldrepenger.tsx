import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';
import { History } from 'history';
import { AxiosError } from 'axios';
import AlertStripe from 'nav-frontend-alertstriper';

import Sak from '../../types/Sak';
import EkspanderbarSaksoversikt from '../../components/ekspanderbar-saksoversikt/EkspanderbarSaksoversikt';
import Header from '../../components/header/Header';
import BEMHelper from '../../../common/util/bem';
import AnnenInformasjon from '../../components/annen-informasjon/AnnenInformasjon';
import IngenSaker from 'app/components/ingen-saker/IngenSaker';
import {
    erEngangsstønad,
    erForeldrepengesak,
    erInfotrygdSak,
    erUnderBehandling,
    opprettSak,
    skalKunneSøkeOmEndring
} from '../../utils/sakerUtils';
import { Routes } from '../../utils/routes';
import Sidepanel from '../../components/sidepanel/Sidepanel';
import Saksoversikt from '../../components/saksoversikt/Saksoversikt';

import Person from '../../types/Person';
import { StorageKvittering } from '../../types/StorageKvittering';
import moment from 'moment';

import './dineForeldrepenger.less';

interface Props {
    person?: Person;
    saker: Sak[];
    storageKvittering?: StorageKvittering;
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

    shouldRenderAlertStripe(nyesteSak: Sak): boolean {
        return erUnderBehandling(nyesteSak) || erInfotrygdSak(nyesteSak);
    }

    renderSaksoversiktList() {
        const { saker, history } = this.props;
        if (!saker) {
            return null;
        }

        const cls = BEMHelper('saksoversikt-list');
        return (
            <ul className={cls.className}>
                {saker.map((sak: Sak) => (
                    <li className={cls.element('element')} key={sak.saksnummer}>
                        <EkspanderbarSaksoversikt person={this.props.person} sak={sak} history={history} />
                    </li>
                ))}
            </ul>
        );
    }

    renderSidepanel() {
        const cls = BEMHelper('sak-info-panel');
        return (
            <div className={cls.className}>
                <Sidepanel erNyesteSakEngangssønad={erEngangsstønad(this.props.saker[0])} />
            </div>
        );
    }

    renderAlertStripe(sak: Sak) {
        return (
            <AlertStripe type="info">
                <FormattedMessage
                    id={
                        erForeldrepengesak(sak)
                            ? 'dineForeldrepenger.alertstripe.fpsak'
                            : 'dineForeldrepenger.alertstripe.infotrygd'
                    }
                />
            </AlertStripe>
        );
    }

    render() {
        const { saker, history, storageKvittering, error } = this.props;

        const nyesteSak: Sak | undefined =
            storageKvittering && storageKvittering.innsendingstidspunkt &&
            saker.every((sak: Sak) => moment(sak.opprettet).isBefore(storageKvittering.innsendingstidspunkt))
                ? opprettSak(storageKvittering)
                : saker.shift();

        const cls = BEMHelper('dine-foreldrepenger');
        return (
            <>
                <Header history={this.props.history} />
                <div className={cls.className}>
                    <div className={cls.element('main-content')}>
                        {!error && nyesteSak === undefined && <IngenSaker />}

                        {nyesteSak && this.shouldRenderAlertStripe(nyesteSak) && this.renderAlertStripe(nyesteSak)}
                        {nyesteSak && error === undefined && (
                            <>
                                <Saksoversikt
                                    sak={nyesteSak}
                                    history={history}
                                    skalKunneSøkeOmEndring={skalKunneSøkeOmEndring(nyesteSak)}
                                    withHeader={true}
                                />
                                {this.renderSaksoversiktList()}
                            </>
                        )}

                        <MediaQuery maxWidth={1114}>{this.renderSidepanel()}</MediaQuery>
                        <AnnenInformasjon />
                    </div>

                    <MediaQuery minWidth={1115}>
                        <div className={cls.element('sidepanel-desktop')}>{this.renderSidepanel()}</div>
                    </MediaQuery>
                </div>
            </>
        );
    }
}
export default DineForeldrepenger;
