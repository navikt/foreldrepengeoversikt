import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import DineForeldrepenger from './pages/dine-foreldrepenger/DineForeldrepenger';
import Ettersendelse from './pages/ettersendelse/Ettersendelse';
import ErrorPage from './pages/error/ErrorPage';
import KvitteringPage from './pages/kvittering-page/Kvittering';

import ApplicationSpinner from './components/application-spinner/ApplicationSpinner';
import { Routes } from './utils/routes';

import Sak from './api/types/sak/Sak';
import Person from './api/types/personinfo/Personinfo';
import { StorageKvittering } from './api/types/StorageKvittering';
import ApiAction, { ApiActionTypes } from './redux/types/ApiAction';
import FetchState, { FetchStatus } from './redux/types/FetchState';
import { extractUUID } from 'common/util/errorUtil';
import { getErrorCode } from './redux/util/fetchFromState';
import { State } from './redux/store';
import { Feature, isFeatureEnabled } from './Feature';
import DinPlan from './pages/din-plan/DinPlan';
import MinidialogSvar from './pages/mindialog-svar/MinidialogSvar';

interface Props {
    saker: FetchState<Sak[]>;
    storageKvittering: FetchState<StorageKvittering>;
    personinfo: FetchState<Person>;
    requestPersoninfo: () => void;
    requestSaker: () => void;
    requestStorageKvittering: () => void;
    requestHistorikk: () => void;
    requestMinidialog: () => void;
}

interface OwnState {
    isChangeBrowserModalRead: boolean;
}

class Foreldrepengeoversikt extends React.Component<Props, OwnState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isChangeBrowserModalRead: false
        };
    }

    componentWillMount(): void {
        this.fetchData();
    }

    fetchData(): void {
        if (this.props.personinfo.status === FetchStatus.UNFETCHED) {
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

    shouldRenderApplicationSpinner(): boolean {
        const { personinfo, storageKvittering, saker } = this.props;
        return (
            personinfo.status === FetchStatus.UNFETCHED ||
            personinfo.status === FetchStatus.IN_PROGRESS ||
            saker.status === FetchStatus.UNFETCHED ||
            saker.status === FetchStatus.IN_PROGRESS ||
            storageKvittering.status === FetchStatus.UNFETCHED ||
            storageKvittering.status === FetchStatus.IN_PROGRESS ||
            getErrorCode(personinfo) === 401
        );
    }

    shouldRenderErrorPage(): boolean {
        const { personinfo, storageKvittering, saker } = this.props;
        return (
            personinfo.status === FetchStatus.FAILURE ||
            storageKvittering.status === FetchStatus.FAILURE ||
            saker.status === FetchStatus.FAILURE
        );
    }

    render(): JSX.Element {
        if (this.shouldRenderApplicationSpinner()) {
            return <ApplicationSpinner />;
        }

        const { personinfo, storageKvittering, saker } = this.props;
        if (personinfo.status === FetchStatus.FAILURE && getErrorCode(personinfo) !== 401) {
            return <ErrorPage uuid={extractUUID(personinfo.error)} />;
        } else if (storageKvittering.status === FetchStatus.FAILURE && getErrorCode(personinfo) !== 401) {
            return <ErrorPage uuid={extractUUID(storageKvittering.error)} />;
        } else if (saker.status === FetchStatus.FAILURE && getErrorCode(personinfo) !== 401) {
            return <ErrorPage uuid={extractUUID(saker.error)} />;
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
                            render={(props) => <MinidialogSvar {...props} />}
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

const mapStateToProps = (state: State) => ({
    personinfo: state.api.personinfo,
    saker: state.api.saker,
    storageKvittering: state.api.storageKvittering
});

const mapDispatchToProps = (dispatch: (action: ApiAction) => void) => ({
    requestPersoninfo: () => {
        dispatch({ type: ApiActionTypes.GET_PERSONINFO_REQUEST });
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
