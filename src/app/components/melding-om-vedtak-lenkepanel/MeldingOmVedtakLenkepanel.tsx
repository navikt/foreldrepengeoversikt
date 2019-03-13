import React from 'react';
import MediaQuery from 'react-responsive';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';

import KonfoluttIkon from '../ikoner/KonfoluttIkon';
import { lenker } from '../../utils/lenker';
import { FormattedMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';

import './meldingOmVedtakLenkepanel.less';
import { Undertekst } from 'nav-frontend-typografi';

const MeldingOmVedtakLenkepanel = () => {
    const cls = BEMHelper('melding-om-vedtak-lenkepanel');
    return (
        <Lenkepanel className={cls.className} href={lenker.saksoversikt} tittelProps="element">
            <MediaQuery minWidth={576}>
                <span>
                    <KonfoluttIkon />
                </span>
            </MediaQuery>
            <span className={cls.element('tekst')}>
                <FormattedMessage id="meldingOmVedtak.tittel" />
                <Undertekst tag="div">
                    <FormattedMessage id="meldingOmVedtak.tekst" />
                </Undertekst>
            </span>
        </Lenkepanel>
    );
};

export default MeldingOmVedtakLenkepanel;