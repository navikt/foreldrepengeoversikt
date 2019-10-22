import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import Icon from 'nav-frontend-ikoner-assets';
import moment from 'moment';

import { MinidialogInnslag } from 'app/api/types/historikk/HistorikkInnslag';

import BEMHelper from 'common/util/bem';
import { Routes } from 'app/utils/routes';

import './minidialogLenkepanel.less';

interface Props {
    minidialogInnslag: MinidialogInnslag;
}

const MinidialogLenkepanel: React.StatelessComponent<Props> = ({ minidialogInnslag }) => {
    const linkCreator = (props: any) => (
        <Link
            to={{
                pathname: Routes.MINIDIALOG,
                search: new URLSearchParams({ dialogId: minidialogInnslag.dialogId }).toString()
            }}
            {...props}>
            {props.children}
        </Link>
    );

    const cls = BEMHelper('minidalog-lenkepanel');
    return (
        <LenkepanelBase className={cls.className} href="#" border={true} linkCreator={linkCreator}>
            <div className={cls.element('content')}>
                <div className={cls.element('icon')}>
                    <Icon kind="advarsel-sirkel-fyll" />
                </div>
                <div>
                    <Normaltekst>{minidialogInnslag.hendelse}</Normaltekst>
                    <Normaltekst>{moment(minidialogInnslag.opprettet).format('YYYY-MM-DD')}</Normaltekst>
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default MinidialogLenkepanel;
