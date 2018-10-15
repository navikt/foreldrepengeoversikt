import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Kvittering from '../../api/types/Kvittering';
import BEMHelper from 'common/util/bem';
import SpotlightLetter from 'common/components/ikoner/SpotlightLetter';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import LabelText from 'common/components/labeltekst/Labeltekst';
import { bytesString, getTotalFileSize } from 'common/util/filesize';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import * as moment from 'moment';

import './ettersendingKvittering.less';

interface Props {
    kvittering: Kvittering;
    attachments: Attachment[];
}

export const EttersendingKvittering: React.StatelessComponent<Props> = (props: Props) => {
    const cls = BEMHelper('kvittering');
    const { kvittering, attachments } = props;
    return (
        <div className={cls.className}>
            <SpotlightLetter className={cls.element('logo')} />
            <Innholdstittel className={cls.element('headline')}>Ettersendelsen er mottat!</Innholdstittel>
            <Ingress className={cls.element('message')}>
                <FormattedMessage
                    id={'kvittering.message'}
                    values={{
                        timeOfDay: moment(kvittering.mottattDato).format('HH:mm'),
                        date: moment(kvittering.mottattDato).format('LL')
                    }}
                />
            </Ingress>
            <div className={cls.element('attachment-list-label')}>
                <LabelText>
                    Innsendte vedlegg ( {bytesString(getTotalFileSize(attachments.map((a: Attachment) => a.file)))} )
                </LabelText>
            </div>
            <div className={cls.element('attachment-list')}>
                <AttachmentList
                    attachments={attachments.map(({ url, ...otherProperties }: Attachment) => otherProperties)}
                    showFileSize={false}
                />
            </div>
        </div>
    );
};
export default EttersendingKvittering;
