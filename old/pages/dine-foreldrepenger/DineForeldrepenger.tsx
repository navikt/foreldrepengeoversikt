import * as React from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { History } from 'history';
import moment from 'moment';

import SakBase from '../../api/types/sak/Sak';
import EkspanderbarSaksoversikt from '../../components/saksoversikt/saksoversikt-ekspanderbar/EkspanderbarSaksoversikt';
import Header from '../../components/header/Header';
import BEMHelper from '../../../common/util/bem';
import RelatertInformasjon from '../old/components/relatert-informasjon/RelatertInformasjon';
import IngenSaker from '../old/components/ingen-saker/IngenSaker';
import {
    erInfotrygdSak,
    opprettFiktivSak,
    harSøkt,
    harEnAvsluttetBehandling,
    erForeldrepengesak,
} from '../../utils/sakerUtils';
import Sidepanel from '../../components/sidepanel/Sidepanel';
import Saksoversikt from '../../components/saksoversikt/saksoversikt-main/Saksoversikt';

import { StorageKvittering } from '../../api/types/StorageKvittering';
import Behandling from 'app/api/types/sak/Behandling';
import { AppState } from 'app/redux/store';
import { getData } from 'app/redux/util/fetchFromState';
import {
    Innsendingsinnslag,
    HendelseType,
    HistorikkInnslag,
    HistorikkInnslagType,
} from 'app/api/types/historikk/HistorikkInnslag';

import { Søkerinfo } from 'app/types/Søkerinfo';

import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import MinidialogContainer from '../old/components/minidialog-container/MinidialogContainer';
import { ManglendeVedlegg } from 'app/api/types/sak/ManglendeVedlegg';
import InfoOmKlage from '../old/components/info-om-klage/InfoOmKlage';
import './dineForeldrepenger.less';

interface Props {
    saker: SakBase[];
    storageKvittering?: StorageKvittering;
    søkerinfo?: Søkerinfo;
    history: History;
    historikkInnslagListe: HistorikkInnslag[];
    manglendeVedlegg: ManglendeVedlegg[];
}

export class DineForeldrepenger extends React.Component<Props> {
    shouldRenderStorageKvitteringAsSak(): boolean {
        const { saker, storageKvittering } = this.props;
        if (storageKvittering === undefined || storageKvittering.innsendingstidspunkt === undefined) {
            return false;
        }

        if (saker.length === 0) {
            return true;
        }

        if (erInfotrygdSak(saker[0])) {
            return saker.every((sak: SakBase) =>
                moment(sak.opprettet).isBefore(storageKvittering.innsendingstidspunkt)
            );
        }

        return (
            saker.every((sak: SakBase) => moment(sak.opprettet).isBefore(storageKvittering.innsendingstidspunkt)) &&
            saker[0].behandlinger !== undefined &&
            saker[0].behandlinger.every((b: Behandling) =>
                moment(b.endretTidspunkt).isBefore(storageKvittering.innsendingstidspunkt, 'days')
            )
        );
    }

    renderSaksoversiktList(nyesteSak: SakBase) {
        const { saker, history, historikkInnslagListe, søkerinfo, manglendeVedlegg } = this.props;
        const cls = BEMHelper('saksoversikt-list');
        return (
            <ul className={cls.block}>
                {saker
                    .filter((s: SakBase) => s.saksnummer !== nyesteSak.saksnummer)
                    .map((sak: SakBase) => {
                        return (
                            <li className={cls.element('element')} key={sak.saksnummer}>
                                <EkspanderbarSaksoversikt
                                    søkerinfo={søkerinfo}
                                    sak={sak}
                                    history={history}
                                    historikkInnslagListe={historikkInnslagListe.filter(
                                        (h) => h.saksnr === sak.saksnummer
                                    )}
                                    manglendeVedlegg={manglendeVedlegg}
                                />
                            </li>
                        );
                    })}
            </ul>
        );
    }

    renderSidepanel(sak?: SakBase) {
        const cls = BEMHelper('sak-info-panel');
        return (
            <div className={cls.block}>
                <Sidepanel sak={sak} />
            </div>
        );
    }

    shouldRenderAlertStripe(sak: SakBase): boolean {
        const søknadsHistorikk = this.props.historikkInnslagListe.filter(
            (h) => h.type === HistorikkInnslagType.søknad
        ) as Innsendingsinnslag[];

        return (
            (!søknadsHistorikk.find(({ hendelse }) => hendelse === HendelseType.INITIELL_FORELDREPENGER) &&
                harSøkt(sak) &&
                erForeldrepengesak(sak) &&
                !harEnAvsluttetBehandling(sak)) ||
            erInfotrygdSak(sak)
        );
    }

    renderAlertStripe() {
        return (
            <AlertStripe type="info">
                <FormattedMessage id="dineForeldrepenger.alertstripe" values={{ b: (msg: any) => <b>{msg}</b> }} />
            </AlertStripe>
        );
    }

    render() {
        const { saker, history, storageKvittering, søkerinfo, historikkInnslagListe, manglendeVedlegg } = this.props;
        const nyesteSak: SakBase | undefined = this.shouldRenderStorageKvitteringAsSak()
            ? opprettFiktivSak(storageKvittering!)
            : saker.slice().shift();

        const cls = BEMHelper('dine-foreldrepenger');
        return (
            <>
                <Header saker={saker} history={this.props.history} />
                <div className={cls.block}>
                    <div className={cls.element('main-content')}>
                        {nyesteSak === undefined && <IngenSaker />}
                        {nyesteSak && this.shouldRenderAlertStripe(nyesteSak) && this.renderAlertStripe()}
                        <MinidialogContainer />
                        {nyesteSak && (
                            <>
                                <Saksoversikt
                                    sak={nyesteSak}
                                    søkerinfo={søkerinfo}
                                    history={history}
                                    historikkInnslagListe={historikkInnslagListe.filter(
                                        (h) => h.saksnr === nyesteSak.saksnummer
                                    )}
                                    withHeader={true}
                                    manglendeVedlegg={manglendeVedlegg}
                                />
                                {this.renderSaksoversiktList(nyesteSak)}
                            </>
                        )}
                        {nyesteSak && (
                            <>
                                <InfoOmKlage sak={nyesteSak} />
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

const mapStateToProps = (state: AppState) => ({
    søkerinfo: getData(state.api.søkerinfo, {}),
    saker: getData(state.api.saker, []),
    storageKvittering: getData(state.api.storageKvittering, undefined),
    historikkInnslagListe: getData(state.api.historikk, []),
    manglendeVedlegg: getData(state.api.manglendeVedlegg, []),
});

export default connect(mapStateToProps)(DineForeldrepenger);
