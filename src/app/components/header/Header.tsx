import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';

import Sak from 'app/api/types/sak/Sak';
import BEMHelper from '../../../common/util/bem';
import NavigationColumLinks from '../navigation-colum-links/NavigationColumLinks';
import { getRandomIcon, getHeaderTitleIntlKey } from './util';

import './header.less';

interface Props {
    saker: Sak[];
    history: History;
}

const Header: React.FunctionComponent<Props> = ({ saker, history }) => {
    const cls = BEMHelper('header');
    return (
        <div className={cls.className}>
                <div className={cls.element('content')}>
                    <div className={cls.element('text')}>
                        <NavigationColumLinks history={history} />
                        <Sidetittel className={cls.element('title')}>
                            <FormattedMessage id={getHeaderTitleIntlKey(saker)} />
                        </Sidetittel>
                        <Normaltekst>
                            <FormattedMessage id="header.undertitle" />
                        </Normaltekst>
                    </div>
                    <div className={cls.element('svg-container')}>{getRandomIcon()}</div>
                </div>
        </div>
    );
};
export default Header;
