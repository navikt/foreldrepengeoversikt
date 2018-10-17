import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import FamilyIcon from '../ikoner/FamilyIcon';
import BEMHelper from '../../../common/util/bem';

import './header.less';

const Header: React.StatelessComponent = () => {
    const cls = BEMHelper('header');
    return (
        <div className={cls.className}>
            <div className={cls.element('content')}>
                <Sidetittel className={cls.element('title')}>
                    Dine foreldrepenger
                </Sidetittel>
                <FamilyIcon className={cls.element('icon')} />
            </div>
        </div>
    );
};
export default Header;
