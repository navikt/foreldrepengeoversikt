import SakerMock from './Sak';

export const historyMock: any = {
    push: jest.fn(),
    location: {
        state: {
            sak: SakerMock.infotrygdSak
        }
    }
};