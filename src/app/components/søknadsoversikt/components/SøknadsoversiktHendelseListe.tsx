import React from 'react';
import SøknadsoversiktHendelseListeItem from './SøknadsoversiktHendelseListeItem';
import ArbeidIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/ArbeidIkon';
import NavIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/NavIkon';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import CheckmarkIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/CheckmarkIkon';
import { formatDate } from 'app/components/saksoversikt/utils';
import { injectIntl, InjectedIntl } from 'react-intl';

interface Props {
    søknadsDato: string;
    intl: InjectedIntl;
}

const SøknadsoversiktHendelseListe: React.StatelessComponent<Props> = ({ søknadsDato, intl }) => {
    return (
        <div>
            <SøknadsoversiktHendelseListeItem
                ikon={<CheckmarkIkon title="Checkmarkikon" />}
                color={UttaksplanColor.transparent}
                tittel={intl.formatMessage({ id: 'søknadsoversikt.duHarSøkt' })}
                content={formatDate(søknadsDato)}
            />
            <SøknadsoversiktHendelseListeItem
                ikon={<ArbeidIkon title="Navikon" />}
                color={UttaksplanColor.green}
                tittel={intl.formatMessage(
                    { id: 'søknadsoversikt.arbeidsgiverKanSendeInnInntektsmelding' },
                    { dato: formatDate(søknadsDato) }
                )}
            />
            <SøknadsoversiktHendelseListeItem
                ikon={<NavIkon title="Arbeidsikon" />}
                color={UttaksplanColor.transparent}
                tittel={intl.formatMessage({ id: 'søknadsoversikt.navBehandlerSøknaden' })}
                content={intl.formatMessage({ id: 'søknadsoversikt.navBehandlerSøknaden.innhold' })}
            />
        </div>
    );
};

export default injectIntl(SøknadsoversiktHendelseListe);
