import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils, formatDate, guid, intlUtils } from '@navikt/fp-common';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { GruppertSak } from 'app/types/GruppertSak';
import { Situasjon } from 'app/types/Situasjon';
import { ISOStringToDate } from 'app/utils/dateUtils';
import EtBarn from 'assets/EtBarn';
import ToBarn from 'assets/ToBarn';
import TreBarn from 'assets/TreBarn';
import dayjs from 'dayjs';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import SakLink from '../sak-link/SakLink';

import './har-saker.css';

interface Props {
    grupperteSaker: GruppertSak[];
}

export const getBarnTittel = (
    fornavn: string[] | undefined,
    fødselsdatoer: Date[] | undefined,
    familiehendelsesdato: Date,
    alleBarnaLever: boolean,
    antallBarn: number,
    intl: IntlShape,
    type: Situasjon
): string => {
    if (fornavn === undefined || fornavn.length === 0 || !alleBarnaLever) {
        return getTittelBarnNårNavnSkalIkkeVises(familiehendelsesdato, fødselsdatoer, antallBarn, intl, type);
    }

    if (fornavn.length > 1) {
        const fornavnene = fornavn
            .map((n) => n.trim())
            .slice(0, -1)
            .join(', ');
        const sisteFornavn = fornavn[fornavn.length - 1];
        return `${fornavnene} og ${sisteFornavn}`;
    }
    return `${fornavn[0]}`;
};

export const getBarnUndertittel = (
    fornavn: string[] | undefined,
    fødselsdatoer: Date[] | undefined,
    type: Situasjon,
    familiehendelsedato: Date,
    allebarnaLever: boolean
) => {
    const viserNavnPåBarn = fornavn !== undefined && fornavn.length > 0 && allebarnaLever;
    if (type === 'fødsel' && viserNavnPåBarn) {
        const fødtDatoTekst = formaterFødselsdatoerPåBarn(fødselsdatoer);
        return `Født ${fødtDatoTekst}`;
    }
    if (type === 'adopsjon' && viserNavnPåBarn) {
        return `Adoptert ${formatDate(familiehendelsedato)}`;
    }
    return undefined;
};

export const getTekstForAntallBarn = (antallBarn: number, intl: IntlShape): string => {
    if (antallBarn === 1) {
        return intlUtils(intl, 'barn');
    } else if (antallBarn === 2) {
        return intlUtils(intl, 'tvillinger');
    } else if (antallBarn === 3) {
        return intlUtils(intl, 'trillinger');
    }
    return intlUtils(intl, 'flerlinger');
};

export const formaterFødselsdatoerPåBarn = (fødselsdatoer: Date[] | undefined): string | undefined => {
    if (fødselsdatoer === undefined) {
        return undefined;
    }
    const unikeFødselsdatoer = [] as Date[];
    fødselsdatoer.forEach((f) => {
        const finnesIUnikeFødselsdatoer = unikeFødselsdatoer.find((dato) => dayjs(dato).isSame(f, 'day'));
        if (finnesIUnikeFødselsdatoer === undefined) {
            unikeFødselsdatoer.push(f);
        }
    });

    if (unikeFødselsdatoer.length > 1) {
        const fødselsdatoerTekst = unikeFødselsdatoer.map((fd) => formatDate(fd));
        const førsteFødselsdaoer = fødselsdatoerTekst.slice(0, -1).join(', ');
        const sisteFødselsdato = fødselsdatoerTekst[fødselsdatoerTekst.length - 1];
        return `${førsteFødselsdaoer} og ${sisteFødselsdato}`;
    }
    return formatDate(unikeFødselsdatoer[0]);
};

export const getTittelBarnNårNavnSkalIkkeVises = (
    familiehendelsedato: Date,
    fødselsdatoer: Date[] | undefined,
    antallBarn: number,
    intl: IntlShape,
    type: Situasjon
): string => {
    const barnTekst = getTekstForAntallBarn(antallBarn, intl);
    if (antallBarn === 0 || type === 'termin') {
        return intlUtils(intl, 'barnHeader.terminBarn', {
            barnTekst,
            termindato: formatDate(familiehendelsedato),
        });
    }

    if (type === 'adopsjon') {
        return intlUtils(intl, 'barnHeader.adoptertBarn', {
            barnTekst,
            adopsjonsdato: formatDate(familiehendelsedato),
        });
    } else {
        const fødselsdatoTekst = formaterFødselsdatoerPåBarn(fødselsdatoer);
        return fødselsdatoer !== undefined && fødselsdatoer.length > 0
            ? intlUtils(intl, 'barnHeader.fødtBarn', {
                  barnTekst,
                  fødselsdatoTekst,
              })
            : '';
    }
};

const getIkonForAntallBarn = (antallBarn: number) => {
    switch (antallBarn) {
        case 1:
            return <EtBarn />;
        case 2:
            return <ToBarn />;
        default:
            return <TreBarn />;
    }
};

const HarSaker: React.FunctionComponent<Props> = ({ grupperteSaker }) => {
    const bem = bemUtils('har-saker');
    const intl = useIntl();
    useSetBackgroundColor('blue');

    return (
        <>
            {grupperteSaker.map((gruppering) => {
                const tittel = getBarnTittel(
                    gruppering.barn?.fornavn,
                    gruppering.barn?.fødselsdatoer,
                    ISOStringToDate(gruppering.familiehendelsedato)!,
                    !!gruppering.barn?.alleBarnaLever,
                    gruppering.antallBarn,
                    intl,
                    gruppering.type
                );
                const undertittel = getBarnUndertittel(
                    gruppering.barn?.fornavn,
                    gruppering.barn?.fødselsdatoer,
                    gruppering.type,
                    ISOStringToDate(gruppering.familiehendelsedato)!,
                    !!gruppering.barn?.alleBarnaLever
                );
                return (
                    <div className={bem.block} key={gruppering.familiehendelsedato}>
                        <Heading size="small" level="2" className={bem.element('tittel')}>
                            {getIkonForAntallBarn(gruppering.antallBarn)}
                            <div>
                                <div>{tittel}</div>
                                {undertittel && <BodyShort size="medium">{undertittel}</BodyShort>}
                            </div>
                        </Heading>
                        {gruppering.saker.map((sak) => {
                            return <SakLink key={guid()} sak={sak} />;
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default HarSaker;
