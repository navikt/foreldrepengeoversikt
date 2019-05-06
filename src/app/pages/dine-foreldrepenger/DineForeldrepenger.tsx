import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';
import { History } from 'history';
import AlertStripe from 'nav-frontend-alertstriper';
import moment from 'moment';

import Sak from '../../types/Sak';
import EkspanderbarSaksoversikt from '../../components/ekspanderbar-saksoversikt/EkspanderbarSaksoversikt';
import Header from '../../components/header/Header';
import BEMHelper from '../../../common/util/bem';
import RelatertInformasjon from 'app/components/relatert-informasjon/RelatertInformasjon';
import IngenSaker from 'app/components/ingen-saker/IngenSaker';
import {
    erForeldrepengesak,
    erInfotrygdSak,
    erUnderBehandling,
    opprettSak,
    skalKunneSøkeOmEndring
} from '../../utils/sakerUtils';
import Sidepanel from '../../components/sidepanel/Sidepanel';
import Saksoversikt from '../../components/saksoversikt/Saksoversikt';

import Person from '../../types/Personinfo';
import { StorageKvittering } from '../../types/StorageKvittering';
import Behandling from 'app/types/Behandling';
import { State } from 'app/redux/store';
import { getData } from 'app/redux/util/fetchFromState';

import './dineForeldrepenger.less';

interface Props {
    saker: Sak[];
    storageKvittering?: StorageKvittering;
    personinfo?: Person;
    history: History;
}

export class DineForeldrepenger extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    shouldRenderStorageKvitteringAsSak(): boolean {
        const { saker, storageKvittering } = this.props;
        if (storageKvittering === undefined || storageKvittering.innsendingstidspunkt === undefined) {
            return false;
        }

        if (saker.length === 0) {
            return true;
        }

        if (erInfotrygdSak(saker[0])) {
            return saker.every((sak: Sak) => moment(sak.opprettet).isBefore(storageKvittering.innsendingstidspunkt));
        }

        return (
            saker.every((sak: Sak) => moment(sak.opprettet).isBefore(storageKvittering.innsendingstidspunkt)) &&
            saker[0].behandlinger !== undefined &&
            saker[0].behandlinger.every((b: Behandling) =>
                moment(b.endretTidspunkt).isBefore(storageKvittering.innsendingstidspunkt, 'days')
            )
        );
    }

    shouldRenderAlertStripe(nyesteSak: Sak): boolean {
        return erUnderBehandling(nyesteSak) || erInfotrygdSak(nyesteSak);
    }

    renderSaksoversiktList(nyesteSak: Sak) {
        const { saker, history } = this.props;
        if (!saker) {
            return null;
        }

        const cls = BEMHelper('saksoversikt-list');
        return (
            <ul className={cls.className}>
                {saker
                    .filter((s: Sak) => s.saksnummer !== nyesteSak.saksnummer)
                    .map((sak: Sak) => {
                        return (
                            <li className={cls.element('element')} key={sak.saksnummer}>
                                <EkspanderbarSaksoversikt person={this.props.personinfo} sak={sak} history={history} />
                            </li>
                        );
                    })}
            </ul>
        );
    }

    renderSidepanel(sak?: Sak) {
        const cls = BEMHelper('sak-info-panel');
        return (
            <div className={cls.className}>
                <Sidepanel sak={sak} />
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




        const { saker, history, storageKvittering, personinfo } = this.props;
        const nyesteSak: Sak | undefined = this.shouldRenderStorageKvitteringAsSak()
            ? opprettSak(storageKvittering!)
            : saker.slice().shift();

        const cls = BEMHelper('dine-foreldrepenger');
        return (
            <>
                <Header history={this.props.history} />
                <div className={cls.className}>
                    <div className={cls.element('main-content')}>
                        {nyesteSak === undefined && <IngenSaker />}
                        {nyesteSak && this.shouldRenderAlertStripe(nyesteSak) && this.renderAlertStripe(nyesteSak)}
                        {nyesteSak && (
                            <>
                                <Saksoversikt
                                    sak={nyesteSak}
                                    person={personinfo}
                                    history={history}
                                    skalKunneSøkeOmEndring={skalKunneSøkeOmEndring(nyesteSak)}
                                    withHeader={true}
                                />
                                {this.renderSaksoversiktList(nyesteSak)}
                            </>
                        )}

                        <MediaQuery maxWidth={1114}>{this.renderSidepanel(nyesteSak)}</MediaQuery>
                        <RelatertInformasjon />
                    </div>

                    <MediaQuery minWidth={1115}>
                        <div className={cls.element('sidepanel-desktop')}>{this.renderSidepanel(nyesteSak)}</div>
                    </MediaQuery>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    personinfo: getData(state.api.personinfo, undefined),
    saker: getData(state.api.saker, []),
    storageKvittering: getData(state.api.storageKvittering, undefined)
});

export default connect(mapStateToProps)(DineForeldrepenger);
