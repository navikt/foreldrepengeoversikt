import * as React from 'react';
import MediaQuery from 'react-responsive';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, UndertekstBold, Undertittel } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';

import LightbulbIcon from '../ikoner/LightbulbIcon';
import CashIcon from '../ikoner/CashIcon';
import CashInHandIcon from '../ikoner/CashInHandIcon';

import './infoPanel.less';

interface Props {
    erNyesteSakEngangssønad: boolean;
}

const InfoPanel = ({ erNyesteSakEngangssønad }: Props) => {
    const cls = BEMHelper('info-panel');
    return (
        <aside className={cls.className}>
            <div className={cls.element('element')}>
                <LightbulbIcon className={cls.element('lightbulb-icon')} />
                <MediaQuery maxWidth={1114}>
                    <Undertittel>Greit for deg å vite</Undertittel>
                </MediaQuery>
                <MediaQuery minWidth={1114}>
                    <UndertekstBold className={cls.element('title')}><FormattedMessage id={"infopanel.title"}/></UndertekstBold>
                </MediaQuery>
            </div>

            <div className={cls.element('element')}>
                <CashIcon className={cls.element('icon')} />
                <Normaltekst>
                    {erNyesteSakEngangssønad ? (
                        <FormattedMessage id={'infopanel.utbetaling.engangsønad'} />
                    ) : (
                        <FormattedMessage id={'infopanel.utbetaling.foreldrepenger'} />
                    )}
                </Normaltekst>
            </div>

            <div className={cls.element('element')}>
                <CashInHandIcon className={cls.element('icon')} />
                <Normaltekst>
                    {erNyesteSakEngangssønad ? (
                        <FormattedMessage id={'infopanel.svarfrist.engangsønad'} />
                    ) : (
                        <FormattedMessage id={'infopanel.svarfrist.foreldrepenger'} />
                    )}
                </Normaltekst>
            </div>
        </aside>
    );
};

export default InfoPanel;
