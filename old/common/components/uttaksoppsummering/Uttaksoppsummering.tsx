import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import TilesList from '../tiles-list/TilesList';
import Kontostatus from './Kontostatus';
import { NavnPåForeldre } from '../oversikt-brukte-dager/OversiktBrukteDager';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';

export interface Props {
    resterendeStønadskonter: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    erDeltUttak: boolean;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
}

const Uttaksoppsummering: React.FunctionComponent<Props> = ({
    resterendeStønadskonter,
    navnPåForeldre,
    erDeltUttak,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}) => (
    <section>
        <Undertittel tag="h2" className="blokk-xs">
            {
                <FormattedMessage
                    id="oversiktBrukteDager.tittel.kontoer.ikkeBrukteDager"
                    values={{ antall: erDeltUttak ? 2 : 1 }}
                />
            }
        </Undertittel>
        <TilesList columns={2}>
            {resterendeStønadskonter.map((u, idx) => (
                <Kontostatus
                    key={idx}
                    uttak={u}
                    navnPåForeldre={navnPåForeldre}
                    erEndringssøknad={true}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                />
            ))}
        </TilesList>
    </section>
);

export default Uttaksoppsummering;
