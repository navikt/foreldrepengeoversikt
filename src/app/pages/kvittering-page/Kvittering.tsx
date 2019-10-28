import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Ingress } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
const moment = require('moment');
import { History } from 'history';

import { Kvittering } from '../../api/types/ettersending/Kvittering';
import BEMHelper from 'common/util/bem';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import { Routes } from '../../utils/routes';

import Page from '../page/Page';
import LetterIcon from 'app/components/ikoner/LetterIcon';

import './kvittering.less';

interface Props {
    history: History;
}

interface State {
    kvittering?: Kvittering;
    attachments?: Attachment[];
}

class KvitteringPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            attachments: [],
            ...this.props.history.location.state
        };

        if (!this.state.kvittering) {
            this.props.history.push(Routes.DINE_FORELDREPENGER);
        }

        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleBackClick(): void {
        this.props.history.push(Routes.DINE_FORELDREPENGER);
    }

    render() {
        const { kvittering, attachments } = this.state;
        if (kvittering === undefined || attachments === undefined) {
            return null;
        }

        const cls = BEMHelper('kvittering');
        return (
            <Page
                className={cls.block}
                pageTitle={<FormattedMessage id="ettersendelse.pageTitle" />}
                icon={() => <LetterIcon />}
                title={<FormattedMessage id="kvittering.headline" />}
                onBackClick={this.handleBackClick}>
                <Ingress className={cls.element('message')}>
                    <FormattedMessage
                        id="kvittering.message"
                        values={{
                            timeOfDay: moment(kvittering.mottattDato).format('HH:mm'),
                            date: moment(kvittering.mottattDato).format('LL')
                        }}
                    />
                </Ingress>
                <div className={cls.element('attachment-list')}>
                    <AttachmentList
                        intlKey="kvittering.attachment-list-label"
                        attachments={attachments.map(({ url, ...otherProperties }: Attachment) => otherProperties)}
                        showFileSize={false}
                    />
                </div>

                <div className={cls.element('tilbake-knapp')}>
                    <Knapp onClick={this.handleBackClick}>
                        <FormattedMessage id="kvittering.tilbake.knapp" />
                    </Knapp>
                </div>
            </Page>
        );
    }
}

export default KvitteringPage;
