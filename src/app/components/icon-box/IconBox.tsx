import React from 'react';

import './iconBox.css';
import { bemUtils } from '@navikt/fp-common';
import { UttaksplanColor } from 'app/types/UttaksplanColor';

export interface Props {
    children?: React.ReactNode;
    color: UttaksplanColor;
    stripes?: boolean;
}

const IconBox: React.FunctionComponent<Props> = ({ children, color, stripes }) => {
    const bem = bemUtils('iconBox');
    console.log(stripes);
    return <div className={bem.element(`icon-${color}`)}>{children}</div>;
};

export default IconBox;
