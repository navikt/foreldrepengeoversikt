import * as React from 'react';
import Spinner from 'nav-frontend-spinner';
import BEMHelper from '../../../common/util/bem';

import './applicationSpinner.less';

export interface Props {}

const ApplicationSpinner: React.StatelessComponent<Props> = () => {
    const cls = BEMHelper('applicationSpinner');
    return (
        <div className={cls.className}>
            <div className={cls.element('spinner')}>
                <Spinner type="XXL" />
            </div>
        </div>
    );
};

export default ApplicationSpinner;
