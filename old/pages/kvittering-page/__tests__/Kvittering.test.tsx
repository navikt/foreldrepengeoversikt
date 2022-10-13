import * as React from 'react';
import KvitteringPage from '../Kvittering';
import { LeveransesStatus } from 'app/api/types/ettersending/Kvittering';
import { Skjemanummer } from '../old/common/storage/attachment/types/Skjemanummer';
import { Attachment } from '../old/common/storage/attachment/types/Attachment';
import { Routes } from 'app/utils/routes';
import { shallow } from 'enzyme';
import { Knapp } from 'nav-frontend-knapper';

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
            skjemanummer: Skjemanummer.ANNET,
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
                        saksNr: '123',
                    },
                    attachments: [mockAttachment],
                },
            },
        };
    });

    it('Should navigate to frontpage when back button is clicked', () => {
        const historySpy = jest.spyOn(historyMock, 'push');
        const wrapper = shallow(<KvitteringPage history={historyMock} />);
        wrapper.find(Knapp).simulate('click');
        expect(historySpy).toHaveBeenCalledWith(Routes.DINE_FORELDREPENGER);
    });
});
