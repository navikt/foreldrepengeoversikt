import * as React from 'react';
import Sak from '../../types/Sak';
import { History } from 'history';

import './ettersendelse.less';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

interface Props {
    history: History;
}

interface State {
    sak: Sak;
    attachments: any;
}

class Ettersendelse extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = this.props.history.location.state;
    }

    render() {
        return (
            <div className={'ettersendelse'}>
                <Innholdstittel>Last opp dokumentasjon til sak {this.state.sak.saksnummer}</Innholdstittel>
                <Hovedknapp>Ettersend vedlegg</Hovedknapp>
            </div>
        );
    }
}
export default Ettersendelse;
