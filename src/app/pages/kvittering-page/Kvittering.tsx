import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import * as moment from 'moment';
import { History } from 'history';

import { Kvittering } from '../../api/types/Kvittering';
import BEMHelper from 'common/util/bem';
import SpotlightLetter from 'common/components/ikoner/SpotlightLetter';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import ResponsiveWrapper from '../ResponsiveWrapper';
import Søknadstittel from 'common/components/søknadstittel/Søknadstittel';
import BackButton from 'common/components/back-button/BackButton';

import './kvittering.less';
import { Routes } from '../../utils/routes';

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
            <>
                <Søknadstittel>Ettersending av vedlegg</Søknadstittel>
                <div className={cls.className}>
                    <ResponsiveWrapper>
                        <BackButton hidden={false} onClick={() => this.handleBackClick()} />
                        <SpotlightLetter className={cls.element('logo')} width={136} height={136} />
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
                                attachments={attachments.map(
                                    ({ url, ...otherProperties }: Attachment) => otherProperties
                                )}
                                showFileSize={false}
                            />
                        </div>
                    </ResponsiveWrapper>
                </div>
            </>
        );
    }
}

export default KvitteringPage;
