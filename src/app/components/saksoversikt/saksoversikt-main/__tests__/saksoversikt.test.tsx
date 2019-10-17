import * as React from 'react';
import { shallow } from 'enzyme';
import SakerMock from '../../../../../../jest/__mocks__/Sak';
import Saksoversikt from '../Saksoversikt';
import SøkNåPanel from 'app/components/søk-nå-panel/SøkNåPanel';

describe('Saksoversikt component', () => {
    it('SøkNåPanel skal ikke vises hvis saken er fra infotrygd', () => {
        const wrapper = shallow(
            <Saksoversikt sak={SakerMock.infotrygd} history={jest.fn() as any} historikkInnslagListe={[]} />
        );
        expect(wrapper.find(SøkNåPanel).length).toBe(0);
    });

    it('SøkNåPanel skal ikke vises hvis saken er fra fpsak og saken har behandlinger', () => {
        const wrapper = shallow(
            <Saksoversikt sak={SakerMock.fpsakFP} history={jest.fn() as any} historikkInnslagListe={[]} />
        );
        expect(wrapper.find(SøkNåPanel).length).toBe(0);
    });

    it('SøkNåPanel skal vises hvis saken er fra fpsak og ikke har noen behandlinger', () => {
        const wrapper = shallow(
            <Saksoversikt
                sak={{ ...SakerMock.fpsakFP, behandlinger: [] }}
                history={jest.fn() as any}
                historikkInnslagListe={[]}
            />
        );
        expect(wrapper.find(SøkNåPanel).length).toBe(1);
    });
});
