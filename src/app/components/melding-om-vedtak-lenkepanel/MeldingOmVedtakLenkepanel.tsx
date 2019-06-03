import React from 'react';
import MediaQuery from 'react-responsive';
import { FormattedMessage } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import { Undertekst } from 'nav-frontend-typografi';

import KonfoluttIkon from '../ikoner/KonfoluttIkon';
import { lenker } from '../../utils/lenker';
import BEMHelper from 'common/util/bem';

import './meldingOmVedtakLenkepanel.less';

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
