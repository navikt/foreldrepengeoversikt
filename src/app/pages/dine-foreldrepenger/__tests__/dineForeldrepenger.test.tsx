import * as React from 'react';
import { shallow } from 'enzyme';
import DineForeldrepenger from '../DineForeldrepenger';
import { historyMock } from '../../../../../jest/__mocks__/History';
import EkspanderbarSaksoversikt from '../../../components/ekspanderbar-saksoversikt/EkspanderbarSaksoversikt';
import SakerMock from '../../../../../jest/__mocks__/Sak';
import IngenSaker from '../../../components/ingen-saker/IngenSaker';
import { Routes } from '../../../utils/routes';

describe('Dine Foreldrepenger page', () => {
    it('Should render ingen saker component if saker is an empty list', () => {
        const wrapper = shallow(<DineForeldrepenger saker={[]} history={historyMock} />);
        expect(wrapper.find(IngenSaker).length).toEqual(1);
    });

    it('Should render error message if error object is sent as props', () => {
        shallow(<DineForeldrepenger saker={[]} history={historyMock} error={{}} />);
        expect(historyMock.push).toHaveBeenCalledWith(Routes.FEIL, { error: true });
    });

    it('Should render EkspanderbarSaksoversikt for each element in saker', () => {
        const mockSaker = [SakerMock.infotrygdSak, SakerMock.fpsakSak];
        const wrapper = shallow(<DineForeldrepenger saker={mockSaker} history={historyMock} />);
        expect(wrapper.find(EkspanderbarSaksoversikt).length).toEqual(mockSaker.length);
    });

    /*
    it('Saker should be sorted by descendig order', () => {
        const mockSaker = [
            { ...SakerMock.infotrygdSak, opprettet: '2017-01-01' },
            { ...SakerMock.fpsakSak, opprettet: '2019-01-01' },
            { ...SakerMock.fpsakSak, opprettet: '2018-07-22' },
            { ...SakerMock.fpsakSak, opprettet: '2018-05-15' }
        ];

        const wrapper = shallow(<DineForeldrepenger saker={mockSaker.slice()} history={historyMock} />);
        const saksoversiktList = wrapper.find(EkspanderbarSaksoversikt);

        expect(saksoversiktList.at(0).props().sak).toEqual(mockSaker[1]);
        expect(saksoversiktList.at(1).props().sak).toEqual(mockSaker[2]);
        expect(saksoversiktList.at(2).props().sak).toEqual(mockSaker[3]);
        expect(saksoversiktList.at(3).props().sak).toEqual(mockSaker[0]);
    });
    */
});
