import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Link } from 'react-router-dom';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Icon from 'nav-frontend-ikoner-assets';
import { MinidialogInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import BEMHelper from '../old/common/util/bem';
import { Routes } from 'app/utils/routes';
import { formaterDato } from 'app/utils/dateUtils';

import './minidialogLenkepanel.less';

interface Props {
    tittel: React.ReactNode | string;
    minidialogInnslag: MinidialogInnslag;
}

const MinidialogLenkepanel: React.FunctionComponent<Props> = ({ tittel, minidialogInnslag }) => {
    const linkCreator = (props: any) => (
        <Link
            to={{
                pathname: Routes.MINIDIALOG,
                search: new URLSearchParams({ dialogId: minidialogInnslag.dialogId }).toString(),
            }}
            {...props}
        >
            {props.children}
        </Link>
    );

    const cls = BEMHelper('minidalog-lenkepanel');
    return (
        <LenkepanelBase className={cls.block} href="#" border={true} linkCreator={linkCreator}>
            <div className={cls.element('content')}>
                <div className={cls.element('icon')}>
                    <Icon kind="advarsel-sirkel-fyll" size="24" />
                </div>
                <div>
                    <Normaltekst>{tittel}</Normaltekst>
                    <Undertekst>{formaterDato(minidialogInnslag.opprettet, 'DD.MM.YYYY')}</Undertekst>
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default MinidialogLenkepanel;
