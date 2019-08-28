import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import { Link } from 'react-router-dom';
import { Routes } from 'app/utils/routes';

import './sectionSeparator.less';

interface Props {
    title: string | React.ReactNode;
    sectionLink?: {
        to: Routes;
        text: string | React.ReactNode;
    };
}

const SectionSeparator: React.FunctionComponent<Props> = ({ children, title, sectionLink }) => {
    const cls = BEMHelper('section-separator');
    return (
        <div className={cls.className}>
            <div className={cls.element('header')}>
                <Systemtittel>{title}</Systemtittel>
                {sectionLink && <Link to={sectionLink.to}>{sectionLink.text}</Link>}
            </div>
            {children}
        </div>
    );
};

export default SectionSeparator;
