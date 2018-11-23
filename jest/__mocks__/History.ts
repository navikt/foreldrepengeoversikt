import Saker from './Sak';

export const historyMock: any = {
    push: jest.fn(),
    location: {
        state: {
            sak: Saker.infotrygdSak
        }
    }
};