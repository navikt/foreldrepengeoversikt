import { Hendelse } from "./Hendelse";
import { Skjemanummer } from "common/storage/attachment/types/Attachment";

export interface HistorikkInnslag {
    aktørId: string;
    saksnr: string;
    fnr: string;
    opprettet: string;
    hendelse: Hendelse;
    journalpostId: string;
    vedlegg: Skjemanummer[];
}