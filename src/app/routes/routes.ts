enum OversiktRoutes {
    HOVEDSIDE = '/',
    SAKSOVERSIKT = '/',
    OPPLYSNINGER = 'opplysninger',
    DIN_PLAN = 'din-plan',
    DOKUMENTER = 'dokumenter',
    ETTERSEND = 'ettersend',
}

//TODO: Forskjell på prod og dev og saksnummer
export enum NavRoutes {
    SAKSBEHANDLINGSTIDER = 'https://www.dev.nav.no/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav/klage-og-anke_kap',
    KLAG_PÅ_VEDTAK = 'https://klage.dev.nav.no/ny?saksnummer=352011118&tema=FOR&tittel=FORELDREPENGER',
    CHAT_MED_OSS = 'https://www.nav.no/kontaktoss',
    SKRIV_TIL_OSS = 'https://innboks.nav.no/s/skriv-til-oss?category=Familie',
    RING_OSS = 'tel:55553333',
    SE_FLERE_TLF_NR_OG_TASTEVALG = 'https://www.dev.nav.no/person/kontakt-oss',
}

export default OversiktRoutes;
