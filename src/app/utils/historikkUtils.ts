import { Innsendingsinnslag } from 'app/api/types/historikk/HistorikkInnslag';
import SakBase from 'app/api/types/sak/Sak';

export const hentHistorikkForSak = (sak: SakBase, historikkInnslagListe?: Innsendingsinnslag[]) => {
    return historikkInnslagListe
        ? historikkInnslagListe.filter((histoikkInnslag) => histoikkInnslag.saksnr === sak.saksnummer)
        : [];
};
