import { Status } from '../../src/app/types/Status';

const infotrygdSak = {
    saksnummer: '123',
    opprettet: '2018-10-1',
    status: Status.OPPRETTET
};

const fpsakSak = {
    saksnummer: '123',
    opprettet: '2018-10-1',
    status: Status.OPPRETTET
};

const Saker = { infotrygdSak, fpsakSak };
export default Saker;
