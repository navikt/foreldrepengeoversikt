import * as React from 'react';
import KvitteringPage from '../Kvittering';
// @ts-ignore
import BackButton from 'common/components/back-button/BackButton';
import { LeveransesStatus } from 'app/api/types/ettersending/Kvittering';
// @ts-ignore
import { loadTranslationObject, shallowWithIntl } from 'enzyme-react-intl';
import translations from '../../../intl/nb_NO.json';
import { Skjemanummer } from 'common/storage/attachment/types/Skjemanummer';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Routes } from 'app/utils/routes';

loadTranslationObject(translations);

describe('Kvittering', () => {
    let historyMock: any;
    let mockAttachment: Attachment;
    
    beforeEach(() => {
        mockAttachment = {
            id: 'v123',
            file: new File([''], 'mock.pdf'),
            filesize: 1024,
            filename: 'mockFile.pdf',
            pending: false,
            url: undefined,
            skjemanummer: Skjemanummer.ANNET
        };

        historyMock = {
            push: jest.fn(),
            location: {
                state: {
                    kvittering: {
                        referanseId: '123',
                        mottattDato: '2019-01-01',
                        leveranseStatus: LeveransesStatus.SENDT_OG_FORSØKT_BEHANDLET_FPSAK,
                        journalId: '123',
                        saksNr: '123'
                    },
                    attachments: [mockAttachment]
                }
            }
        };
    });

    it('Should navigate to frontpage when back button is clicked', () => {
        const historySpy = jest.spyOn(historyMock, 'push');
        const wrapper = shallowWithIntl(<KvitteringPage history={historyMock} />).shallow();
        wrapper
            .find(BackButton)
            .simulate('click');
        expect(historySpy).toHaveBeenCalledWith(Routes.DINE_FORELDREPENGER);
    });
});
