import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedHTMLMessage } from 'react-intl';
import MediaQuery from 'react-responsive';
import { History } from 'history';
import AlertStripe from 'nav-frontend-alertstriper';
import moment from 'moment';

import Sak from '../../api/types/sak/Sak';
import EkspanderbarSaksoversikt from '../../components/saksoversikt/saksoversikt-ekspanderbar/EkspanderbarSaksoversikt';
import Header from '../../components/header/Header';
import BEMHelper from '../../../common/util/bem';
import RelatertInformasjon from 'app/components/relatert-informasjon/RelatertInformasjon';
import IngenSaker from 'app/components/ingen-saker/IngenSaker';
import { erForeldrepengesak, erInfotrygdSak, opprettSak, skalKunneSøkeOmEndring } from '../../utils/sakerUtils';
import Sidepanel from '../../components/sidepanel/Sidepanel';
import Saksoversikt from '../../components/saksoversikt/saksoversikt-main/Saksoversikt';

import Person from '../../api/types/personinfo/Personinfo';
import { StorageKvittering } from '../../api/types/StorageKvittering';
import Behandling from 'app/api/types/sak/Behandling';
import { State } from 'app/redux/store';
import { getData } from 'app/redux/util/fetchFromState';
import { HistorikkInnslag } from 'app/api/types/historikk/HistorikkInnslag';

import './dineForeldrepenger.less';

interface Props {
    saker: Sak[];
    storageKvittering?: StorageKvittering;
    søker?: Person;
    history: History;
    historikkInnslagListe?: HistorikkInnslag[];
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
        return !skalKunneSøkeOmEndring(nyesteSak) || erInfotrygdSak(nyesteSak);
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
                                <EkspanderbarSaksoversikt søker={this.props.søker} sak={sak} history={history} />
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
                <FormattedHTMLMessage
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
        const { saker, history, storageKvittering, søker, historikkInnslagListe } = this.props;
        const nyesteSak: Sak | undefined = this.shouldRenderStorageKvitteringAsSak()
            ? opprettSak(storageKvittering!)
            : saker.slice().shift();

        const cls = BEMHelper('dine-foreldrepenger');
        return (
            <>
                <Header saker={saker} history={this.props.history} />
                <div className={cls.className}>
                    <div className={cls.element('main-content')}>
                        {nyesteSak === undefined && <IngenSaker />}
                        {nyesteSak && this.shouldRenderAlertStripe(nyesteSak) && this.renderAlertStripe(nyesteSak)}
                        {nyesteSak && (
                            <>
                                <Saksoversikt
                                    sak={nyesteSak}
                                    søker={søker}
                                    history={history}
                                    historikkInnslagListe={historikkInnslagListe}
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
    søker: getData(state.api.personinfo, undefined),
    saker: getData(state.api.saker, []),
    storageKvittering: getData(state.api.storageKvittering, undefined),
    historikkInnslagListe: getData(state.api.historikk, undefined)
});

export default connect(mapStateToProps)(DineForeldrepenger);
