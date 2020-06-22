import React from 'react';
import { FormattedMessage, useIntl, IntlShape } from 'react-intl';
import Icon from 'nav-frontend-ikoner-assets';
import SøknadsoversiktHendelseListeItem from '../SøknadsoversiktHendelseListeItem';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import { ManglendeVedlegg } from 'app/api/types/sak/ManglendeVedlegg';
import getMessage from 'common/util/i18nUtils';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';

import './manglendeVeddleggHendelse.less';
import BEMHelper from 'common/util/bem';
import { Knapp } from 'nav-frontend-knapper';

interface Props {
    manglendeVedlegg: ManglendeVedlegg[];
    navigateToEttersendelse: () => void;
}

const bem = BEMHelper('manglendeVedleggHendelse');

const renderContent = (manglendeVedlegg: ManglendeVedlegg[], intl: IntlShape, navigateToEttersendelse: () => void) => {
    return (
        <>
            {manglendeVedlegg.map((mv) => {
                return (
                    <div className={bem.element('manglendeVedleggHendelseStatus')} key={guid()}>
                        <Icon kind="advarsel-sirkel-fyll" width="24" height="24" />
                        <div>
                            <Normaltekst>{getMessage(intl, `ettersendelse.${mv}`)}</Normaltekst>
                        </div>
                    </div>
                );
            })}
            <Knapp onClick={navigateToEttersendelse}>
                <FormattedMessage id="saksoversikt.content.ettersendelse.button" />
            </Knapp>
        </>
    );
};

const ManglendeVedleggHendelse: React.FunctionComponent<Props> = ({ manglendeVedlegg, navigateToEttersendelse }) => {
    const intl = useIntl();

    return (
        <SøknadsoversiktHendelseListeItem
            ikon={<Icon kind="advarsel-sirkel-fyll" width="24" height="24" />}
            color={UttaksplanColor.transparent}
            tittel={getMessage(intl, 'manglendeVedleggHendelse.tittel')}
            content={renderContent(manglendeVedlegg, intl, navigateToEttersendelse)}
        />
    );
};

export default ManglendeVedleggHendelse;
