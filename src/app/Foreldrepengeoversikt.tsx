import * as React from 'react';
import Api from './api/api';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { redirectToLogin } from './utils/login';
import { AxiosError } from 'axios';
import Sak from './types/Sak';
import Innsyn from './pages/innsyn/Innsyn';
import InnsynDev from './pages/innsyn-dev/InnsynDev';
import Ettersendelse from './pages/ettersendelse/Ettersendelse';

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
            loading: false
        };
    }

    componentWillMount(): void {
        this.fetchSaker();
    }

    fetchSaker(): void {
        this.setState({ loading: true }, () => {
            Api.getSøkerInfo()
                .then((response) => this.setState({ saker: response.data }))
                .catch((error: AxiosError) => {
                    if (error.response) {
                        error.response.status === 401 ? redirectToLogin() : this.setState({ error });
                    }
                })
                .finally(() => this.setState({ loading: false }));
        });
    }

    render(): JSX.Element {
        return (
            <Router>
                <Switch>
                    <Route path="/dev" render={() => <InnsynDev saker={this.state.saker} />} />
                    <Route path="/ettersendelse" render={(props) => <Ettersendelse {...props} />} />
                    <Route
                        path="/"
                        render={(props) => <Innsyn saker={this.state.saker} loading={this.state.loading} {...props} />}
                    />
                </Switch>
            </Router>
        );
    }
}

export default Foreldrepengeoversikt;
