import React, { ReactNode } from 'react';
import Lenke from 'nav-frontend-lenker';
import { FormattedMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';
import { Systemtittel } from 'nav-frontend-typografi';

import './sidepanel.less';

interface SidepanelElementProps {
    title?: string;
    tekst?: string;
    lenke?: {
        lenketekst: string;
        href: string;
    };
    icon?: ReactNode;
}

const SidepanelElement = ({ title, icon, lenke, tekst }: SidepanelElementProps) => {
    const cls = BEMHelper('sidepanel-element');
    return (
        <div className={cls.className}>
            {title && <Systemtittel className="blokk-xs">{title}</Systemtittel>}
            <div className="blokk-xs">{icon}</div>

            {tekst && <FormattedMessage id={tekst} />}
            {lenke && (
                <Lenke href={lenke.href}>
                    <FormattedMessage id={lenke.lenketekst} />
                </Lenke>
            )}
        </div>
    );
};

export default SidepanelElement;
