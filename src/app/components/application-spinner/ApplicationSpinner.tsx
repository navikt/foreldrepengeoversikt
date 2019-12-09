import * as React from 'react';
import Spinner from 'nav-frontend-spinner';
import BEMHelper from '../../../common/util/bem';

import './applicationSpinner.less';

const ApplicationSpinner: React.StatelessComponent = () => {
    const cls = BEMHelper('applicationSpinner');
    return (
        <div className={cls.block}>
            <div>
                <Spinner type="XXL" />
            </div>
        </div>
    );
};

export default ApplicationSpinner;
