import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { FormattedMessage, FormattedHTMLMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import { shouldChangeBrowser } from 'app/utils/browserUtils';

import { Hovedknapp } from 'nav-frontend-knapper';
import classNames from 'classnames';

import './byttBrowserModal.less';
import AdvarselIkonSirkel from 'app/components/ikoner/uttaksplanIkon/ikoner/AdvarselIkonSirkel';

type Props = InjectedIntlProps;

const ByttBrowserModal: React.FunctionComponent<Props> = ({ intl }) => {
    const [isOpen, toggleIsOpen] = React.useState(shouldChangeBrowser());
    const cls = BEMHelper('bytt-browser-modal');
    return (
        <Modal
            className={cls.block}
            contentLabel={getMessage(intl, 'byttBrowser.tittel')}
            closeButton={false}
            isOpen={isOpen}
            onRequestClose={() => undefined}>
            <AdvarselIkonSirkel width="42" height="42" className={classNames(cls.element('ikon'), 'blokk-m')} />
            <Systemtittel className="blokk-m">
                <FormattedHTMLMessage id="byttBrowser.tittel" />
            </Systemtittel>
            <Normaltekst className="blokk-m">
                <FormattedHTMLMessage id="byttBrowser.ingress" />
            </Normaltekst>
            <div className={cls.element('ok-knapp')}>
                <Hovedknapp className={cls.element('ok-knapp')} onClick={() => toggleIsOpen(false)}>
                    <FormattedMessage id="ok" />
                </Hovedknapp>
            </div>
        </Modal>
    );
};
export default injectIntl(ByttBrowserModal);
