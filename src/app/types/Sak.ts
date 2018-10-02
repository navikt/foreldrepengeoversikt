import Behandling from './Behandling';
import { Status } from './Status';

export default interface Sak {
    aktørId: string;
    aktørIdAnnenPart: string;
    aktørIdBarn: string[];
    behandlingTema: string;
    behandlinger: Behandling[];
    status: Status;
    saksnummer: string;
}