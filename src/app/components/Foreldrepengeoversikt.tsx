import * as React from 'react';
import Api from '../api/api';
import { redirectToLogin } from '../utils/login';
import { AxiosError } from 'axios';
import Sak from '../types/Sak';
import Saksoversikt from './saksoversikt/Saksoversikt';
import { Status } from '../types/Status';

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

    fetchSaker() {
        Api.getSøkerInfo()
            .then((response) => this.setState({ saker: response.data }))
            .catch((error: AxiosError) => {
                if (error.response) {
                    error.response.status === 401 ? redirectToLogin() : this.setState({ error });
                }
            });
    }

    componentWillMount() {
        this.fetchSaker();
    }

    render() {
        const { saker } = this.state;
        return (
            <React.Fragment>
                <h1>Foreldrepengeoversikt</h1>
                <Saksoversikt title={'Opprettet:'} sakstatus={Status.OPPRETTET} saker={saker} />
                <Saksoversikt title={'Løpende:'} sakstatus={Status.LØPENDE} saker={saker} />
                <Saksoversikt title={'Under Behandling:'} sakstatus={Status.UNDER_BEHANDLING} saker={saker} />
                <Saksoversikt title={'Avsluttet:'} sakstatus={Status.AVSLUTTET} saker={saker} />
            </React.Fragment>
        );
    }
}

export default Foreldrepengeoversikt;
