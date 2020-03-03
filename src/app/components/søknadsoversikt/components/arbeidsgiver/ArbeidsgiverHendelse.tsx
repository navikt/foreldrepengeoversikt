import React from 'react';
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl';
import Icon from 'nav-frontend-ikoner-assets';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

import SøknadsoversiktHendelseListeItem from '../SøknadsoversiktHendelseListeItem';
import { UttaksplanColor } from 'app/types/uttaksplan/UttaksplanColor';
import { formatDate } from 'app/components/saksoversikt/utils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import Block from 'common/components/block/Block';
import { lenker } from '../../../../utils/lenker';
import BEMHelper from 'common/util/bem';

import './arbeidsgiverHendelse.less';
import { InntektsmeldingInnslag } from 'app/api/types/historikk/HistorikkInnslag';

interface Props {
    intl: InjectedIntl;
    inntektsopplysningerDato: string;
    arbeidsforhold: Arbeidsforhold[];
    inntektsmeldinger: InntektsmeldingInnslag[];
}

const getTittel = (arbeidsforhold: Arbeidsforhold[], inntektsopplysningerDato: string, intl: InjectedIntl) => {
    if (arbeidsforhold.length === 1) {
        return intl.formatMessage(
            { id: 'søknadsoversikt.arbeidsgiverKanSendeInnInntektsmelding.entall' },
            { dato: formatDate(inntektsopplysningerDato), arbeidsgiverNavn: arbeidsforhold[0].arbeidsgiverNavn }
        );
    }

    return intl.formatMessage(
        { id: 'søknadsoversikt.arbeidsgiverKanSendeInnInntektsmelding.flertall' },
        { dato: formatDate(inntektsopplysningerDato) }
    );
};

const renderLesMerInnhold = () => {
    return (
        <>
            <Block margin="xs">
                <Normaltekst>
                    <FormattedMessage id="søknadsoversikt.lesMer.innhold1" />
                </Normaltekst>
            </Block>
            <Block margin="none">
                <Normaltekst>
                    <FormattedMessage
                        id="søknadsoversikt.lesMer.innhold3"
                        values={{
                            lenke: (
                                <Lenke href={lenker.søkOmForeldrepenger}>
                                    <FormattedMessage id="søknadsoversikt.lesMer.innhold3.lenke" />
                                </Lenke>
                            )
                        }}
                    />
                </Normaltekst>
            </Block>
        </>
    );
};

const bem = BEMHelper('arbeidsgiverHendelseContent');

const getInntektsmeldingStatusIkon = (harMottattInntektsmelding: boolean) => {
    return harMottattInntektsmelding ? (
        <Icon kind="ok-sirkel-fyll" width="24" height="24" />
    ) : (
        <Icon kind="advarsel-sirkel-fyll" width="24" height="24" />
    );
};

const getInntektsmeldingTekst = (harMottattInntektsmelding: boolean) => {
    return harMottattInntektsmelding ? (
        <FormattedMessage id="søknadsoversikt.arbeidsgiverHarSendtInntektsmelding" />
    ) : (
        <FormattedMessage id="søknadsoversikt.arbeidsgiverHarIkkeSendtInntektsmelding" />
    );
};

const renderContent = (arbeidsforhold: Arbeidsforhold[], inntektsmeldinger: InntektsmeldingInnslag[]) => {
    return arbeidsforhold.map((arbforhold) => {
        const inntektsmeldingErMottatt =
            inntektsmeldinger.find((innt) => innt.arbeidsgiver.navn === arbforhold.arbeidsgiverNavn) !== undefined;

        return (
            <>
                <div className={bem.element('test')} key={guid()}>
                    {getInntektsmeldingStatusIkon(inntektsmeldingErMottatt)}
                    <div>
                        <Element>{arbforhold.arbeidsgiverNavn}</Element>
                        <Normaltekst>{getInntektsmeldingTekst(inntektsmeldingErMottatt)}</Normaltekst>
                    </div>
                </div>
            </>
        );
    });
};

const erAlleInntektsmeldingerMottatt = (
    arbeidsforhold: Arbeidsforhold[],
    inntektsmeldinger: InntektsmeldingInnslag[]
) => {
    let alleInntektsmeldingerMottatt = true;

    arbeidsforhold.forEach((arb) => {
        alleInntektsmeldingerMottatt =
            inntektsmeldinger.find((innt) => innt.arbeidsgiver.navn === arb.arbeidsgiverNavn) !== undefined &&
            alleInntektsmeldingerMottatt;
    });

    return alleInntektsmeldingerMottatt;
};

const ArbeidsgiverHendelse: React.FunctionComponent<Props> = ({
    inntektsopplysningerDato,
    arbeidsforhold,
    inntektsmeldinger,
    intl
}) => {
    const alleInntektsmeldingerMottatt = erAlleInntektsmeldingerMottatt(arbeidsforhold, inntektsmeldinger);

    return (
        <SøknadsoversiktHendelseListeItem
            ikon={getInntektsmeldingStatusIkon(alleInntektsmeldingerMottatt)}
            color={UttaksplanColor.transparent}
            tittel={getTittel(arbeidsforhold, inntektsopplysningerDato, intl)}
            content={arbeidsforhold.length > 1 ? renderContent(arbeidsforhold, inntektsmeldinger) : undefined}
            lesMerTittel={intl.formatMessage({ id: 'common.lesMer' })}
            lesMerInnhold={renderLesMerInnhold()}
        />
    );
};

export default injectIntl(ArbeidsgiverHendelse);
