import * as React from 'react';
import { shallow } from 'enzyme';
import { DineForeldrepenger } from '../DineForeldrepenger';
import { historyMock } from '../../../../../jest/__mocks__/History';
import EkspanderbarSaksoversikt from '../../../components/ekspanderbar-saksoversikt/EkspanderbarSaksoversikt';
import SakerMock from '../../../../../jest/__mocks__/Sak';
import IngenSaker from '../../../components/ingen-saker/IngenSaker';

describe('Dine Foreldrepenger page', () => {
    it('Should render ingen saker component if saker is an empty list', () => {
        const wrapper = shallow(<DineForeldrepenger saker={[]} history={historyMock} />);
        expect(wrapper.find(IngenSaker).length).toEqual(1);
    });

    it('Should render EkspanderbarSaksoversikt for each element in saker except the newest', () => {
        const mockSaker = [SakerMock.infotrygd, SakerMock.fpsakFP];
        const wrapper = shallow(<DineForeldrepenger saker={mockSaker} history={historyMock} />);
        expect(wrapper.find(EkspanderbarSaksoversikt).length).toEqual(1);
    });
});
