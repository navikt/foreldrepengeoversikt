import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import Icon from 'nav-frontend-ikoner-assets';

import SøknadsoversiktHendelseListeItem from './SøknadsoversiktHendelseListeItem';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import { formatDate } from 'app/components/saksoversikt/utils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import ArbeidsgiverHendelse from './arbeidsgiver/ArbeidsgiverHendelse';
import { InntektsmeldingInnslag } from 'app/api/types/historikk/HistorikkInnslag';

interface Props {
    søknadsDato: string;
    intl: InjectedIntl;
    arbeidsforhold: Arbeidsforhold[] | undefined;
    inntektsmeldinger: InntektsmeldingInnslag[];
    brukerHarSendtSøknad: boolean;
}

const SøknadsoversiktHendelseListe: React.StatelessComponent<Props> = ({
    søknadsDato,
    arbeidsforhold,
    inntektsmeldinger,
    brukerHarSendtSøknad,
    intl
}) => {
    return (
        <div>
            <SøknadsoversiktHendelseListeItem
                ikon={
                    brukerHarSendtSøknad ? (
                        <Icon kind="ok-sirkel-fyll" size="24" />
                    ) : (
                        <Icon kind="advarsel-sirkel-fyll" size="24" />
                    )
                }
                color={UttaksplanColor.transparent}
                tittel={intl.formatMessage({ id: 'søknadsoversikt.duHarSøkt' })}
                content={formatDate(søknadsDato)}
            />
            {arbeidsforhold && arbeidsforhold.length > 0 && (
                <ArbeidsgiverHendelse
                    arbeidsforhold={arbeidsforhold}
                    inntektsopplysningerDato={søknadsDato}
                    inntektsmeldinger={inntektsmeldinger}
                />
            )}
            <SøknadsoversiktHendelseListeItem
                color={UttaksplanColor.transparent}
                tittel={intl.formatMessage({ id: 'søknadsoversikt.navBehandlerSøknaden' })}
                content={intl.formatMessage({ id: 'søknadsoversikt.navBehandlerSøknaden.innhold' })}
            />
        </div>
    );
};

export default injectIntl(SøknadsoversiktHendelseListe);
