import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import classNames from 'classnames';

import BEMHelper from 'common/util/bem';
import Søknadstittel from 'common/components/søknadstittel/Søknadstittel';
import BackButton from 'common/components/back-button/BackButton';

import './page.less';

interface Props {
    className?: string;
    pageTitle: string | React.ReactNode;
    icon: () => React.ReactNode;
    title: string | React.ReactNode;
    onBackClick?: () => void;
}

class Page extends React.Component<Props> {
    render() {
        const { className, onBackClick, icon, children, title } = this.props;
        const cls = BEMHelper('page');
        return (
            <div className={classNames(cls.className, { className })}>
                <Søknadstittel>{this.props.pageTitle}</Søknadstittel>
                <div className={cls.element('content')}>
                    {onBackClick && <BackButton hidden={false} onClick={onBackClick} />}
                    <div className={cls.element('icon')}>{icon && icon()}</div>
                    <Innholdstittel className={cls.element('title')}>{title}</Innholdstittel>
                    {children}
                </div>
            </div>
        );
    }
}
export default Page;
