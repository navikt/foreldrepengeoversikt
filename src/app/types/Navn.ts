import { Kjønn } from "./Kjønn";

export default interface Navn {
    fornavn: string;
    mellomnavn: string;
    etternavn: string;
    kjønn: Kjønn;
}

