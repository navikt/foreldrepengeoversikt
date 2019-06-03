import * as React from 'react';
import { shallow } from 'enzyme';
import EtikettBase from 'nav-frontend-etiketter';

import EkspanderbarSaksoversiktHeader from '../EkspanderbarSaksoversiktHeader';
import SakerMock from '../../../../../jest/__mocks__/Sak';

describe('EkspanderbarSaksoversiktHeader', () => {
    it('Should render status etikett for fpsak saker when fagsak status is defined', () => {
        const wrapper = shallow(<EkspanderbarSaksoversiktHeader sak={SakerMock.fpsakFP} />);
        expect(wrapper.find(EtikettBase).length).toEqual(1);
    });

    it('Should not render status etikett for fpsak saker when fagsak status is defined', () => {
        const wrapper = shallow(<EkspanderbarSaksoversiktHeader sak={SakerMock.infotrygd} />);
        expect(wrapper.find(EtikettBase).length).toEqual(0);
    });
});
