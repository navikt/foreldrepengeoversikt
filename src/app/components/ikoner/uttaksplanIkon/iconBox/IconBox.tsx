import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { UttaksplanColor } from '../../../../types/uttaksplan/UttaksplanColor';

import './iconBox.less';

export interface Props {
    color: UttaksplanColor;
    stripes?: boolean;
}

const BEM = BEMHelper('iconBox');

const IconBox: React.StatelessComponent<Props> = ({ children, color, stripes }) => (
    <div className={classnames(BEM.block, BEM.modifier(`${color}${stripes ? '--striped' : ''}`))}>{children}</div>
);

export default IconBox;
