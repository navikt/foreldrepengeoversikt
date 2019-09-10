import { Skjemanummer } from "./Skjemanummer";

export interface Attachment {
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    error?: any;
    skjemanummer: Skjemanummer;
    beskrivelse?: string;
}
