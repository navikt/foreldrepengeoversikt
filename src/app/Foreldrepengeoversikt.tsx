import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import DineForeldrepenger from './pages/dine-foreldrepenger/DineForeldrepenger';
import Ettersendelse from './pages/ettersendelse/Ettersendelse';
import ErrorPage from './pages/error/ErrorPage';
import KvitteringPage from './pages/kvittering-page/Kvittering';

import ApplicationSpinner from './components/application-spinner/ApplicationSpinner';
import { Routes } from './utils/routes';

import ApiAction, { ApiActionTypes } from './redux/types/ApiAction';
import FetchState, { FetchStatus, PostState, GetFailure } from './redux/types/FetchState';
import { extractUUID, extractErrorMessage } from 'common/util/errorUtil';
import { getErrorCode } from './redux/util/fetchFromState';
import { AppState } from './redux/store';
import { Feature, isFeatureEnabled } from './Feature';
import DinPlan from './pages/din-plan/DinPlan';
import MinidialogPage from './pages/minidialog/MinidialogPage';
import EttersendingDto from './api/types/ettersending/EttersendingDto';
import { Søkerinfo } from './types/Søkerinfo';

interface Props {
    søkerinfo: FetchState<Søkerinfo>;
    ettersendelse: PostState<EttersendingDto>;
    shouldRenderApplicationSpinner: boolean;
    feiletOppslag: GetFailure;
    requestPersoninfo: () => void;
    requestSaker: () => void;
    requestStorageKvittering: () => void;
    requestHistorikk: () => void;
    requestMinidialog: () => void;
}

class Foreldrepengeoversikt extends React.Component<Props> {
    componentWillMount(): void {
        this.fetchData();
    }

    fetchData(): void {
        if (this.props.søkerinfo.status === FetchStatus.UNFETCHED) {
            this.props.requestPersoninfo();
            this.props.requestSaker();
            this.props.requestStorageKvittering();

            if (isFeatureEnabled(Feature.historikk)) {
                this.props.requestHistorikk();
            }

            if (isFeatureEnabled(Feature.miniDialog)) {
                this.props.requestMinidialog();
            }
        }
    }

    render() {
        const { ettersendelse, feiletOppslag, shouldRenderApplicationSpinner } = this.props;
        if (shouldRenderApplicationSpinner) {
            return <ApplicationSpinner />;
        }

        if (feiletOppslag) {
            return <ErrorPage uuid={extractUUID(feiletOppslag.error)} />;
        }

        if (ettersendelse.status === FetchStatus.FAILURE) {
            return (
                <ErrorPage
                    uuid={extractUUID(ettersendelse.error)}
                    errorMessage={
                        getErrorCode(ettersendelse) === 413 ? extractErrorMessage(ettersendelse.error) : undefined
                    }
                />
            );
        }

        return (
            <Router>
                <Switch>
                    <Route path={Routes.ETTERSENDELSE} render={(props) => <Ettersendelse {...props} />} />
                    <Route path={Routes.KVITTERING} render={(props) => <KvitteringPage {...props} />} />
                    {isFeatureEnabled(Feature.dinPlan) && (
                        <Route path={Routes.DIN_PLAN} render={(props) => <DinPlan {...props} />} />
                    )}
                    {isFeatureEnabled(Feature.miniDialog) && (
                        <Route
                            path={Routes.MINIDIALOG}
                            exact={true}
                            render={(props) => <MinidialogPage {...props} />}
                        />
                    )}
                    <Route
                        path={Routes.DINE_FORELDREPENGER}
                        exact={true}
                        render={(props) => <DineForeldrepenger {...props} />}
                    />
                    <Redirect to={Routes.DINE_FORELDREPENGER} />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { søkerinfo, saker, storageKvittering, historikk } = state.api
    return {
        søkerinfo,
        ettersendelse: state.innsending.ettersendelse,
        feiletOppslag: [...Object.values(state.api)].find((oppslag) => oppslag.status === FetchStatus.FAILURE),
        shouldRenderApplicationSpinner: [søkerinfo, saker, storageKvittering, historikk].some(
            (oppslag) =>
                oppslag.status === FetchStatus.UNFETCHED ||
                oppslag.status === FetchStatus.IN_PROGRESS ||
                getErrorCode(oppslag) === 401
        )
    };
};

const mapDispatchToProps = (dispatch: (action: ApiAction) => void) => ({
    requestPersoninfo: () => {
        dispatch({ type: ApiActionTypes.GET_SØKERINFO_REQUEST });
    },
    requestSaker: () => {
        dispatch({ type: ApiActionTypes.GET_SAKER_REQUEST });
    },
    requestStorageKvittering: () => {
        dispatch({ type: ApiActionTypes.GET_STORAGE_KVITTERING_REQUEST });
    },
    requestHistorikk: () => {
        dispatch({ type: ApiActionTypes.GET_HISTORIKK_REQUEST });
    },
    requestMinidialog: () => {
        dispatch({ type: ApiActionTypes.GET_MINIDIALOG_REQUEST });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Foreldrepengeoversikt);
