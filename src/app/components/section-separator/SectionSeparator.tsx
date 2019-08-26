import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './sectionSeparator.less'

interface Props {
    title: string | React.ReactNode;
}

const SectionSeparator: React.FunctionComponent<Props> = ({ children, title }) => {
    const cls = BEMHelper('section-separator');
    return (
        <div className={cls.className}>
            <Systemtittel className={cls.element('title')}>{title}</Systemtittel>
            {children}
        </div>
    );
};

export default SectionSeparator;
