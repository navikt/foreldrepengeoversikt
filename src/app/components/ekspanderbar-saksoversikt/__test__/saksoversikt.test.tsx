import * as React from 'react';
import { shallow } from 'enzyme';
import EkspanderbarSaksoversikt from '../EkspanderbarSaksoversikt';
const moment = require('moment');
import SakerMock from '../../../../../jest/__mocks__/Sak';

describe('EkspanderbarSaksoversikt component', () => {
    it('Ettersendelse should be disabled if the 70 day deadline on ettersendelse has expired', () => {
        const opprettetDate = moment()
            .subtract(71, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <EkspanderbarSaksoversikt
                sak={{ ...SakerMock.fpsakSak, opprettet: opprettetDate }}
                history={jest.fn() as any}
            />
        );

        const uploadButton = wrapper.find({ className: 'saksoversikt__ettersendelse-btn' });
        expect(uploadButton.length).toEqual(0);
    });

    it('Ettersendelse should be able enabled 70 days after the application is sent', () => {
        const opprettetDate = moment()
            .subtract(70, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <EkspanderbarSaksoversikt
                sak={{ ...SakerMock.fpsakSak, opprettet: opprettetDate }}
                history={jest.fn() as any}
            />
        );
        const uploadButton = wrapper.find({ className: 'saksoversikt__ettersendelse-btn' });
        expect(uploadButton.length).toBe(1);
    });
});
