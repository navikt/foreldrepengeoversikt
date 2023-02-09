import { Skjemanummer } from './Skjemanummer';

export interface Attachment {
    beskrivelse?: string;
    error?: any;
    file: File;
    filename: string;
    filesize: number;
    id: string;
    pending: boolean;
    skjemanummer: Skjemanummer;
    url?: string;
    uuid?: string;
}
