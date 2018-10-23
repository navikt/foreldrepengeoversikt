import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import FamilyIcon from '../ikoner/FamilyIcon';
import BEMHelper from '../../../common/util/bem';
import NavigationColumLinks from '../navigation-colum-links/NavigationColumLinks';
import './header.less';
import { History } from 'history';
import { FormattedMessage } from 'react-intl';

interface Props {
    history: History;
}

const Header: React.StatelessComponent<Props> = ({ history }) => {
    const cls = BEMHelper('header');
    return (
        <div className={cls.className}>
            <div className={cls.element('content')}>
                <div className={cls.element('text-wrapper')}>
                    <NavigationColumLinks history={history} />
                    <Sidetittel className={cls.element('title')}>
                        <FormattedMessage id={'header.title'} />
                    </Sidetittel>
                </div>
                <FamilyIcon className={cls.element('icon')} />
            </div>
        </div>
    );
};
export default Header;
