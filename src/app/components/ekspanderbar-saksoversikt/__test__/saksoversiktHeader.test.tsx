import * as React from 'react';
import { shallow } from 'enzyme';
import EtikettBase from 'nav-frontend-etiketter';

import EkspanderbarSaksoversiktHeader from '../EkspanderbarSaksoversiktHeader';
import SakerMock from '../../../../../jest/__mocks__/Sak';

describe('EkspanderbarSaksoversiktHeader', () => {
    it('Should render status etikett for fpsak saker when status is defined', () => {
        const wrapper = shallow(<EkspanderbarSaksoversiktHeader sak={SakerMock.fpsakSak} />);
        expect(wrapper.find(EtikettBase).length).toEqual(1);
    });

    it('Should render status etikett for fpsak saker when status is defined', () => {
        const wrapper = shallow(<EkspanderbarSaksoversiktHeader sak={SakerMock.fpsakSak} />);
        expect(wrapper.find(EtikettBase).length).toEqual(1);
    });
});
