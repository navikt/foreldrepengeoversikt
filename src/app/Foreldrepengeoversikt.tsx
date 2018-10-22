import * as React from 'react';
import Api from './api/api';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { redirectToLogin } from './utils/login';
import { AxiosError } from 'axios';
import Sak from './types/Sak';
import Innsyn from './pages/innsyn/Innsyn';
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
            loading: true
        };
    }

    componentWillMount(): void {
        this.fetchSaker();
    }

    fetchSaker(): void {
        this.setState({ loading: true }, () => {
            Api.getSaker()
                .then((response) => this.setState({ saker: response.data, loading: false }))
                .catch((error: AxiosError) => {
                    if (error.response) {
                        error.response.status === 401 ? redirectToLogin() : this.setState({ error });
                    } else {
                        this.setState({ error, loading: false });
                    }
                });
        });
    }

    render(): JSX.Element {
        return (
            <Router>
                <Switch>
                    <Route path="/ettersendelse" render={(props) => <Ettersendelse {...props} />} />
                    <Route
                        path="/"
                        render={(props) => (
                            <Innsyn
                                saker={this.state.saker}
                                loading={this.state.loading}
                                error={this.state.error}
                                {...props}
                            />
                        )}
                    />
                </Switch>
            </Router>
        );
    }
}

export default Foreldrepengeoversikt;
