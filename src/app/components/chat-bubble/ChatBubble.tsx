import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel';

import BEMHelper from 'common/util/bem';
import SpeechBubble from '../ikoner/SpeechBubble';
import { lenker } from '../../utils/lenker';

import './chatBubble.less';

const ChatBubble = () => {
    const cls = BEMHelper('chat-bubble');
    return (
        <Lenkepanel className={cls.className} href={lenker.chatMedOss} tittelProps={'normaltekst'}>
            <SpeechBubble className={cls.element('icon')} />
            <Normaltekst tag={'span'}>
                <FormattedMessage id={'dineForeldrepenger.chatMedOss'} />
            </Normaltekst>
        </Lenkepanel>
    );
};

export default ChatBubble;
