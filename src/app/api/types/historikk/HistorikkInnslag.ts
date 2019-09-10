import { Hendelse } from "./Hendelse";
import { Skjemanummer } from "common/storage/attachment/types/Skjemanummer";

export enum HistorikkInnslagType {
    "søknad" = "SØKNAD",
    "inntekt" = "INNTEKT"
};

export interface HistorikkInnslag {
    type: HistorikkInnslagType;
    aktørId: string;
    saksnr: string;
    fnr: string;
    opprettet: string;
    hendelse: Hendelse;
    journalpostId: string;
    vedlegg?: Skjemanummer[];
}