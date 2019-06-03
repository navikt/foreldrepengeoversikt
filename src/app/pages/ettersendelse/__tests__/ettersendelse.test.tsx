import * as React from 'react';
// @ts-ignore
import { shallowWithIntl, loadTranslationObject } from 'enzyme-react-intl';
import Ettersendelse from '../Ettersendelse';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { FagsakStatus } from '../../../types/FagsakStatus';
import { Attachment, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import Api from '../../../api/api';
import BackButton from 'common/components/back-button/BackButton';

import translations from '../../../intl/nb_NO.json';
import SakerMock from '../../../../../jest/__mocks__/Sak';
loadTranslationObject(translations);

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
                        opprettet: new Date('2018-10-1'),
                        status: FagsakStatus.OPPRETTET
                    }
                }
            }
        };

        mockAttachment = {
            id: 'v123',
            file: new File([''], 'mock.pdf'),
            filesize: 1024,
            filename: 'mockFile.pdf',
            pending: false,
            url: undefined,
            skjemanummer: Skjemanummer.ANNET
        };
    });

    it('Should redirect back to front page if a sak object is not on state', () => {
        historyMock.location.state.sak = undefined;
        const historySpy = jest.spyOn(historyMock, 'push');
        shallowWithIntl(<Ettersendelse history={historyMock} />)
            .setState({
                sak: undefined
            })
            .shallow();
        expect(historySpy).toHaveBeenCalledWith('/');
    });

    it('Should navigate to frontpage when back button is clicked', () => {
        const historySpy = jest.spyOn(historyMock, 'push');
        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />).shallow();
        wrapper.find(BackButton).simulate('click');
        expect(historySpy).toHaveBeenCalledWith('/');
    });

    it('Letter icon should render', () => {
        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />).shallow();
        const letterIcon = wrapper.find({ className: 'ettersendelse__letter-icon' });
        expect(letterIcon.length).toEqual(1);
    });

    it('Attachment type dropdown should render', () => {
        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />).shallow();
        const attachmentTypeSelector = wrapper.find({ className: 'ettersendelse__attachment-type-select' });
        expect(attachmentTypeSelector.length).toEqual(1);
    });

    it('AttachmentUploader should only render when attachment type is selected in dropdown', () => {
        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />).shallow();
        let attachmentUploader = wrapper.find(AttachmentsUploader);
        expect(attachmentUploader.length).toEqual(0);

        wrapper
            .find({ className: 'ettersendelse__attachment-type-select' })
            .simulate('change', { target: { value: Skjemanummer.TERMINBEKREFTELSE } });

        attachmentUploader = wrapper.find(AttachmentsUploader);
        expect(attachmentUploader.length).toEqual(1);
    });

    it('Send ettersendelse button should render when at least one uploaded attachment is on component state', () => {
        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />).shallow();
        let ettersendVedleggButton = wrapper.find({ className: 'ettersendelse__send-button' });
        expect(ettersendVedleggButton.length).toEqual(0);
        mockAttachment.url = 'mockUrl';
        wrapper.setState({ attachments: [mockAttachment] });
        ettersendVedleggButton = wrapper.find({ className: 'ettersendelse__send-button' });
        expect(ettersendVedleggButton.length).toEqual(1);
    });

    it('Send ettersendelse button should be hidden if an attachment upload is pending', () => {
        mockAttachment.url = undefined;
        mockAttachment.pending = true;
        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />)
            .setState({ attachments: [mockAttachment] })
            .shallow();

        const ettersendVedleggButton = wrapper.find({ className: 'ettersendelse__send-button' });
        expect(ettersendVedleggButton.length).toEqual(0);
    });

    it('Should never send attachments that is not uploaded to storage', () => {
        const apiMock = jest.spyOn(Api, 'sendEttersending');
        const mockAttachments = [
            {
                ...mockAttachment,
                url: 'mockUrl',
                pending: false
            },
            {
                ...mockAttachment,
                url: undefined,
                pending: false
            }
        ];

        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />).shallow();
        wrapper.setState({ attachments: mockAttachments });
        wrapper
            .find({ className: 'ettersendelse__attachment-type-select' })
            .simulate('change', { target: { value: Skjemanummer.TERMINBEKREFTELSE } });

        const ettersendVedleggButton = wrapper.find({ className: 'ettersendelse__send-button' }).childAt(0);
        ettersendVedleggButton.simulate('click');
        expect(apiMock).toHaveBeenCalledWith({
            type: 'foreldrepenger',
            saksnummer: '123',
            vedlegg: [mockAttachments[0]]
        });
    });

    it('Send ettersendelse button should be hidden if an attachment upload is pending', () => {
        mockAttachment.url = undefined;
        mockAttachment.pending = true;
        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />)
            .setState({
                attachments: [mockAttachment]
            })
            .shallow();

        const ettersendVedleggButton = wrapper.find({ className: 'ettersendelse__send-button' });
        expect(ettersendVedleggButton.length).toEqual(0);
    });

    it('attachment type dropdown should render all attachment types for saker from infotrygd', () => {
        historyMock.location.state.sak = { ...SakerMock.infotrygd };
        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />).shallow();
        const dropdown = wrapper.find({ className: 'ettersendelse__attachment-type-select' });
        expect(dropdown.children().length).toBe(Object.values(Skjemanummer).length + 1);
    });

    it('attachment type dropdown should only render relevant attachment types for engangsstønad', () => {
        historyMock.location.state.sak = SakerMock.fpsakES
        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />).shallow();
        const dropdown = wrapper.find({ className: 'ettersendelse__attachment-type-select' });
        expect(dropdown.children().length).toBe(4);
    });

    it('attachment type dropdown should only render relevant attachment types for foreldrepengesøknad', () => {
        historyMock.location.state.sak = SakerMock.fpsakFP;
        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />).shallow();
        const dropdown = wrapper.find({ className: 'ettersendelse__attachment-type-select' });
        expect(dropdown.children().length).toBe(Object.values(Skjemanummer).length + 1);
    });

    it('attachment type dropdown should only render relevant attachment types for foreldrepengesoknad with endring', () => {
        historyMock.location.state.sak = SakerMock.fpsakEndring;
        const wrapper = shallowWithIntl(<Ettersendelse history={historyMock} />).shallow();
        const dropdown = wrapper.find({ className: 'ettersendelse__attachment-type-select' });
        expect(dropdown.children().length).toBe(10);
    });
});
