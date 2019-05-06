import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import DineForeldrepenger from './pages/dine-foreldrepenger/DineForeldrepenger';
import Ettersendelse from './pages/ettersendelse/Ettersendelse';
import ErrorPage from './pages/error/ErrorPage';
import KvitteringPage from './pages/kvittering-page/Kvittering';

import ApplicationSpinner from './components/application-spinner/ApplicationSpinner';
import { Routes } from './utils/routes';

import Sak from './types/Sak';
import Person from './types/Personinfo';
import { StorageKvittering } from './types/StorageKvittering';
import ApiAction, { ApiActionTypes } from './redux/types/ApiAction';
import { State } from './redux/store';
import FetchState, { FetchStatus } from './redux/types/FetchState';
import { extractUUID } from 'common/util/errorUtil';
import { getErrorCode } from './redux/util/fetchFromState';

interface Props {
    saker: FetchState<Sak[]>;
    storageKvittering: FetchState<StorageKvittering>;
    personinfo: FetchState<Person>;
    requestPersoninfo: () => void;
    requestSaker: () => void;
    requestStorageKvittering: () => void;
}

class Foreldrepengeoversikt extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount(): void {
        this.fetchData();
    }

    fetchData(): void {
        if (this.props.personinfo.status === FetchStatus.UNFETCHED) {
            this.props.requestPersoninfo();
            this.props.requestSaker();
            this.props.requestStorageKvittering();
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
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Foreldrepengeoversikt);
