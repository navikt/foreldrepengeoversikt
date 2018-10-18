import * as React from 'react';
import BEMHelper from '../../../common/util/bem';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { annenInformasjonLenker } from '../../utils/lenker';

import './annenInformasjon.less';

const AnnenInformasjon: React.StatelessComponent = () => {
    const cls = BEMHelper('annenInformasjon');
    return (
        <div className={cls.className}>
            <Undertittel>Annen informasjon</Undertittel>
            <nav className={cls.element('links')}>
                {Object.values(annenInformasjonLenker).map((link) => (
                    <div key={link.href} className={cls.element('linkContainer')}>
                        <Lenke className={cls.element('link')} href={link.href}>
                            <Normaltekst>{link.text}</Normaltekst>
                        </Lenke>
                    </div>
                ))}
            </nav>
        </div>
    );
};
export default AnnenInformasjon;
