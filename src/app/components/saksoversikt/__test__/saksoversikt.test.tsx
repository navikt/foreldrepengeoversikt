import * as React from 'react';
import { shallow } from 'enzyme';
import Saksoversikt from '../Saksoversikt';
const moment = require('moment');
import SakerMock from '../../../../../jest/__mocks__/Sak';

describe('Saksoversikt component', () => {
    it('Ettersendelse should be disabled if the 70 day deadline on ettersendelse has expired', () => {
        const opprettetDate = moment()
            .subtract(71, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <Saksoversikt
                sak={{ ...SakerMock.fpsakSak, opprettet: opprettetDate }}
                skalKunneSøkeOmEndring={false}
                history={jest.fn() as any}
            />
        );

        const uploadButton = wrapper.find({ className: 'saksoversikt__ettersendelse-btn' });
        expect(uploadButton.prop('disabled')).toBeTruthy();
    });

    it('Ettersendelse should be able enabled 70 days after the application is sent', () => {
        const opprettetDate = moment()
            .subtract(70, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <Saksoversikt
                sak={{ ...SakerMock.fpsakSak, opprettet: opprettetDate }}
                skalKunneSøkeOmEndring={false}
                history={jest.fn() as any}
            />
        );
        const uploadButton = wrapper.find({ className: 'saksoversikt__ettersendelse-btn' });
        expect(uploadButton.prop('disabled')).toBeFalsy();
    });

    it('Endringssøknad should be disabled if skalKunneSøkeOmEndring prop is false', () => {
        const opprettetDate = moment()
            .subtract(3, 'years')
            .subtract(1, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <Saksoversikt
                sak={{ ...SakerMock.fpsakSak, opprettet: opprettetDate }}
                skalKunneSøkeOmEndring={false}
                history={jest.fn() as any}
            />
        );
        const endringssøknadButton = wrapper.find({ className: 'saksoversikt__endringssoknad-btn' });
        expect(endringssøknadButton.prop('disabled')).toBeTruthy();
    });

    it('Endringssøknad should be enabled if skalKunneSøkeOmEndring prop is true', () => {
        const opprettetDate = moment()
            .subtract(3, 'years')
            .subtract(1, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <Saksoversikt
                sak={{ ...SakerMock.fpsakSak, opprettet: opprettetDate }}
                skalKunneSøkeOmEndring={true}
                history={jest.fn() as any}
            />
        );
        const endringssøknadButton = wrapper.find({ className: 'saksoversikt__endringssoknad-btn' });
        expect(endringssøknadButton.prop('disabled')).toBeFalsy();
    });
});
