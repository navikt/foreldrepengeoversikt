import * as React from 'react';
import Api from './api/api';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { redirectToLogin } from './utils/login';
import { AxiosError } from 'axios';
import Sak from './types/Sak';
import Header from './components/header/Header';
import Innsyn from './pages/Innsyn';

interface State {
    saker: Sak[];
    error?: AxiosError;
}

class Foreldrepengeoversikt extends React.Component<{}, State> {
    constructor(props: State) {
        super(props);
        this.state = {
            saker: [],
            error: undefined
        };
    }

    componentWillMount() {
        this.fetchSaker();
    }

    fetchSaker() {
        Api.getSøkerInfo()
            .then((response) => this.setState({ saker: response.data }))
            .catch((error: AxiosError) => {
                if (error.response) {
                    error.response.status === 401 ? redirectToLogin() : this.setState({ error });
                }
            });
    }

    render() {
        return (
            <>
                <Header />
                <Router>
                    <Switch>
                        <Route path="/" render={(props) => <Innsyn saker={this.state.saker} {...props} />} />
                    </Switch>
                </Router>
            </>
        );
    }
}

export default Foreldrepengeoversikt;
