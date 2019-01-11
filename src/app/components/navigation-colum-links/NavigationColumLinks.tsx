import * as React from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';
import Lenke from 'nav-frontend-lenker';
import { guid } from 'nav-frontend-js-utils';
import BEMHelper from '../../../common/util/bem';
import { Normaltekst } from 'nav-frontend-typografi';
import { headerLinks } from '../../utils/lenker';
import UserIcon from '../ikoner/UserIcon';

import './navigationColumLinks.less';

interface NavigationLinks {
    text: string;
    href: string;
    external?: boolean;
}

interface Props {
    history: History;
}

const NavigationColumLinks = (props: Props) => {
    const cls = BEMHelper('navigation-colum-links');
    const links = Object.values(headerLinks);
    return (
        <div className={cls.className}>
            <UserIcon />
            {links.map((link: NavigationLinks) => {
                if (
                    links.findIndex((navLink: NavigationLinks) => navLink.href === props.history.location.pathname) <
                    links.indexOf(link)
                ) {
                    return null;
                }

                if (props.history.location.pathname === link.href) {
                    return <Normaltekst key={guid()}>{link.text}</Normaltekst>;
                } else {
                    const key = guid();
                    return link.external ? (
                        <React.Fragment key={key}>
                            <Lenke href={link.href}>
                                <Normaltekst>{link.text}</Normaltekst>
                            </Lenke>
                            <span>/</span>
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={key}>
                            <Link to={link.href}>
                                <Normaltekst>{link.text}</Normaltekst>
                            </Link>
                            <span>/</span>
                        </React.Fragment>
                    );
                }
            })}
        </div>
    );
};
export default NavigationColumLinks;
