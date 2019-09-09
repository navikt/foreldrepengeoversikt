import { Kjønn } from "../Kjønn";

export default interface AnnenPart {
    aktørid: string;
    fnr: string;
    navn: {
        fornavn: string;
        etternavn: string;
        kjønn: Kjønn;
    };
}
