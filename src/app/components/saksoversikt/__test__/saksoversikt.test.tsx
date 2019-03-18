import * as React from 'react';
import { shallow } from 'enzyme';
const moment = require('moment');
import SakerMock from '../../../../../jest/__mocks__/Sak';
import Saksoversikt from '../Saksoversikt';

describe('EkspanderbarSaksoversikt component', () => {
    it('Ettersendelse should be disabled if the 70 day deadline on ettersendelse has expired', () => {
        const opprettetDate = moment()
            .subtract(71, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <Saksoversikt
                sak={{ ...SakerMock.fpsakSak, opprettet: opprettetDate }}
                history={jest.fn() as any}
            />
        );

        const uploadButton = wrapper.find({ className: 'saksoversikt__ettersendelse-btn' });
        expect(uploadButton.props().disabled).toEqual(true);
    });

    it('Ettersendelse should be able enabled 70 days after the application is sent', () => {
        const opprettetDate = moment()
            .subtract(70, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <Saksoversikt
                sak={{ ...SakerMock.fpsakSak, opprettet: opprettetDate }}
                history={jest.fn() as any}
            />
        );
        const uploadButton = wrapper.find({ className: 'saksoversikt__ettersendelse-btn' });
        expect(uploadButton.length).toBe(1);
    });
});
