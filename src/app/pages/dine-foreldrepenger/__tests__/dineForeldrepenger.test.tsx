import * as React from 'react';
import { shallow } from 'enzyme';
import DineForeldrepenger from '../DineForeldrepenger';
import { historyMock } from '../../../../../jest/__mocks__/History';
import Saksoversikt from '../../../components/saksoversikt/Saksoversikt';
import Saker from '../../../../../jest/__mocks__/Sak';
import IngenSaker from '../../../components/ingen-saker/IngenSaker';

describe('Dine Foreldrepenger page', () => {
    it('Should render ingen saker component if saker is an empty list', () => {
        const wrapper = shallow(<DineForeldrepenger saker={[]} history={historyMock} />);
        expect(wrapper.find(IngenSaker).length).toEqual(1);
    });

    it('Should render error message if error object is sent as props', () => {
        const wrapper = shallow(<DineForeldrepenger saker={[]} history={historyMock} error={{}} />);
        expect(wrapper.find({ id: 'dineForeldrepenger.feilmelding' }).length).toEqual(1);
    });

    it('Should render Saksoversikt for each element in saker', () => {
        const mockSaker = [Saker.infotrygdSak, Saker.fpsakSak];
        const wrapper = shallow(<DineForeldrepenger saker={mockSaker} history={historyMock} />);
        expect(wrapper.find(Saksoversikt).length).toEqual(mockSaker.length);
    });
});
