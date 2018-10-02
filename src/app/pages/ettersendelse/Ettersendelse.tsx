import * as React from 'react';
import Sak from '../../types/Sak';
import { History } from 'history';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import BEMHelper from '../../utils/bem';
import './ettersendelse.less';

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
        const cls = BEMHelper('ettersendelse');
        return (
            <div className={cls.className}>
                <Innholdstittel>Last opp dokumentasjon til sak {this.state.sak.saksnummer}</Innholdstittel>
                <Hovedknapp>Ettersend vedlegg</Hovedknapp>
            </div>
        );
    }
}
export default Ettersendelse;
