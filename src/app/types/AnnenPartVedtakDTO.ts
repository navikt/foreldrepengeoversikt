import { DekningsgradDTO } from './DekningsgradDTO';
import { PeriodeDTO } from './Periode';

export interface AnnenPartVedtakDTO {
    antallBarn?: number;
    dekningsgrad: DekningsgradDTO;
    perioder: PeriodeDTO[];
    termindato?: string;
}
