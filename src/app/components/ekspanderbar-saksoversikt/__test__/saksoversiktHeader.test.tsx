import * as React from 'react';
import { shallow } from 'enzyme';
import EtikettBase from 'nav-frontend-etiketter';

import EkspanderbarSaksoversiktHeader from '../EkspanderbarSaksoversiktHeader';
import SakerMock from '../../../../../jest/__mocks__/Sak';
import { getIntlKeyForStatus } from '../util';
import { FagsakStatus } from '../../../types/FagsakStatus';

describe('EkspanderbarSaksoversiktHeader', () => {
    it('Should render status etikett for fpsak saker when status is defined', () => {
        const wrapper = shallow(<EkspanderbarSaksoversiktHeader sak={SakerMock.fpsakSak} />);
        expect(wrapper.find(EtikettBase).length).toEqual(1);
    });

    it('getIntlKeyForStatus should return correct string', () => {
        const underBehandlingIntlKey = 'saksoversikt.heading.underBehandling';
        const avsluttetIntlKey = 'saksoversikt.heading.avsluttet';
        expect(getIntlKeyForStatus(FagsakStatus.OPPRETTET)).toEqual(underBehandlingIntlKey);
        expect(getIntlKeyForStatus(FagsakStatus.UNDER_BEHANDLING)).toEqual(underBehandlingIntlKey);
        expect(getIntlKeyForStatus(FagsakStatus.LOPENDE)).toEqual(avsluttetIntlKey);
        expect(getIntlKeyForStatus(FagsakStatus.AVSLUTTET)).toEqual(avsluttetIntlKey);
    });

    it('Should render status etikett for fpsak saker when status is defined', () => {
        const wrapper = shallow(<EkspanderbarSaksoversiktHeader sak={SakerMock.fpsakSak} />);
        expect(wrapper.find(EtikettBase).length).toEqual(1);
    });
});
