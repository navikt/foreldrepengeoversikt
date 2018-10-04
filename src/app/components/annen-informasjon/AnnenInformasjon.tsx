import * as React from 'react';
import BEMHelper from '../../../common/util/bem';
import Lenke from 'nav-frontend-lenker';
import lenker from 'app/utils/lenker';
import { Undertittel } from 'nav-frontend-typografi';
import './annenInformasjon.less';

const AnnenInformasjon: React.StatelessComponent = () => {
    const cls = BEMHelper('annenInformasjon');
    return (
        <div className={cls.className}>
            <Undertittel>Annen informasjon</Undertittel>
            <Lenke href={lenker.viktigeFrister}>Viktige frister</Lenke>
            <Lenke href={lenker.utbetalingOgSaksbehandlingstider}>Utbetaling og saksbehandlingstider</Lenke>
            <Lenke href={lenker.klagePåSøknad}>Klage på søknad</Lenke>
            <Lenke href={lenker.personvernOgMasseErklæringer}>Personvern og masse erklæringer</Lenke>
            <Lenke href={lenker.kontaktOss}>Kontakt oss</Lenke>
        </div>
    );
};
export default AnnenInformasjon;
