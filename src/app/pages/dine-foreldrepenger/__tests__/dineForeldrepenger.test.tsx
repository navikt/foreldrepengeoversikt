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

    it('Saker should be sorted by descendig order', () => {
        const mockSaker = [
            { ...Saker.infotrygdSak, opprettet: '2017-01-01' },
            { ...Saker.fpsakSak, opprettet: '2019-01-01' },
            { ...Saker.fpsakSak, opprettet: '2018-07-22' },
            { ...Saker.fpsakSak, opprettet: '2018-05-15' }
        ];

        const wrapper = shallow(<DineForeldrepenger saker={mockSaker.slice()} history={historyMock} />);
        const saksoversiktList = wrapper.find(Saksoversikt);

        expect(saksoversiktList.at(0).props().sak).toEqual(mockSaker[1]);
        expect(saksoversiktList.at(1).props().sak).toEqual(mockSaker[2]);
        expect(saksoversiktList.at(2).props().sak).toEqual(mockSaker[3]);
        expect(saksoversiktList.at(3).props().sak).toEqual(mockSaker[0]);
    });
});
