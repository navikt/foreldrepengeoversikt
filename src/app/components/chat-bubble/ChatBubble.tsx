import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel';

import BEMHelper from 'common/util/bem';
import SpeechBubble from '../ikoner/SpeechBubble';

import './chatBubble.less';
import { lenker } from '../../utils/lenker';

const ChatBubble = ({ row = false }) => {
    const cls = BEMHelper('chat-bubble');
    return (
        <Lenkepanel className={cls.className} href={lenker.chatMedOss.href} tittelProps={'normaltekst'}>
            <SpeechBubble className={cls.element('icon')} />
            <Normaltekst tag={'span'}>Chat med oss om dine foreldrepenger</Normaltekst>
        </Lenkepanel>
    );
};

export default ChatBubble;
