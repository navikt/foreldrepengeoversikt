import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Select, Input } from 'nav-frontend-skjema';
import { History } from 'history';

import SakBase from '../../api/types/sak/Sak';
import BEMHelper from '../../../common/util/bem';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import EttersendingDto from '../../api/types/ettersending/EttersendingDto';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import LetterIcon from '../../components/ikoner/LetterIcon';
import { getAttachmentTypeSelectOptions, getListOfUniqueSkjemanummer, getEttersendingType } from './util';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import { Routes } from '../../utils/routes';

import { Skjemanummer } from 'common/storage/attachment/types/Skjemanummer';
import Page from '../page/Page';
import { withAttachments, AttachmentFormProps } from 'app/components/attachmentForm/AttachmentForm';
import { AppState } from 'app/redux/store';

import { getData } from 'app/redux/util/fetchFromState';
import { InnsendingAction, InnsendingActionTypes } from 'app/redux/types/InnsendingAction';

import './ettersendelse.less';

interface EttersendelseProps {
    sak?: SakBase;
    history: History;
    sendEttersendelse: (ettersendingDto: EttersendingDto) => void;
}

interface State {
    attachmentSkjemanummer?: Skjemanummer;
    attachmentBeskrivelse?: string;
    sendingEttersendelse: boolean;
}

type Props = EttersendelseProps & InjectedIntlProps;
export class Ettersendelse extends React.Component<Props & AttachmentFormProps, State> {
    constructor(props: Props & AttachmentFormProps) {
        super(props);
        this.state = {
            sendingEttersendelse: false
        };

        if (props.sak === undefined) {
            props.history.push(Routes.DINE_FORELDREPENGER);
        }

        this.sendEttersendelse = this.sendEttersendelse.bind(this);
        this.handleAttachmentTypeSelectChange = this.handleAttachmentTypeSelectChange.bind(this);
        this.handleAttachmentBeskrivelseOnChange = this.handleAttachmentBeskrivelseOnChange.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleBackClick(): void {
        this.props.history.push(Routes.DINE_FORELDREPENGER);
    }

    handleAttachmentTypeSelectChange(e: any): void {
        const selectedValue = e.target.value;
        this.setState({ attachmentSkjemanummer: selectedValue !== '' ? selectedValue : undefined });
    }

    onSubmit(): void {
        const { sak, isReadyToSendAttachments } = this.props;
        if (isReadyToSendAttachments && sak) {
            this.setState({ sendingEttersendelse: true }, () => this.sendEttersendelse(sak));
        }
    }

    sendEttersendelse(sak: SakBase): void {
        const ettersending: EttersendingDto = {
            type: getEttersendingType(sak),
            saksnummer: sak.saksnummer!,
            vedlegg: this.props.attachments.filter((a: Attachment) => !isAttachmentWithError(a))
        };
        this.props.sendEttersendelse(ettersending);
    }

    isReadyToUploadAttachments(): boolean {
        const { attachmentSkjemanummer } = this.state;
        if (attachmentSkjemanummer === Skjemanummer.ANNET) {
            return this.state.attachmentBeskrivelse !== undefined && this.state.attachmentBeskrivelse !== '';
        }
        return attachmentSkjemanummer !== undefined;
    }

    isAttachmentOfTypeAnnet(): boolean {
        return this.state.attachmentSkjemanummer === Skjemanummer.ANNET;
    }

    handleAttachmentBeskrivelseOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ attachmentBeskrivelse: e.target.value });
    }

    render() {
        const {
            intl,
            sak,
            attachments,
            addAttachment,
            deleteAttachment,
            editAttachment,
            isReadyToSendAttachments
        } = this.props;
        const { attachmentSkjemanummer, sendingEttersendelse } = this.state;

        if (!sak) {
            return null;
        }

        const uploadedAttachments = attachments.filter((a: Attachment) => !isAttachmentWithError(a));
        const cls = BEMHelper('ettersendelse');
        return (
            <Page
                className={cls.block}
                pageTitle={<FormattedMessage id="ettersendelse.pageTitle" />}
                icon={() => <LetterIcon />}
                title={<FormattedMessage id="ettersendelse.title" values={{ saksnummer: sak.saksnummer }} />}
                onBackClick={this.handleBackClick}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.onSubmit();
                    }}>
                    <Select
                        className={cls.element('attachment-type-select')}
                        label={
                            <Element>
                                <FormattedMessage id="ettersendelse.vedlegg.select.label" />
                            </Element>
                        }
                        onChange={this.handleAttachmentTypeSelectChange}
                        defaultValue="default">
                        {getAttachmentTypeSelectOptions(intl, sak)}
                    </Select>

                    {this.isAttachmentOfTypeAnnet() && (
                        <Input
                            className={cls.element('attachment-description')}
                            label={
                                <Element>
                                    <FormattedMessage id="ettersendelse.vedlegg.beskrivelse" />
                                </Element>
                            }
                            onChange={this.handleAttachmentBeskrivelseOnChange}
                        />
                    )}

                    {this.isReadyToUploadAttachments() && (
                        <div className={cls.element('uploader')}>
                            <AttachmentsUploader
                                attachments={attachments}
                                skjemanummer={attachmentSkjemanummer ? attachmentSkjemanummer : Skjemanummer.ANNET}
                                onFilesUploadStart={addAttachment}
                                onFileUploadFinish={editAttachment}
                                onFileDeleteStart={deleteAttachment}
                            />
                        </div>
                    )}

                    {getListOfUniqueSkjemanummer(uploadedAttachments).map((skjemanummer: Skjemanummer) => (
                        <AttachmentList
                            key={skjemanummer}
                            intlKey={`ettersendelse.${skjemanummer}`}
                            onDelete={deleteAttachment}
                            attachments={uploadedAttachments.filter((a: Attachment) => a.skjemanummer === skjemanummer)}
                        />
                    ))}

                    {isReadyToSendAttachments && (
                        <div className={cls.element('send-button')}>
                            <Hovedknapp disabled={sendingEttersendelse} spinner={sendingEttersendelse}>
                                <FormattedMessage id="ettersendelse.sendButton" />
                            </Hovedknapp>
                        </div>
                    )}
                </form>
            </Page>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props) => {
    const params = new URLSearchParams(props.history.location.search);
    const sak = getData(state.api.saker, []).find((s) => s.saksnummer === params.get('saksnummer'));
    return {
        sak
    };
};

const mapDispatchToProps = (dispatch: (action: InnsendingAction) => void, props: Props) => ({
    sendEttersendelse: (ettersendelse: EttersendingDto) => {
        dispatch({
            type: InnsendingActionTypes.SEND_ETTERSENDELSE,
            payload: {
                ettersending: ettersendelse,
                history: props.history
            }
        });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(withAttachments<Props>(Ettersendelse)));
