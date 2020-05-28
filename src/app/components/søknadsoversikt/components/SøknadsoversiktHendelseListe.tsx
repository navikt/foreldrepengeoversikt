import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import Icon from 'nav-frontend-ikoner-assets';

import SøknadsoversiktHendelseListeItem from './SøknadsoversiktHendelseListeItem';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import { formatDate } from 'app/components/saksoversikt/utils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import ArbeidsgiverHendelse, { erAlleInntektsmeldingerMottatt } from './arbeidsgiver/ArbeidsgiverHendelse';
import { InntektsmeldingInnslag } from 'app/api/types/historikk/HistorikkInnslag';
import BehandleSøknadenHendelse, { behandleSøknadenHendelseErOk } from './behandle-søknaden/BehandleSøknadenHendelse';
import moment from 'moment';
import { ManglendeVedlegg } from 'app/api/types/sak/ManglendeVedlegg';
import ManglendeVedleggHendelse from './manglende-vedlegg/ManglendeVedleggHendelse';

interface Props {
    søknadsDato: string;
    intl: InjectedIntl;
    arbeidsforhold: Arbeidsforhold[] | undefined;
    inntektsmeldinger: InntektsmeldingInnslag[];
    brukerHarSendtSøknad: boolean;
    behandlingsdato: string;
    manglendeVedlegg: ManglendeVedlegg[];
    navigateToEttersendelse: () => void;
}

const getAktiveArbeidsforhold = (
    arbeidsforhold: Arbeidsforhold[] | undefined,
    aktiveFraDato: string
): Arbeidsforhold[] => {
    if (arbeidsforhold === undefined) {
        return [];
    }

    return arbeidsforhold.filter(
        (a) =>
            a.tom === undefined ||
            a.tom === null ||
            (aktiveFraDato !== undefined && moment(aktiveFraDato).isSameOrBefore(a.tom, 'days'))
    );
};

const SøknadsoversiktHendelseListe: React.StatelessComponent<Props> = ({
    søknadsDato,
    arbeidsforhold,
    inntektsmeldinger,
    brukerHarSendtSøknad,
    behandlingsdato,
    manglendeVedlegg,
    intl,
    navigateToEttersendelse
}) => {
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(arbeidsforhold, behandlingsdato);
    const søknadenBehandles =
        behandleSøknadenHendelseErOk(behandlingsdato) &&
        erAlleInntektsmeldingerMottatt(aktiveArbeidsforhold, inntektsmeldinger);
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
            {manglendeVedlegg.length > 0 && (
                <>
                    <ManglendeVedleggHendelse
                        manglendeVedlegg={manglendeVedlegg}
                        navigateToEttersendelse={navigateToEttersendelse}
                    />
                </>
            )}
            <BehandleSøknadenHendelse behandlingsdato={behandlingsdato} arbeidsforhold={arbeidsforhold} />
            {aktiveArbeidsforhold.length > 0 && (
                <ArbeidsgiverHendelse
                    arbeidsforhold={aktiveArbeidsforhold}
                    inntektsopplysningerDato={behandlingsdato}
                    inntektsmeldinger={inntektsmeldinger}
                />
            )}
            <SøknadsoversiktHendelseListeItem
                ikon={søknadenBehandles ? <Icon kind="info-sirkel-fyll" width="24" height="24" /> : undefined}
                color={UttaksplanColor.transparent}
                tittel={intl.formatMessage({ id: 'søknadsoversikt.navBehandlerSøknaden' })}
                content={intl.formatMessage({
                    id:
                        aktiveArbeidsforhold.length > 0
                            ? 'søknadsoversikt.navBehandlerSøknaden.innhold'
                            : 'søknadsoversikt.navBehandlerSøknaden.innhold.ikkeArbeidstaker'
                })}
            />
        </div>
    );
};

export default injectIntl(SøknadsoversiktHendelseListe);
