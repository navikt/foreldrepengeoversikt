import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { History } from 'history';

import BEMHelper from 'common/util/bem';
import Page from '../page/Page';
import CalendarIkon from 'app/components/ikoner/CalendarIkon';
import { Routes } from 'app/utils/routes';

import './dinPlan.less'

interface Props {
    history: History;
}

const DinPlan: React.StatelessComponent<Props> = (props) => {
    const cls = BEMHelper('din-plan');
    return (
        <Page
            className={cls.className}
            pageTitle={<FormattedMessage id="dinPlan.pageTitle" />}
            icon={() => <CalendarIkon />}
            title={<FormattedMessage id="dinPlan.title" />}
            onBackClick={() => props.history.push(Routes.DINE_FORELDREPENGER)}>
        </Page>
    );
};

export default DinPlan;
