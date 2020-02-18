import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';

import SøknadsoversiktHendelseListeItem from './SøknadsoversiktHendelseListeItem';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import CheckmarkIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/CheckmarkIkon';
import { formatDate } from 'app/components/saksoversikt/utils';
import AdvarselIkonSirkel from 'app/components/ikoner/uttaksplanIkon/ikoner/AdvarselIkonSirkel';
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
                ikon={<CheckmarkIkon width={24} height={24} title="Checkmarkikon" />}
                color={UttaksplanColor.transparent}
                tittel={intl.formatMessage({ id: 'søknadsoversikt.duHarSøkt' })}
                content={formatDate(søknadsDato)}
            />
            <SøknadsoversiktHendelseListeItem
                ikon={<AdvarselIkonSirkel width={24} height={24} title="Checkmarkikon" />}
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
