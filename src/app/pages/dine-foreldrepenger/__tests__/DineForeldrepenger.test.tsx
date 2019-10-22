import * as React from 'react';
import { shallow } from 'enzyme';
import { DineForeldrepenger } from '../DineForeldrepenger';
import { historyMock } from '../../../../../jest/__mocks__/History';
import EkspanderbarSaksoversikt from '../../../components/saksoversikt/saksoversikt-ekspanderbar/EkspanderbarSaksoversikt';
import SakerMock from '../../../../../jest/__mocks__/Sak';
import IngenSaker from '../../../components/ingen-saker/IngenSaker';
import Saksoversikt from 'app/components/saksoversikt/saksoversikt-main/Saksoversikt';
import MinidialogLenkepanel from 'app/components/minidialog-lenkepanel/MinidialogLenkepanel';
import moment from 'moment';
import { HistorikkInnslagType, MinidialogInnslag } from 'app/api/types/historikk/HistorikkInnslag';

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

    describe('minidialoginnslag', () => {
        it('skal ikke vise historikkinnslag er utløpt', () => {
            const utløptMinidialoginnslag: MinidialogInnslag = {
                type: HistorikkInnslagType.minidialog,
                gyldigTil: moment()
                    .subtract(1, 'day')
                    .format('YYYY-MM-DD'),
                aktiv: true
            } as MinidialogInnslag;

            const wrapper = shallow(
                <DineForeldrepenger
                    saker={[SakerMock.fpsakFP]}
                    history={historyMock}
                    historikkInnslagListe={[]}
                    minidialogInnslagListe={[utløptMinidialoginnslag]}
                />
            );
            expect(wrapper.find(MinidialogLenkepanel).length).toEqual(0);
        });

        it('skal ikke vise innaktive minidialoginnslag', () => {
            const utløptMinidialoginnslag: MinidialogInnslag = {
                type: HistorikkInnslagType.minidialog,
                gyldigTil: moment()
                    .add(1, 'day')
                    .format('YYYY-MM-DD'),
                aktiv: false
            } as MinidialogInnslag;
            const wrapper = shallow(
                <DineForeldrepenger
                    saker={[SakerMock.fpsakFP]}
                    history={historyMock}
                    historikkInnslagListe={[]}
                    minidialogInnslagListe={[utløptMinidialoginnslag]}
                />
            );
            expect(wrapper.find(MinidialogLenkepanel).length).toEqual(0);
        });

        it('minidialoginnslag som er aktive og ikke er utløpt skal vises', () => {
            const utløptMinidialoginnslag: MinidialogInnslag = {
                type: HistorikkInnslagType.minidialog,
                gyldigTil: moment()
                    .add(1, 'day')
                    .format('YYYY-MM-DD'),
                aktiv: true
            } as MinidialogInnslag;

            const wrapper = shallow(
                <DineForeldrepenger
                    saker={[SakerMock.fpsakFP]}
                    history={historyMock}
                    historikkInnslagListe={[]}
                    minidialogInnslagListe={[utløptMinidialoginnslag]}
                />
            );
            expect(wrapper.find(MinidialogLenkepanel).length).toEqual(1);
        });
    });
});
