import React from 'react';
import { Element } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import IconBox from 'app/components/ikoner/uttaksplanIkon/iconBox/IconBox';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import CollapsableTextBlock from 'app/components/collapsable-text-block/CollapsableTextBlock';

import './søknadsoversiktHendelseListeItem.less';

interface Props {
    color: UttaksplanColor;
    tittel: string;
    ikon?: React.ReactNode;
    content?: string | React.ReactNode;
    lesMerTittel?: string;
    lesMerInnhold?: string | React.ReactNode;
}

const cls = BEMHelper('søknadsoversiktHendelseListItem');

const SøknadsoversiktHendelseListeItem: React.StatelessComponent<Props> = ({
    ikon,
    color,
    tittel,
    content,
    lesMerTittel,
    lesMerInnhold,
}) => {
    return (
        <div className={cls.element('container')}>
            <div className={cls.element('ikon')}>
                <IconBox color={color}>{ikon}</IconBox>
            </div>
            <div className={cls.element('content')}>
                <Element>{tittel}</Element>
                {lesMerTittel && <CollapsableTextBlock title={lesMerTittel}>{lesMerInnhold}</CollapsableTextBlock>}
                {content !== undefined && content}
            </div>
        </div>
    );
};

export default SøknadsoversiktHendelseListeItem;
