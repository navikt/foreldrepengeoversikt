import React from 'react';
import { NavRoutes } from 'app/routes/routes';
import { Link } from 'react-router-dom';
import { bemUtils, intlUtils } from '@navikt/fp-common';
import './kontaktOss.css';
import { BodyShort, Heading, Tag } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { Dialog } from '@navikt/ds-icons';
import { Telephone } from '@navikt/ds-icons';
import { Email } from '@navikt/ds-icons';

const KontaktOss: React.FunctionComponent = () => {
    const bem = bemUtils('kontaktOss');
    const intl = useIntl();

    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <div className={bem.element('title')}>
                    <Heading size="medium">{intlUtils(intl, 'saksoversikt.kontaktOss')}</Heading>
                </div>
                <div className={bem.element('content')}>
                    <div className={bem.element('content_left')}>
                        <Link to={NavRoutes.CHAT_MED_OSS} className={bem.element('link')}>
                            <Dialog className={bem.element('linkIcon')}></Dialog>
                            <BodyShort className={bem.element('linkTitle')}>Chat med oss</BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            Du møter først chatbot Frida som svarer deg. Du kan også be Frida om å få snakke med en
                            veileder (hverdager 09.00-15.00).
                        </BodyShort>
                    </div>
                    <div className={bem.element('content_middle')}>
                        <Link to={NavRoutes.SKRIV_TIL_OSS} className={bem.element('link')}>
                            <Email className={bem.element('linkIcon')}></Email>
                            <BodyShort className={bem.element('linkTitle')}>Skriv til oss</BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            Send beskjed eller nye opplysninger i saken din. Du kan også sende spørsmål.
                        </BodyShort>
                        <BodyShort size="medium" className={bem.element('content_text')}>
                            Svartid er 2 arbeidsdager. Vil du ha svar raskere, kan du bruke chat.
                        </BodyShort>
                    </div>
                    <div className={bem.element('content_right')}>
                        <Link to={NavRoutes.RING_OSS} className={bem.element('link')}>
                            <Telephone className={bem.element('linkIcon')}></Telephone>
                            <BodyShort className={bem.element('linkTitle')}>Ring oss på 55 55 33 33</BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            Åpningstider: hverdager 09.00-15.00. Vi kan ringe deg tilbake hvis ventetiden er over 5 min.
                        </BodyShort>
                        <Tag className={bem.element('content_text')} variant="success">
                            Åpent nå
                        </Tag>
                        <Link to={NavRoutes.SE_FLERE_TLF_NR_OG_TASTEVALG} className={bem.element('content_text')}>
                            <BodyShort size="medium">Se flere telefonnummer</BodyShort>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KontaktOss;
