import * as React from 'react';
import { shallow } from 'enzyme';
import Saksoversikt from '../Saksoversikt';
const moment = require('moment');
import { Status } from '../../../types/Status';

describe('Saksoversikt component', () => {
    it('ettersendelse should be disabled if the 70 day deadline on ettersendelse has expired', () => {
        const opprettetDate = moment()
            .subtract(71, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <Saksoversikt
                sak={{
                    saksnummer: '123',
                    opprettet: opprettetDate,
                    status: Status.OPPRETTET
                }}
                onEttersendVedlegg={jest.fn()}
                onEndreSøknad={jest.fn()}
            />
        );
        const uploadButton = wrapper.find({ className: 'saksoversikt__ettersendelse-btn' });
        expect(uploadButton.prop('disabled')).toBeTruthy();
    });

    it('ettersendelse should be able enabled 70 days after the application is sent', () => {
        const opprettetDate = moment()
            .subtract(70, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <Saksoversikt
                sak={{
                    saksnummer: '123',
                    opprettet: opprettetDate,
                    status: Status.OPPRETTET
                }}
                onEttersendVedlegg={jest.fn()}
                onEndreSøknad={jest.fn()}
            />
        );
        const uploadButton = wrapper.find({ className: 'saksoversikt__ettersendelse-btn' });
        expect(uploadButton.prop('disabled')).toBeFalsy();
    });

    it('endringssøknad should be disabled if the 3 year deadline on ettersendelse has expired', () => {
        const opprettetDate = moment()
            .subtract(3, 'years')
            .subtract(1, 'days')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <Saksoversikt
                sak={{
                    saksnummer: '123',
                    opprettet: opprettetDate,
                    status: Status.OPPRETTET
                }}
                onEttersendVedlegg={jest.fn()}
                onEndreSøknad={jest.fn()}
            />
        );
        const endringssøknadButton = wrapper.find({ className: 'saksoversikt__endringssoknad-btn' });
        expect(endringssøknadButton.prop('disabled')).toBeTruthy();
    });

    it('endringssøknad should be able enabled 3 years after the application is sent', () => {
        const opprettetDate = moment()
            .subtract(3, 'years')
            .format('YYYY-MM-DD');

        const wrapper = shallow(
            <Saksoversikt
                sak={{
                    saksnummer: '123',
                    opprettet: opprettetDate,
                    status: Status.OPPRETTET
                }}
                onEttersendVedlegg={jest.fn()}
                onEndreSøknad={jest.fn()}
            />
        );
        const endringssøknadButton = wrapper.find({ className: 'saksoversikt__endringssoknad-btn' });
        expect(endringssøknadButton.prop('disabled')).toBeFalsy();
    });
});
