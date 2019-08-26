import { HistorikkInnslag } from 'app/types/HistorikkInnslag';
import Sak from 'app/types/Sak';

export const hentHistorikkForSak = (sak: Sak, historikkInnslagListe?: HistorikkInnslag[]) => {
    return historikkInnslagListe
        ? historikkInnslagListe.filter((histoikkInnslag) => histoikkInnslag.saksnr === sak.saksnummer)
        : [];
};
