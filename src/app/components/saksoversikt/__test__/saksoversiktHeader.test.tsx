import * as React from 'react';
import { shallow } from 'enzyme';
import EtikettBase from 'nav-frontend-etiketter';

import SaksoversiktHeader from '../SaksoversiktHeader';
import Saker from '../../../../../jest/__mocks__/Sak';
import { getIntlKeyForStatus } from '../util';
import { Status } from '../../../types/Status';

describe('SaksoversiktHeader', () => {
    it('Should render status etikett for fpsak saker where status is present', () => {
        const wrapper = shallow(<SaksoversiktHeader sak={Saker.fpsakSak} />);
        expect(wrapper.find(EtikettBase).length).toEqual(1);
    });

    it('getIntlKeyForStatus should return correct string', () => {
        const underBehandlingIntlKey = 'saksoversikt.heading.underBehandling';
        const avsluttetIntlKey = 'saksoversikt.heading.avsluttet';
        expect(getIntlKeyForStatus(Status.OPPRETTET)).toEqual(underBehandlingIntlKey);
        expect(getIntlKeyForStatus(Status.IVERKSETTER_VEDTAK)).toEqual(underBehandlingIntlKey);
        expect(getIntlKeyForStatus(Status.FATTER_VEDTAK)).toEqual(underBehandlingIntlKey);
        expect(getIntlKeyForStatus(Status.UTREDES)).toEqual(underBehandlingIntlKey);
        expect(getIntlKeyForStatus(Status.AVSLUTTET)).toEqual(avsluttetIntlKey);
    });
});
