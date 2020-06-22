import React from 'react';
import { guid } from 'nav-frontend-js-utils';

import InfoToggler from './InfoToggler';
import './utvidetInformasjon.less';
import EkspanderbartInnhold from './EkspanderbartInnhold';
import { Normaltekst } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface Props {
    children: React.ReactNode;
    apneLabel?: string;
    lukkLabel?: string;
}

const UtvidetInformasjon: React.FunctionComponent<Props> = ({ children, apneLabel, lukkLabel }) => {
    const innholdId = guid();
    const intl = useIntl();
    const [apen, setApen] = React.useState(false);

    return (
        <div className="utvidetInformasjon">
            <div className="utvidetInformasjon__toggler no-print">
                <InfoToggler onToggle={() => setApen(!apen)} apen={apen}>
                    <Normaltekst tag="span">
                        {apen ? lukkLabel || getMessage(intl, 'utvidetInformasjon.lukkTekst') : apneLabel}
                    </Normaltekst>
                </InfoToggler>
            </div>
            <div className="utvidetInformasjon__innhold" id={innholdId}>
                <EkspanderbartInnhold erApen={apen}>{children}</EkspanderbartInnhold>

                <div className="print-only">{children}</div>
            </div>
        </div>
    );
};

export default UtvidetInformasjon;
