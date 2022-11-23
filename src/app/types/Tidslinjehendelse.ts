import { AktørType } from './AktørType';
import { Dokument } from './Dokument';
import { TidslinjehendelseType } from './TidslinjehendelseType';

export interface Tidslinjehendelse {
    type: string;
    opprettet: Date;
    aktørType: AktørType;
    tidslinjeHendelseType: TidslinjehendelseType;
    dokumenter: Dokument[];
    manglendeVedlegg: Dokument[];
}
