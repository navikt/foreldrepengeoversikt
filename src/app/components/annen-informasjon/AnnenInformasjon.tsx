import * as React from 'react';
import BEMHelper from '../../../common/util/bem';
import Lenke from 'nav-frontend-lenker';
import lenker from 'app/utils/lenker';

import './annenInformasjon.less';
import { Undertittel } from '../../../../node_modules/nav-frontend-typografi';
import Block from 'common/components/block/Block';

const AnnenInformasjon: React.StatelessComponent = () => {
    const cls = BEMHelper('annenInformasjon');
    return (
        <div className={cls.className}>
            <Block margin={"l"}>
                <Undertittel>Annen informasjon</Undertittel>
            </Block>
            <Lenke href={lenker.viktigeFrister}>Viktige frister</Lenke>
            <Lenke href={lenker.utbetalingOgSaksbehandlingstider}>Utbetaling og saksbehandlingstider</Lenke>
            <Lenke href={lenker.klagePåSøknad}>Klage på søknad</Lenke>
            <Lenke href={lenker.personvernOgMasseErklæringer}>Personvern og masse erklæringer</Lenke>
            <Lenke href={lenker.kontaktOss}>Kontakt oss</Lenke>
        </div>
    );
};
export default AnnenInformasjon;
