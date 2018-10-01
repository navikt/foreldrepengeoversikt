import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import FamilyIcon from '../../ikoner/FamilyIcon';
import BEMHelper from '../../utils/bem';
import './header.less';

const Header: React.StatelessComponent = () => {
    const cls = BEMHelper('header');
    return (
        <div className={cls.className}>
            <div className={cls.element('content')}>
                <Sidetittel className={cls.element('title')}>
                    Foreldrepenger, engangsstønad og svangerskapspenger
                </Sidetittel>
                <FamilyIcon className={cls.element('icon')} />
            </div>
        </div>
    );
};
export default Header;
