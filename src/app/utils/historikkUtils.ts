import { Innsendingsinnslag } from 'app/api/types/historikk/HistorikkInnslag';
import Sak from 'app/api/types/sak/Sak';

export const hentHistorikkForSak = (sak: Sak, historikkInnslagListe?: Innsendingsinnslag[]) => {
    return historikkInnslagListe
        ? historikkInnslagListe.filter((histoikkInnslag) => histoikkInnslag.saksnr === sak.saksnummer)
        : [];
};


