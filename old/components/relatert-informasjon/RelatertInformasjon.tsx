import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import BEMHelper from '../../common/util/bem';
import { annenInformasjonLenker } from '../../utils/lenker';

import './relatertInformasjon.less';

const RelatertInformasjon = () => {
    const cls = BEMHelper('relatert-informasjon');
    return (
        <>
            <Undertittel className={cls.element('subheader')}>
                <FormattedMessage id="relatertInformasjon.header" />
            </Undertittel>
            <div className={cls.block}>
                <nav className={cls.element('links')}>
                    {Object.values(annenInformasjonLenker).map((link) => (
                        <div key={link.href} className={cls.element('link-container')}>
                            <Lenke className={cls.element('link')} href={link.href}>
                                <Normaltekst>{link.text}</Normaltekst>
                            </Lenke>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
};
export default RelatertInformasjon;
