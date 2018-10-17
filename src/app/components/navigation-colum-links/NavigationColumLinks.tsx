import * as React from 'react';
import BEMHelper from '../../../common/util/bem';
import { Normaltekst } from 'nav-frontend-typografi';
import { History } from 'history';
import Lenke from 'nav-frontend-lenker';
import { Link } from 'react-router-dom';
import { headerLinks } from '../../utils/lenker';

import './navigationColumLinks.less';
import UserIcon from '../ikoner/UserIcon';

interface NavigationLinks {
    text: string;
    href: string;
    external?: boolean;
}

interface Props {
    history: History;
}

const NavigationColumLinks: React.StatelessComponent<Props> = (props: Props) => {
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
                    return <Normaltekst>{link.text}</Normaltekst>;
                } else {
                    return link.external ? (
                        <>
                            <Lenke href={link.href}>
                                <Normaltekst>{link.text}</Normaltekst>
                            </Lenke>
                            <span>/</span>
                        </>
                    ) : (
                        <>
                            <Link to={link.href}>
                                <Normaltekst>{link.text}</Normaltekst>
                            </Link>
                            <span>/</span>
                        </>
                    );
                }
            })}
        </div>
    );
};
export default NavigationColumLinks;
