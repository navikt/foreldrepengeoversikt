export default interface Behandling {
    opprettetTidspunkt: string;
    endretTidspunkt: string;
    behandlendeEnhet: string;
    behandlendeEnhetNavn: string;
    id: any;
    status: BehandlingStatus;
    tema: string;
    type: string;
    årsak: BehandlingÅrsak | null;
    behandlingResultat: BehandlingResultatType;
    inntektsmeldinger: string[];
}

export enum BehandlingResultatType {
    IKKE_FASTSATT = 'IKKE_FASTSATT',
    INNVILGET = 'INNVILGET',
    AVSLÅTT = 'AVSLÅTT',
    OPPHØR = 'OPPHØR',
    HENLAGT_SØKNAD_TRUKKET = 'HENLAGT_SØKNAD_TRUKKET',
    HENLAGT_FEILOPPRETTET = 'HENLAGT_FEILOPPRETTET',
    HENLAGT_BRUKER_DØD = 'HENLAGT_BRUKER_DØD',
    MERGET_OG_HENLAGT = 'MERGET_OG_HENLAGT',
    HENLAGT_SØKNAD_MANGLER = 'HENLAGT_SØKNAD_MANGLER',

    KLAGE_AVVIST = 'KLAGE_AVVIST',
    KLAGE_MEDHOLD = 'KLAGE_MEDHOLD',
    KLAGE_YTELSESVEDTAK_OPPHEVET = 'KLAGE_YTELSESVEDTAK_OPPHEVET',
    KLAGE_YTELSESVEDTAK_STADFESTET = 'KLAGE_YTELSESVEDTAK_STADFESTET',
    HENLAGT_KLAGE_TRUKKET = 'HENLAGT_KLAGE_TRUKKET',

    INNSYN_INNVILGET = 'INNSYN_INNVILGET',
    INNSYN_DELVIS_INNVILGET = 'INNSYN_DELVIS_INNVILGET',
    INNSYN_AVVIST = 'INNSYN_AVVIST',

    FORELDREPENGER_ENDRET = 'FORELDREPENGER_ENDRET'
}

export enum BehandlingStatus {
    OPPRETTET = 'OPPRE',
    UTREDES = 'UTRED',
    FATTER_VEDTAK = 'FVED',
    IVERKSETTER_VEDTAK = 'IVED',
    AVSLUTTET = 'AVSLU'
}

export enum BehandlingÅrsak {
    HENDELSE_FØDSEL = 'RE-HENDELSE-FØDSEL',
    MANGLENDE_FØDSEL = 'RE-MF',
    MANGLENDE_FØDSEL_TERMIN = 'RE-MFIP',
    ULIKT_ANTALL_BARN = 'RE-AVAB',
    FEIL_LOVANVENDELSE = 'RE-LOV',
    FEIL_REGELVERKSFORSTÅELSE = 'RE-RGLF',
    FEIL_ELLER_ENDRET_FAKTA = 'RE-FEFAKTA',
    PROSESSURELL_FEIL = 'RE-PRSSL',
    ETTER_KLAGE = 'ETTER_KLAGE',
    ENDRING_FRA_BRUKER = 'RE-END-FRA-BRUKER',
    ENDRET_INNTEKTSMELDING = 'RE-END-INNTEKTSMELD',
    KØET_BEHANDLING = 'KØET_BEHANDLING',
    BERØRT_BEHANDLING = 'BERØRT-BEHANDLING',
    REGISTER_OPPLYSNING = 'RE-REGISTEROPPL',
    YTELSE = 'RE-YTELSE',
    KLAGE = 'RE-KLAG',
    MEDLEMSKAP = 'RE-MDL',
    OPPTJENING = 'RE-OPTJ',
    FORDELING_STØNADSPERIODE = 'RE-FRDLING',
    INNTEKT = 'RE-INNTK',
    DØD = 'RE-DØD',
    RELASJON_TIL_BARNET = 'RE-SRTB',
    SØKNADSFRIST = 'RE-FRIST',
    BEREGNINGSGRUNNLAG = 'RE-BER-GRUN',
    TILSTØTENDE_YTELSE_INNVILGET = 'RE-TILST-YT-INNVIL',
    ENDRING_BEREGNINGSGRUNNLAG = 'RE-ENDR-BER-GRUN',
    TILSTØTENDE_YTELSE_OPPHØRT = 'RE-TILST-YT-OPPH',
    ANNET = 'RE-ANNET'
}

export enum BehandlingTema {
    'ENGANGSTØNAD' = 'ENGST',
    'ENGANGSTØNAD_FØDSEL' = 'ENGST_FODS',
    'ENGANGSTØNAD_ADOPSJON' = 'ENGST_ADOP',
    'FORELDREPENGER' = 'FORP',
    'FORELDREPENGER_ADOPSJON' = 'FORP_ADOP',
    'FORELDREPENGER_FØDSEL' = 'FORP_FODS',
    'UDEFINERT' = '-'
}
