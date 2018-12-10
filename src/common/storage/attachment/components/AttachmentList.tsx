import * as React from 'react';
import AttachmentComponent from './AttachmentListElement';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import './attachment.less';
import Block from 'common/components/block/Block';
import LabelText from 'common/components/labeltekst/Labeltekst';
import { FormattedMessage } from 'react-intl';
import { bytesString, getTotalFileSize } from 'common/util/filesize';

interface Props {
    attachments: Attachment[];
    showFileSize?: boolean;
    onDelete?: (files: Attachment[]) => void;
    intlKey?: string;
}

const AttachmentList = (props: Props) => {
    const { attachments, showFileSize, onDelete, intlKey } = props;
    return (
        <Block margin={'m'}>
            <Block margin="xs">
                <LabelText>
                    <FormattedMessage
                        id={intlKey ? intlKey : "vedlegg.liste.tittel"}
                        values={{
                            size: bytesString(getTotalFileSize(attachments.map((a: Attachment) => a.file)))
                        }}
                    />
                </LabelText>
            </Block>

            <ul className="attachmentList">
                <TransitionGroup>
                    {attachments.map((attachment, index) => (
                        <CSSTransition classNames="transitionFade" timeout={500} key={index}>
                            <li>
                                <AttachmentComponent
                                    attachment={attachment}
                                    onDelete={onDelete}
                                    showFileSize={showFileSize}
                                />
                            </li>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ul>
        </Block>
    );
};
export default AttachmentList;
