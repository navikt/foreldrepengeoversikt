import * as React from 'react';
import { shallow } from 'enzyme';
const moment = require('moment');
import SakerMock from '../../../../../jest/__mocks__/Sak';
import Saksoversikt from '../Saksoversikt';

describe('EkspanderbarSaksoversikt component', () => {
    it('Ettersendelse should be disabled if sak is from infotrygd and the 150 day deadline on ettersendelse has expired', () => {
        const opprettetDate = moment()
            .subtract(151, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <Saksoversikt
                sak={{ ...SakerMock.infotrygd, opprettet: opprettetDate }}
                history={jest.fn() as any}
            />
        );

        const uploadButton = wrapper.find({ className: 'saksoversikt__ettersendelse-btn' });
        expect(uploadButton.props().disabled).toBeTruthy();
    });

    it('Ettersendelse should be enabled 150 days after the application is sent if sak is from infotrygd', () => {
        const opprettetDate = moment()
            .subtract(149, 'days')
            .format('YYYY-MM-DD');
       
        const wrapper = shallow(
            <Saksoversikt
                sak={{ ...SakerMock.infotrygd, opprettet: opprettetDate }}
                history={jest.fn() as any}
            />
        );
        const ettersendelseButton = wrapper.find({ className: 'saksoversikt__ettersendelse-btn' });
        expect(ettersendelseButton.props().disabled).toBeFalsy();
    });
});
