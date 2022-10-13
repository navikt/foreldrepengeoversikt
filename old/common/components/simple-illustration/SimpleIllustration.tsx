import * as React from 'react';
import SpeechBubble from '../speech-bubble/SpeechBubble';
import Veileder, { VeilederProps } from '../old/common/components/veileder/Veileder';
import './simpleIllustration.less';

interface Props {
    dialog?: Dialog;
    veileder?: VeilederProps;
}

interface Dialog {
    title: string;
    text: string | React.ReactNode;
}

const SimpleIllustration: React.FunctionComponent<Props> = ({ dialog, veileder }) => {
    return (
        <div className="simpleIllustration">
            {dialog && (
                <div className="simpleIllustration__speechbubble">
                    <SpeechBubble title={dialog.title} text={dialog.text} />
                </div>
            )}
            <Veileder {...veileder} />
        </div>
    );
};

export default SimpleIllustration;
