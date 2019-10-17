import * as React from 'react';
import { shallow } from 'enzyme';
import { DineForeldrepenger } from '../DineForeldrepenger';
import { historyMock } from '../../../../../jest/__mocks__/History';
import EkspanderbarSaksoversikt from '../../../components/saksoversikt/saksoversikt-ekspanderbar/EkspanderbarSaksoversikt';
import SakerMock from '../../../../../jest/__mocks__/Sak';
import IngenSaker from '../../../components/ingen-saker/IngenSaker';
import Saksoversikt from 'app/components/saksoversikt/saksoversikt-main/Saksoversikt';

describe('Dine Foreldrepenger page', () => {
    it('Should render ingen saker component if saker is an empty list', () => {
        const wrapper = shallow(
            <DineForeldrepenger
                saker={[]}
                history={historyMock}
                historikkInnslagListe={[]}
                minidialogInnslagListe={[]}
            />
        );
        expect(wrapper.find(IngenSaker).length).toEqual(1);
    });

    it('Should render Saksoversikt for newest sak', () => {
        const mockSaker = [SakerMock.infotrygd, SakerMock.fpsakFP];
        const wrapper = shallow(
            <DineForeldrepenger
                saker={mockSaker}
                history={historyMock}
                historikkInnslagListe={[]}
                minidialogInnslagListe={[]}
            />
        );
        expect(wrapper.find(Saksoversikt).length).toEqual(1);
    });

    it('Should render EkspanderbarSaksoversikt for each element in saker except the newest', () => {
        const mockSaker = [SakerMock.infotrygd, SakerMock.fpsakFP];
        const wrapper = shallow(
            <DineForeldrepenger
                saker={mockSaker}
                history={historyMock}
                historikkInnslagListe={[]}
                minidialogInnslagListe={[]}
            />
        );
        expect(wrapper.find(EkspanderbarSaksoversikt).length).toEqual(1);
    });
});
