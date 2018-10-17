interface Lenker {
    [key: string]: {
        text: string;
        href: string;
    };
}

export const annenInformasjonLenker: Lenker = {
    viktigeFrister: {
        text: 'Viktige frister',
        href: 'https://www.nav.no/no/Person/Familie/Venter+du+barn/Foreldrepenger/husk-%C3%A5-s%C3%B8ke-til-rett-tid'
    },
    klagePåSøknad: {
        text: 'Klage på søknad',
        href: 'https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Klage+ris+og+ros'
    },
    kontaktOss: {
        text: 'Kontakt oss',
        href: 'https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/chat-med-oss-om-foreldrepenger'
    },
    personvernOgMasseErklæringer: {
        text: 'Personvern og masse erklæringer',
        href: 'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten'
    },
    saksbehandlingstider: {
        text: 'Utbetaling og saksbehandlingstider',
        href: 'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV'
    },
};

export const andreLenker: Lenker = {
    dittNav: { text: 'Ditt Nav', href: 'https://tjenester.nav.no/saksoversikt/' }
};
