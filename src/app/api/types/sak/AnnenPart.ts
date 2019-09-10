import { Kjønn } from "../personinfo/Kjønn";

export default interface AnnenPart {
    aktørid: string;
    fnr: string;
    navn: {
        fornavn: string;
        etternavn: string;
        kjønn: Kjønn;
    };
}
