import * as React from 'react';
// @ts-ignore
import { shallowWithIntl, loadTranslationObject, mountWithIntl } from 'enzyme-react-intl';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import BackButton from 'common/components/back-button/BackButton';
import translations from '../../../intl/nb_NO.json';
import SakerMock from '../../../../../jest/__mocks__/Sak';
import { Skjemanummer } from 'common/storage/attachment/types/Skjemanummer';
import { Routes } from 'app/utils/routes';
import { Ettersendelse } from '../Ettersendelse';
import { shallow } from 'enzyme';

loadTranslationObject(translations);

describe('Ettersendelse page', () => {
    let historyMock: any;
    let mockAttachment: Attachment;
    beforeEach(() => {
        historyMock = {
            push: jest.fn()
        };
        mockAttachment = {
            id: 'v123',
            file: new File([''], 'mock.pdf'),
            filesize: 1024,
            filename: 'mockFile.pdf',
            pending: false,
            url: undefined,
            skjemanummer: Skjemanummer.TERMINBEKREFTELSE
        };
    });

    it('Should redirect back to front page if a sak object is not on state', () => {
        const historySpy = jest.spyOn(historyMock, 'push');
        shallow(
            <Ettersendelse
                history={historyMock}
                sak={undefined}
                attachments={[]}
                addAttachment={jest.fn()}
                editAttachment={jest.fn()}
                deleteAttachment={jest.fn()}
                isReadyToSendAttachments={true}
                sendEttersendelse={jest.fn()}
                intl={jest.genMockFromModule('react-intl')}
            />
        );
        expect(historySpy).toHaveBeenCalledWith(Routes.DINE_FORELDREPENGER);
    });

    it('Should navigate to frontpage when back button is clicked', () => {
        const historySpy = jest.spyOn(historyMock, 'push');
        const wrapper = mountWithIntl(
            <Ettersendelse
                history={historyMock}
                sak={SakerMock.fpsakFP}
                attachments={[]}
                addAttachment={jest.fn()}
                editAttachment={jest.fn()}
                deleteAttachment={jest.fn()}
                isReadyToSendAttachments={true}
                sendEttersendelse={jest.fn()}
                intl={jest.genMockFromModule('react-intl')}
            />
        ).mount();
        wrapper.find(BackButton).simulate('click');
        expect(historySpy).toHaveBeenCalledWith(Routes.DINE_FORELDREPENGER);
    });

    it('Attachment type dropdown should render', () => {
        const wrapper = shallowWithIntl(
            <Ettersendelse
                history={historyMock}
                sak={SakerMock.fpsakFP}
                attachments={[]}
                addAttachment={jest.fn()}
                editAttachment={jest.fn()}
                deleteAttachment={jest.fn()}
                isReadyToSendAttachments={true}
                sendEttersendelse={jest.fn()}
                intl={jest.genMockFromModule('react-intl')}
            />
        ).shallow();
        const attachmentTypeSelector = wrapper.find({ className: 'ettersendelse__attachment-type-select' });
        expect(attachmentTypeSelector.length).toEqual(1);
    });

    it('AttachmentUploader should only render when attachment type is selected in dropdown', () => {
        const wrapper = mountWithIntl(
            <Ettersendelse
                history={historyMock}
                sak={SakerMock.fpsakFP}
                attachments={[]}
                addAttachment={jest.fn()}
                editAttachment={jest.fn()}
                deleteAttachment={jest.fn()}
                isReadyToSendAttachments={true}
                sendEttersendelse={jest.fn()}
                intl={jest.genMockFromModule('react-intl')}
            />
        ).mount();
        expect(wrapper.find(AttachmentsUploader).length).toEqual(0);
        wrapper.find('select').simulate('change', { target: { value: Skjemanummer.TERMINBEKREFTELSE } });
        expect(wrapper.find(AttachmentsUploader).length).toEqual(1);
    });

    it('Send ettersendelse button should render when isReadyToSendAttachments is true', () => {
        const wrapper = shallowWithIntl(
            <Ettersendelse
                history={historyMock}
                sak={SakerMock.fpsakFP}
                attachments={[{ ...mockAttachment, url: 'mockUrl' }]}
                addAttachment={jest.fn()}
                editAttachment={jest.fn()}
                deleteAttachment={jest.fn()}
                isReadyToSendAttachments={true}
                sendEttersendelse={jest.fn()}
                intl={jest.genMockFromModule('react-intl')}
            />
        ).shallow();
        expect(wrapper.find({ className: 'ettersendelse__send-button' }).length).toEqual(1);
    });

    it('Send ettersendelse button should be hidden if isReadyToSendAttachments is set to false', () => {
        const wrapper = shallowWithIntl(
            <Ettersendelse
                history={historyMock}
                sak={SakerMock.fpsakFP}
                attachments={[{ ...mockAttachment, url: 'url' }]}
                addAttachment={jest.fn()}
                editAttachment={jest.fn()}
                deleteAttachment={jest.fn()}
                isReadyToSendAttachments={false}
                sendEttersendelse={jest.fn()}
                intl={jest.genMockFromModule('react-intl')}
            />
        ).shallow();
        expect(wrapper.find({ className: 'ettersendelse__send-button' }).length).toEqual(0);
    });

    // it('Should never send attachments that is not uploaded to storage', () => {
    //     const mockAttachments = [
    //         {
    //             ...mockAttachment,
    //             url: 'mockUrl',
    //             pending: false
    //         },
    //         {
    //             ...mockAttachment,
    //             url: undefined,
    //             pending: false
    //         }
    //     ];

    //     const sendEttersendelseMock = jest.fn();
    //     const wrapper = shallowWithIntl(
    //         <Ettersendelse
    //             history={historyMock}
    //             sak={SakerMock.fpsakFP}
    //             attachments={mockAttachments}
    //             addAttachment={jest.fn()}
    //             editAttachment={jest.fn()}
    //             deleteAttachment={jest.fn()}
    //             isReadyToSendAttachments={true}
    //             sendEttersendelse={sendEttersendelseMock}
    //             intl={jest.genMockFromModule('react-intl')}
    //         />
    //     )
    //         .setState({ attachmentSkjemanummer: Skjemanummer.TERMINBEKREFTELSE })
    //         .shallow();

    //     wrapper.find(Hovedknapp).simulate('click');

    //     expect(sendEttersendelseMock).toHaveBeenCalledTimes(1);
    //     expect(sendEttersendelseMock).toHaveBeenCalledWith({
    //         type: 'foreldrepenger',
    //         saksnummer: '123',
    //         vedlegg: [mockAttachments[0]]
    //     });
    // });

    it('attachment type dropdown should render all attachment types for saker from infotrygd', () => {
        const wrapper = shallowWithIntl(
            <Ettersendelse
                history={historyMock}
                sak={SakerMock.infotrygd}
                attachments={[]}
                addAttachment={jest.fn()}
                editAttachment={jest.fn()}
                deleteAttachment={jest.fn()}
                isReadyToSendAttachments={true}
                sendEttersendelse={jest.fn()}
                intl={jest.genMockFromModule('react-intl')}
            />
        ).shallow();
        expect(wrapper.find({ className: 'ettersendelse__attachment-type-select' }).children().length).toBe(
            Object.values(Skjemanummer).length + 1
        );
    });

    it('attachment type dropdown options should be sorted alphabetically except first element', () => {
        const wrapper = shallowWithIntl(
            <Ettersendelse
                history={historyMock}
                sak={SakerMock.infotrygd}
                attachments={[]}
                addAttachment={jest.fn()}
                editAttachment={jest.fn()}
                deleteAttachment={jest.fn()}
                isReadyToSendAttachments={true}
                sendEttersendelse={jest.fn()}
                intl={jest.genMockFromModule('react-intl')}
            />
        ).shallow();
        const dropdown = wrapper.find({ className: 'ettersendelse__attachment-type-select' });
        const selectOptions = dropdown.children();
        expect(
            selectOptions
                .map((children: any) => children.text())
                .every(
                    (text: string, index: number, selectOptions: string[]) =>
                        index === 0 || index === 1 || selectOptions[index - 1].localeCompare(text) <= 0
                )
        ).toBeTruthy();
    });

    it('attachment type dropdown should only render relevant attachment types for engangsstønad', () => {
        const wrapper = shallowWithIntl(
            <Ettersendelse
                history={historyMock}
                sak={SakerMock.fpsakES}
                attachments={[]}
                addAttachment={jest.fn()}
                editAttachment={jest.fn()}
                deleteAttachment={jest.fn()}
                isReadyToSendAttachments={true}
                sendEttersendelse={jest.fn()}
                intl={jest.genMockFromModule('react-intl')}
            />
        ).shallow();
        const dropdown = wrapper.find({ className: 'ettersendelse__attachment-type-select' });
        expect(dropdown.children().length).toBe(5);
    });

    it('attachment type dropdown should only render relevant attachment types for foreldrepengesøknad', () => {
        const wrapper = shallowWithIntl(
            <Ettersendelse
                history={historyMock}
                sak={SakerMock.fpsakFP}
                attachments={[]}
                addAttachment={jest.fn()}
                editAttachment={jest.fn()}
                deleteAttachment={jest.fn()}
                isReadyToSendAttachments={true}
                sendEttersendelse={jest.fn()}
                intl={jest.genMockFromModule('react-intl')}
            />
        ).shallow();
        const dropdown = wrapper.find({ className: 'ettersendelse__attachment-type-select' });
        expect(dropdown.children().length).toBe(20);
    });

    it('attachment type dropdown should only render relevant attachment types for foreldrepengesoknad with endring', () => {
        const wrapper = shallowWithIntl(
            <Ettersendelse
                history={historyMock}
                sak={SakerMock.fpsakEndring}
                attachments={[]}
                addAttachment={jest.fn()}
                editAttachment={jest.fn()}
                deleteAttachment={jest.fn()}
                isReadyToSendAttachments={true}
                sendEttersendelse={jest.fn()}
                intl={jest.genMockFromModule('react-intl')}
            />
        ).shallow();
        const dropdown = wrapper.find({ className: 'ettersendelse__attachment-type-select' });
        expect(dropdown.children().length).toBe(14);
    });
});
