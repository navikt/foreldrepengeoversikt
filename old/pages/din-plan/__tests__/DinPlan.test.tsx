import * as React from 'react';
import { shallow } from 'enzyme';
import { DinPlan } from '../DinPlan';
import { historyMock } from '../../../../../jest/__mocks__/History';
import { Routes } from 'app/utils/routes';
import { søkerMock } from '../../../../../jest/__mocks__/Søker';
import SakerMock from '../../../../../jest/__mocks__/Sak';
import { uttaksperiodeMock } from '../../../../../jest/__mocks__/Perioder';

describe('DinPlan', () => {
    it('should navigate back to frontpage if sak is undefined', () => {
        const historySpy = jest.spyOn(historyMock, 'push');
        shallow(<DinPlan sak={undefined} søker={søkerMock} history={historyMock} />);
        expect(historySpy).toHaveBeenCalledWith(Routes.DINE_FORELDREPENGER);
    });

    it('should navigate back to frontpage if søker is undefined', () => {
        const historySpy = jest.spyOn(historyMock, 'push');
        shallow(
            <DinPlan
                sak={{ ...SakerMock.fpsakFP, perioder: [uttaksperiodeMock] }}
                søker={undefined}
                history={historyMock}
            />
        );
        expect(historySpy).toHaveBeenCalledWith(Routes.DINE_FORELDREPENGER);
    });

    it('should navigate back to frontpage if perioder is undefined', () => {
        const historySpy = jest.spyOn(historyMock, 'push');
        shallow(
            <DinPlan sak={{ ...SakerMock.fpsakFP, perioder: undefined }} søker={søkerMock} history={historyMock} />
        );
        expect(historySpy).toHaveBeenCalledWith(Routes.DINE_FORELDREPENGER);
    });
});
