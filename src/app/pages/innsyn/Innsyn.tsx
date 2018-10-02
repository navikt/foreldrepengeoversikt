import * as React from 'react';
import Sak from '../../types/Sak';
import Saksoversikt from '../../components/saksoversikt/Saksoversikt';

import './innsyn.less';

interface Props {
    saker: Sak[];
}

class Innsyn extends React.Component<Props> {

    handleSaksoversikt() {

    }

    render() {
        return (
            <div className={'innsyn'}>
                <ul className={'innsyn__saksoversiktList'}>
                    {this.props.saker.map((sak: Sak) => (
                        <li key={sak.saksnummer}>
                            <Saksoversikt sak={sak} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default Innsyn;
