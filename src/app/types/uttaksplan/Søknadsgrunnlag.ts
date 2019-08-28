import { Tidsperiode } from "../Tidsperiode";


export interface Uttaksperiode {
    periodeResultatType: string;
    utsettelsePeriodeType: string;
    graderingInnvilget: boolean;
    samtidigUttak: boolean;
    samtidigUttaksprosent: number;
    stønadskontotype: StønadskontoType;
    trekkDager: number;
    arbeidstidprosent: number;
    utbetalingprosent: number;
    gjelderAnnenPart: boolean;
    flerbarnsdager: boolean;
    uttakArbeidType: string;
    arbeidsgiverInfo: {
        id: string;
        type: string;
        navn: string;
    };
    periode: Tidsperiode;
    morsAktivitet: MorsAktivitetDto;
    oppholdAarsak: OppholdsÅrsak;
}

export interface Saksgrunnlag {
    grunnlag: {
        dekningsgrad: number;
        antallBarn: number;
        søkerErFarEllerMedmor: boolean;
        morErAleneOmOmsorg: boolean;
        morHarRett: boolean;
        morErUfør: boolean;
        farMedmorErAleneOmOmsorg: boolean;
        farMedmorHarRett: boolean;
        søkerKjønn: string;
        termindato?: string;
        fødselsdato?: string;
        omsorgsovertakelsesdato: string;
    };
    perioder: Uttaksperiode[];
}

export enum OppholdsÅrsak {
    'INGEN' = 'INGEN',
    'UTTAK_MØDREKVOTE_ANNEN_FORELDER' = 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
    'UTTAK_FEDREKVOTE_ANNEN_FORELDER' = 'UTTAK_FEDREKVOTE_ANNEN_FORELDER',
    'UTTAK_FORELDREPENGER_ANNEN_FORELDER' = 'UTTAK_FORELDREPENGER_ANNEN_FORELDER',
    'UTTAK_FELLESP_ANNEN_FORELDER' = 'UTTAK_FELLESP_ANNEN_FORELDER'
}

export enum MorsAktivitetDto {
    'Arbeid' = 'ARBEID',
    'Utdanning' = 'UTDANNING',
    'Kvalifiseringsprogrammet' = 'KVALPROG',
    'Introduksjonsprogrammet' = 'INTROPROG',
    'TrengerHjelp' = 'TRENGER_HJELP',
    'Innlagt' = 'INNLAGT',
    'ArbeidOgUtdanning' = 'ARBEID_OG_UTDANNING',
    'Uføre' = 'UFØRE',
    'samtidigUttak' = 'SAMTIDIGUTTAK'
}

export enum StønadskontoType {
    'Mødrekvote' = 'MØDREKVOTE',
    'Fedrekvote' = 'FEDREKVOTE',
    'Fellesperiode' = 'FELLESPERIODE',
    'Foreldrepenger' = 'FORELDREPENGER',
    'ForeldrepengerFørFødsel' = 'FORELDREPENGER_FØR_FØDSEL',
    'Flerbarnsdager' = 'FLERBARNSDAGER', // Ikke brukt som egen type i periodene
    'AktivitetsfriKvote' = 'AKTIVITETSFRI_KVOTE' // Foreldrepenger
}
