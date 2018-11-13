import * as React from 'react';
import { shallow } from 'enzyme';
import Ettersendelse from '../Ettersendelse';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Status } from '../../../types/Status';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Attachment, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import Api from '../../../api/api';
import BackButton from 'common/components/back-button/BackButton';

describe('Ettersendelse page', () => {
    let historyMock: any;
    let mockAttachment: Attachment;
    beforeEach(() => {
        historyMock = {
            push: jest.fn(),
            location: {
                state: {
                    sak: {
                        saksnummer: '123',
                        opprettet: new Date(),
                        status: Status.OPPRETTET
                    }
                }
            }
        };

        mockAttachment = {
            id: 'id',
            type: AttachmentType.ETTERSENDELSE,
            file: new File([''], 'mockFile.pdf'),
            filesize: 1024,
            filename: 'mockFile.pdf',
            uploaded: true,
            pending: false,
            url: 'mockUrl',
            skjemanummer: Skjemanummer.ANNET
        };
    });

    it('Should redirect back to frontpage if sak is not on state', () => {
        historyMock.location.state.sak = undefined;
        const historySpy = jest.spyOn(historyMock, 'push');
        shallow(<Ettersendelse history={historyMock} />).setState({
            attachments: [mockAttachment],
            sak: undefined
        });
        expect(historySpy).toHaveBeenCalledWith('/');
    });

    it('Should navigate to frontpage when back button is clicked', () => {
        const historySpy = jest.spyOn(historyMock, 'push');
        const wrapper = shallow(<Ettersendelse history={historyMock} />);
        wrapper.find(BackButton).simulate('click');
        expect(historySpy).toHaveBeenCalledWith('/');
    });

    it('AttachmentUploader should always render', () => {
        const wrapper = shallow(<Ettersendelse history={historyMock} />);
        const attachmentUploader = wrapper.find(AttachmentsUploader);
        expect(attachmentUploader).toBeDefined();
    });

    it('Send ettersendelse button should be hidden if no attachments are uploaded to storage', () => {
        const wrapper = shallow(<Ettersendelse history={historyMock} />);
        const ettersendVedleggButton = wrapper.find({ className: 'ettersendelse__send-button' });
        expect(ettersendVedleggButton.length).toEqual(0);
    });

    it('Send ettersendelse button should be rendered if some attachments are uploaded to storage and no attachments are pending', () => {
        const wrapper = shallow(<Ettersendelse history={historyMock} />);
        wrapper.setState({ attachments: [mockAttachment] });
        const ettersendVedleggButton = wrapper.find({ className: 'ettersendelse__send-button' });
        expect(ettersendVedleggButton.length).toEqual(1);
    });

    it('Send ettersendelse button should be hidden if an attachment upload is pending', () => {
        const wrapper = shallow(<Ettersendelse history={historyMock} />);
        mockAttachment.uploaded = false;
        mockAttachment.pending = true;
        wrapper.setState({ attachments: [mockAttachment] });
        const ettersendVedleggButton = wrapper.find({ className: 'ettersendelse__send-button' });
        expect(ettersendVedleggButton.length).toEqual(0);
    });

    it('Should never send attachments that is not uploaded to storage', () => {
        const apiMock = jest.spyOn(Api, 'sendEttersending');
        const mockAttachments = [
            {
                ...mockAttachment,
                uploaded: true,
                pending: false
            },
            {
                ...mockAttachment,
                uploaded: false,
                pending: false
            }
        ];

        const wrapper = shallow(<Ettersendelse history={historyMock} />);
        wrapper.setState({
            saksnummer: '123',
            attachments: mockAttachments
        });

        const ettersendVedleggButton = wrapper.find({ className: 'ettersendelse__send-button' }).childAt(0);
        ettersendVedleggButton.simulate('click');
        expect(apiMock).toHaveBeenCalledWith({
            saksnummer: '123',
            vedlegg: [mockAttachments[0]]
        });
    });

    it('Send ettersendelse button should be hidden if an attachment upload is pending', () => {
        const wrapper = shallow(<Ettersendelse history={historyMock} />);
        mockAttachment.uploaded = false;
        mockAttachment.pending = true;
        wrapper.setState({ attachments: [mockAttachment] });
        const ettersendVedleggButton = wrapper.find({ className: 'ettersendelse__send-button' });
        expect(ettersendVedleggButton.length).toEqual(0);
    });
});
