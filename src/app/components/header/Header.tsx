/* tslint:disable:jsx-key */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';

import BEMHelper from '../../../common/util/bem';
import NavigationColumLinks from '../navigation-colum-links/NavigationColumLinks';

import Familie1 from '../ikoner/familier/Familie1';
import Familie2 from '../ikoner/familier/Familie2';
import Familie3 from '../ikoner/familier/Familie3';
import Familie4 from '../ikoner/familier/Familie4';
import Familie5 from '../ikoner/familier/Familie5';

import './header.less';

interface Props {
    history: History;
}

const Header = ({ history }: Props) => {
    // tslint:disable-next-line:jsx-key
    const cls = BEMHelper('header');
    const ikoner = [
        <Familie1 className={cls.element('icon')} />,
        <Familie2 className={cls.element('icon')} />,
        <Familie3 className={cls.element('icon')} />,
        <Familie4 className={cls.element('icon')} />,
        <Familie5 className={cls.element('icon')} />
    ];

    const tilfeldigIkonIndex = Math.floor(Math.random() * Math.floor(ikoner.length));;

    return (
        <div className={cls.className}>
                <div className={cls.element('content')}>
                    <div className={cls.element('text')}>
                        <NavigationColumLinks history={history} />
                        <Sidetittel className={cls.element('title')}>
                            <FormattedMessage id="header.title" />
                        </Sidetittel>
                        <Normaltekst>
                            <FormattedMessage id="header.undertitle" />
                        </Normaltekst>
                    </div>
                    <div className={cls.element('svg-container')}>{ikoner[tilfeldigIkonIndex]}</div>
                </div>
        </div>
    );
};
export default Header;
