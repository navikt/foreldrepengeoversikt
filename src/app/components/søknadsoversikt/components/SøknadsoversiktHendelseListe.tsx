import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import Icon from 'nav-frontend-ikoner-assets';

import SøknadsoversiktHendelseListeItem from './SøknadsoversiktHendelseListeItem';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import { formatDate } from 'app/components/saksoversikt/utils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

interface Props {
    søknadsDato: string;
    intl: InjectedIntl;
    arbeidsforhold: Arbeidsforhold[] | undefined;
}

const SøknadsoversiktHendelseListe: React.StatelessComponent<Props> = ({ søknadsDato, intl }) => {
    return (
        <div>
            <SøknadsoversiktHendelseListeItem
                ikon={<Icon kind="ok-sirkel-fyll" />}
                color={UttaksplanColor.transparent}
                tittel={intl.formatMessage({ id: 'søknadsoversikt.duHarSøkt' })}
                content={formatDate(søknadsDato)}
            />
            <SøknadsoversiktHendelseListeItem
                ikon={<Icon kind="advarsel-sirkel-fyll" size="24" />}
                color={UttaksplanColor.transparent}
                tittel={intl.formatMessage(
                    { id: 'søknadsoversikt.arbeidsgiverKanSendeInnInntektsmelding' },
                    { dato: formatDate(søknadsDato) }
                )}
                rightSideContent="Testy test"
            />
            <SøknadsoversiktHendelseListeItem
                color={UttaksplanColor.transparent}
                tittel={intl.formatMessage({ id: 'søknadsoversikt.navBehandlerSøknaden' })}
                content={intl.formatMessage({ id: 'søknadsoversikt.navBehandlerSøknaden.innhold' })}
            />
        </div>
    );
};

export default injectIntl(SøknadsoversiktHendelseListe);
