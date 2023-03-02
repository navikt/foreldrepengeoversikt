import { foreldrepengesoknadBehandlingMock } from '../../../../jest/__mocks__/Sak';
import { fjernBehandlingerMedLikOpprettetDato, utledHendelser } from '../util';
import { BehandlingResultatType, BehandlingStatus } from '../../../api/types/sak/Behandling';
import { Hendelse } from '../HistorikkElement';

describe('historikk', () => {
    it('Fjerner behandlinger med samme opprettet tidsstempel fra historikk', () => {
        const behandling1 = { ...foreldrepengesoknadBehandlingMock };
        const behandling2 = { ...foreldrepengesoknadBehandlingMock };
        expect([behandling1, behandling2].filter(fjernBehandlingerMedLikOpprettetDato).length).toEqual(1);
    });

    it('Første behandling skal føre til en innteksmelding mottatt hendelse hvis behandlingen har referanse til inntektsmelding', () => {
        const behandling1 = { ...foreldrepengesoknadBehandlingMock, årsak: null, inntektsmeldinger: ['1234'] };
        expect(utledHendelser([behandling1]).length).toEqual(1);
        expect(utledHendelser([behandling1])[0].type).toEqual('inntektsmelding-motatt');
    });

    it('En avsluttet behandling skal ha behandlingens resultat som egen hendelse', () => {
        const behandling1 = { ...foreldrepengesoknadBehandlingMock, status: BehandlingStatus.AVSLUTTET, årsak: null };
        const hendelser: Hendelse[] = utledHendelser([behandling1]);
        expect(hendelser.length).toEqual(1);
        expect(
            hendelser.some((h: Hendelse) =>
                Object.values(BehandlingResultatType)
                    .map((brt) => brt.toString())
                    .includes(h.type)
            )
        ).toBeTruthy();
    });

    it('Hendelser skal være sortert i synkende rekkefølge etter dato', () => {
        const behandling1 = {
            ...foreldrepengesoknadBehandlingMock,
            opprettetTidspunkt: '2018-01-21T12:10:00.33',
            endretTidspunkt: '2018-01-21T12:10:00.33',
        };
        const behandling2 = {
            ...foreldrepengesoknadBehandlingMock,
            opprettetTidspunkt: '2019-01-21T12:10:00.33',
            endretTidspunkt: '2019-01-21T12:10:00.33',
        };
        const behanlding3 = {
            ...foreldrepengesoknadBehandlingMock,
            opprettetTidspunkt: '2017-01-21T12:10:00.33',
            endretTidspunkt: '2017-01-21T12:10:00.33',
        };
        expect(
            utledHendelser([behandling1, behandling2, behanlding3]).some(
                (h: Hendelse, index: number, hendelser: Hendelse[]) =>
                    hendelser[index + 1] && h.dato < hendelser[index + 1].dato
            )
        ).toBeFalsy();
    });
});
