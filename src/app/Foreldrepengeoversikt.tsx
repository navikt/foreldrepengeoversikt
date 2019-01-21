import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AxiosError } from 'axios';

import Api from './api/api';
import { redirectToLogin } from './utils/login';
import Sak from './types/Sak';
import DineForeldrepenger from './pages/dine-foreldrepenger/DineForeldrepenger';
import Ettersendelse from './pages/ettersendelse/Ettersendelse';
import ApplicationSpinner from './components/application-spinner/ApplicationSpinner';
import ErrorPage from './pages/error/ErrorPage';
import KvitteringPage from './pages/kvittering-page/Kvittering';
import { Routes } from './utils/routes';
import { sakByDescendingOrder } from './utils/sakerUtils';

interface State {
    saker: Sak[];
    loading: boolean;
    error?: AxiosError;
}

class Foreldrepengeoversikt extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            saker: [],
            loading: true
        };
    }

    componentWillMount(): void {
        this.fetchSaker();
    }

    fetchSaker(): void {
        this.setState({ loading: true }, () => {
            Api.getSaker()
                .then((response) =>
                    this.setState({ saker: response.data.sort(sakByDescendingOrder), loading: false })
                )
                .catch((error: AxiosError) => {
                    if (error.response) {
                        error.response.status === 401 ? redirectToLogin() : this.setState({ error, loading: false });
                    } else {
                        this.setState({ error, loading: false });
                    }
                });
        });
    }

    render(): JSX.Element {
        if (this.state.loading) {
            return <ApplicationSpinner />;
        }

        return (
            <Router>
                <Switch>
                    <Route path={Routes.FEIL} render={(props) => <ErrorPage {...props} />} />
                    <Route path={Routes.ETTERSENDELSE} render={(props) => <Ettersendelse {...props} />} />
                    <Route path={Routes.KVITTERING} render={(props) => <KvitteringPage {...props} />} />
                    <Route
                        path={Routes.DINE_FORELDREPENGER}
                        exact={true}
                        render={(props) => (
                            <DineForeldrepenger saker={this.state.saker} error={this.state.error} {...props} />
                        )}
                    />
                    <Redirect to={Routes.DINE_FORELDREPENGER} />
                </Switch>
            </Router>
        );
    }
}

export default Foreldrepengeoversikt;
