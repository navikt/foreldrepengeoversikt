import { Heading } from '@navikt/ds-react';
import { bemUtils, formatDate, guid, intlUtils } from '@navikt/fp-common';
import { useSetBackgroundColor } from 'app/hooks/useBackgroundColor';
import { BarnGruppering } from 'app/types/BarnGruppering';
import { GruppertSak } from 'app/types/GruppertSak';
import EtBarn from 'assets/EtBarn';
import dayjs from 'dayjs';
import React from 'react';
import { IntlShape } from 'react-intl';
import SakLink from '../sak-link/SakLink';

import './har-saker.css';

interface Props {
    grupperteSaker: GruppertSak[];
}

export const formaterNavnPåBarn = (
    fornavn: string[] | undefined,
    fødselsdatoer: Date[] | undefined,
    omsorgsovertagelsesdato: Date | undefined,
    alleBarnaLever: boolean,
    antallBarn: number,
    intl: IntlShape
): string => {
    if (
        fornavn === undefined ||
        fornavn.length === 0 ||
        !alleBarnaLever
    ) {
        return getTittelBarnNårNavnSkalIkkeVises(omsorgsovertagelsesdato, fødselsdatoer, antallBarn, intl);
    }

    if (fornavn.length > 1) {
        const fornavnene = fornavn.slice(0, -1).join(', ');
        const sisteFornavn = fornavn[fornavn.length - 1];
        return `${fornavnene} og ${sisteFornavn}`;
    }
    return `${fornavn[0]}`;
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
    omsorgsovertagelsesdato: Date | undefined,
    fødselsdatoer: Date[] | undefined,
    antallBarn: number,
    intl: IntlShape
): string => {
    const barnTekst = getTekstForAntallBarn(antallBarn, intl);
    if (antallBarn === 0||type === 'termin') {
        return `Barn med termin ${formatDate(familiehendelsedato)}`;
    }

    if (type === 'fødsel') {
        return `Barn født ${formatDate(familiehendelsedato)}`;
    }

    if (type === 'termin') {
        return `Barn med termin ${formatDate(familiehendelsedato)}`;
    }


    if (type === 'adopsjon') {
        return intlUtils(intl, 'velkommen.barnVelger.adoptertBarn', {
            adopsjonsdato: formatDate(familiehendelsedato),
        });
    } else {
        const fødselsdatoTekst = formaterFødselsdatoerPåBarn(fødselsdatoer);


        return fødselsdatoer !== undefined && fødselsdatoer.length > 0
            ? intlUtils(intl, 'velkommen.barnVelger.fødtBarn.barn', {
                  barnTekst,
                  fødselsdato: fødselsdatoTekst,
              })
            : '';
    }
};

export const getHeading = (
    type: 'fødsel' | 'termin' | 'adopsjon',
    antallBarn: number,
    familiehendelsedato: string,
    barn: BarnGruppering | undefined
) => {

    export const getHeading = (type: 'fødsel' | 'termin' | 'adopsjon', antallBarn: number, familiehendelsedato: string) => {
        if (antallBarn === 0) {
            return `Barn med termin ${formatDate(familiehendelsedato)}`;
        }
    
        if (type === 'fødsel') {
            return `Barn født ${formatDate(familiehendelsedato)}`;
        }
    
        if (type === 'termin') {
            return `Barn med termin ${formatDate(familiehendelsedato)}`;
        }
    
        return `Barn med omsorgsovertakelse ${formatDate(familiehendelsedato)}`;
    return formaterNavnPåBarn(
        barn.fornavn,
        barn.etternavn,
        barn.fødselsdatoer,
        barn.omsorgsovertagelse,
        barn.alleBarnaLever,
        gruppering.antallBarn,
        intl
    );
};

const HarSaker: React.FunctionComponent<Props> = ({ grupperteSaker }) => {
    const bem = bemUtils('har-saker');
    useSetBackgroundColor('blue');

    return (
        <>
            {grupperteSaker.map((gruppering) => {
                return (
                    <div className={bem.block} key={gruppering.familiehendelsedato}>
                        <Heading size="medium" level="2" className={bem.element('tittel')}>
                            <EtBarn />
                            {getHeading(
                                gruppering.type,
                                gruppering.antallBarn,
                                gruppering.familiehendelsedato,
                                gruppering.barn
                            )}
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
