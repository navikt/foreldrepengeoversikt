import React from 'react';
import SøknadsoversiktHendelseListeItem from '../SøknadsoversiktHendelseListeItem';
import Icon from 'nav-frontend-ikoner-assets';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import { injectIntl, InjectedIntl } from 'react-intl';
import moment from 'moment';
import { formatDate } from 'app/components/saksoversikt/utils';
import { Normaltekst } from 'nav-frontend-typografi';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

interface Props {
    behandlingsdato: string;
    arbeidsforhold: Arbeidsforhold[] | undefined;
    intl: InjectedIntl;
}

const getIkon = (behandlingsdato: string) => {
    const kanBehandles = moment().isSameOrAfter(behandlingsdato, 'days');

    return kanBehandles ? (
        <Icon kind="advarsel-sirkel-fyll" width="24" height="24" />
    ) : (
        <Icon kind="info-sirkel-fyll" width="24" height="24" />
    );
};

const BehandleSøknadenHendelse: React.FunctionComponent<Props> = ({ behandlingsdato, arbeidsforhold, intl }) => {
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

    return (
        <>
            {harArbeidsforhold ? (
                <SøknadsoversiktHendelseListeItem
                    ikon={getIkon(behandlingsdato)}
                    color={UttaksplanColor.transparent}
                    tittel={intl.formatMessage(
                        { id: 'søknadsoversikt.behandleSøknaden.tittel' },
                        { dato: formatDate(behandlingsdato) }
                    )}
                />
            ) : (
                <SøknadsoversiktHendelseListeItem
                    ikon={getIkon(behandlingsdato)}
                    color={UttaksplanColor.transparent}
                    tittel={intl.formatMessage(
                        { id: 'søknadsoversikt.behandleSøknaden.tittel' },
                        { dato: formatDate(behandlingsdato) }
                    )}
                    lesMerTittel={intl.formatMessage({ id: 'søknadsoversikt.behandleSøknaden.lesMer.tittel' })}
                    lesMerInnhold={
                        <Normaltekst>
                            {intl.formatMessage({ id: 'søknadsoversikt.behandleSøknaden.lesMer.innhold' })}
                        </Normaltekst>
                    }
                />
            )}
        </>
    );
};

export default injectIntl(BehandleSøknadenHendelse);
