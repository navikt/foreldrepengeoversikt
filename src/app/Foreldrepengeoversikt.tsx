import * as React from 'react';
import Api from './api/api';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { redirectToLogin } from './utils/login';
import { AxiosError } from 'axios';
import Sak from './types/Sak';
import Header from './components/header/Header';
import Innsyn from './pages/innsyn/Innsyn';
import ApplicationSpinner from './components/application-spinner/ApplicationSpinner';
import InnsynDev from './pages/innsyn-dev/InnsynDev';

interface State {
    saker: Sak[];
    error?: AxiosError;
    loading: boolean;
}

class Foreldrepengeoversikt extends React.Component<{}, State> {
    constructor(props: State) {
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
        if (this.state.loading) {
            return <ApplicationSpinner />;
        }

        return (
            <>
                <Header />
                <Router>
                    <Switch>
                        <Route path="/dev" render={(props) => <InnsynDev saker={this.state.saker} {...props} />} />
                        <Route path="/" render={(props) => <Innsyn saker={this.state.saker} {...props} />} />
                    </Switch>
                </Router>
            </>
        );
    }
}

export default Foreldrepengeoversikt;
