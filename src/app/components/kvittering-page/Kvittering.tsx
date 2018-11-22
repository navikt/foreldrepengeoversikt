import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import * as moment from 'moment';

import { Kvittering } from '../../api/types/Kvittering';
import BEMHelper from 'common/util/bem';
import SpotlightLetter from 'common/components/ikoner/SpotlightLetter';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';

import './kvittering.less';

interface Props {
    kvittering: Kvittering;
    attachments: Attachment[];
}

const Kvittering: React.StatelessComponent<Props> = (props: Props) => {
    const cls = BEMHelper('kvittering');
    const { kvittering, attachments } = props;
    return (
        <div className={cls.className}>
            <SpotlightLetter className={cls.element('logo')} />
            <Innholdstittel className={cls.element('headline')}>
                <FormattedMessage id={'kvittering.headline'} />
            </Innholdstittel>
            <Ingress className={cls.element('message')}>
                <FormattedMessage
                    id={'kvittering.message'}
                    values={{
                        timeOfDay: moment(kvittering.mottattDato).format('HH:mm'),
                        date: moment(kvittering.mottattDato).format('LL')
                    }}
                />
            </Ingress>
            <div className={cls.element('attachment-list')}>
                <AttachmentList
                    intlKey={'kvittering.attachment-list-label'}
                    attachments={attachments.map(({ url, ...otherProperties }: Attachment) => otherProperties)}
                    showFileSize={false}
                />
            </div>
        </div>
    );
};
export default Kvittering;
