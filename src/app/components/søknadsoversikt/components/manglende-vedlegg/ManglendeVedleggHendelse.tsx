import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import Icon from 'nav-frontend-ikoner-assets';
import SøknadsoversiktHendelseListeItem from '../SøknadsoversiktHendelseListeItem';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import { ManglendeVedlegg } from 'app/api/types/sak/ManglendeVedlegg';
import getMessage from 'common/util/i18nUtils';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';

import './manglendeVeddleggHendelse.less';
import BEMHelper from 'common/util/bem';

interface Props {
    manglendeVedlegg: ManglendeVedlegg[];
    intl: InjectedIntl;
}

const bem = BEMHelper('manglendeVedleggHendelse');

const renderContent = (manglendeVedlegg: ManglendeVedlegg[], intl: InjectedIntl) => {
    return manglendeVedlegg.map((mv) => (
        <>
            <div className={bem.element('manglendeVedleggHendelseStatus')} key={guid()}>
                <Icon kind="advarsel-sirkel-fyll" width="24" height="24" />
                <div>
                    <Normaltekst>{getMessage(intl, `ettersendelse.${mv}`)}</Normaltekst>
                </div>
            </div>
        </>
    ));
};

const ManglendeVedleggHendelse: React.FunctionComponent<Props> = ({ manglendeVedlegg, intl }) => {
    return (
        <SøknadsoversiktHendelseListeItem
            ikon={<Icon kind="advarsel-sirkel-fyll" width="24" height="24" />}
            color={UttaksplanColor.transparent}
            tittel={getMessage(intl, 'manglendeVedleggHendelse.tittel')}
            content={renderContent(manglendeVedlegg, intl)}
        />
    );
};

export default injectIntl(ManglendeVedleggHendelse);
