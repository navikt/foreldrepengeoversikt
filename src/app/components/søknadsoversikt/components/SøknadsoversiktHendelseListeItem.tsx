import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';

import './søknadsoversiktHendelseListeItem.less';
import IconBox from 'app/components/ikoner/uttaksplanIkon/iconBox/IconBox';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';

interface Props {
    ikon: React.ReactNode;
    tittel: string;
    content?: string;
    color: UttaksplanColor;
    rightSideContent?: string;
}

const cls = BEMHelper('søknadsoversiktHendelseListItem');

const SøknadsoversiktHendelseListeItem: React.StatelessComponent<Props> = ({
    ikon,
    color,
    tittel,
    content,
    rightSideContent
}) => {
    return (
        <div className={cls.element('container')}>
            <div className={cls.element('ikon')}>
                <IconBox color={color}>{ikon}</IconBox>
            </div>
            <div className={cls.element('content')}>
                <Element>{tittel}</Element>
                {content && <Normaltekst>{content}</Normaltekst>}
            </div>
            <div className={cls.element('rightSide')}>{rightSideContent && 'Tekst'}</div>
        </div>
    );
};

export default SøknadsoversiktHendelseListeItem;
