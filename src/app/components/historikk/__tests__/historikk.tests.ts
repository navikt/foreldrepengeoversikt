import { foreldrepengesoknadBehandlingMock } from '../../../../../jest/__mocks__/Sak';
import { fjernBehandlingerMedLikOpprettetDato, utledHendelser } from '../util';
import { BehandlingResultatType, BehandlingStatus } from '../../../api/types/sak/Behandling';
import { Hendelse } from '../HistorikkElement';

describe('historikk', () => {
    it('Fjerner behandlinger med samme opprettet tidsstempel fra historikk', () => {
        const behanlding1 = { ...foreldrepengesoknadBehandlingMock };
        const behanlding2 = { ...foreldrepengesoknadBehandlingMock };
        expect([behanlding1, behanlding2].filter(fjernBehandlingerMedLikOpprettetDato).length).toEqual(1);
    });

    it('Første behandling skal føre til en brukerinitiert søknad sendt hendelse', () => {
        const behanlding1 = { ...foreldrepengesoknadBehandlingMock, årsak: null };
        expect(utledHendelser([behanlding1])[0].beskrivelse).toEqual('søknad-sendt');
    });

    it('Første behandling skal føre til en innteksmelding mottatt hendelse hvis behandlingen har referanse til inntektsmelding', () => {
        const behanlding1 = { ...foreldrepengesoknadBehandlingMock, årsak: null, inntektsmeldinger: ['1234'] };
        expect(utledHendelser([behanlding1]).length).toEqual(2);
        expect(utledHendelser([behanlding1])[0].beskrivelse).toEqual('inntektsmelding-motatt');
        expect(utledHendelser([behanlding1])[1].beskrivelse).toEqual('søknad-sendt');
    });

    it('En avsluttet behandling skal ha behandlnigens resultat som egen hendelse', () => {
        const behanlding1 = { ...foreldrepengesoknadBehandlingMock, status: BehandlingStatus.AVSLUTTET, årsak: null };
        const hendelser: Hendelse[] = utledHendelser([behanlding1]);
        expect(hendelser.length).toEqual(2);
        expect(
            hendelser.some((h: Hendelse) =>
                Object.values(BehandlingResultatType)
                    .map((brt) => brt.toString())
                    .includes(h.beskrivelse)
            )
        ).toBeTruthy();
    });

    it('Hendelser skal være sortert i synkende rekkefølge etter dato', () => {
        const behanlding1 = {
            ...foreldrepengesoknadBehandlingMock,
            opprettetTidspunkt: '2018-01-21T12:10:00.33',
            endretTidspunkt: '2018-01-21T12:10:00.33'
        };
        const behanlding2 = {
            ...foreldrepengesoknadBehandlingMock,
            opprettetTidspunkt: '2019-01-21T12:10:00.33',
            endretTidspunkt: '2019-01-21T12:10:00.33'
        };
        const behanlding3 = {
            ...foreldrepengesoknadBehandlingMock,
            opprettetTidspunkt: '2017-01-21T12:10:00.33',
            endretTidspunkt: '2017-01-21T12:10:00.33'
        };
        expect(
            utledHendelser([behanlding1, behanlding2, behanlding3]).some(
                (h: Hendelse, index: number, hendelser: Hendelse[]) =>
                    hendelser[index + 1] && h.dato < hendelser[index + 1].dato
            )
        ).toBeFalsy();
    });

    it('skal utlede initiell innsending hvis historikkinnslag ikke ekisterer', () => {
        const behanlding = {
            ...foreldrepengesoknadBehandlingMock,
            opprettetTidspunkt: '2018-01-21T12:10:00.33',
            endretTidspunkt: '2018-01-21T12:10:00.33'
        };
        expect(
            utledHendelser([behanlding], undefined).find((hendelse) => hendelse.beskrivelse === 'søknad-sendt')
        ).toBeTruthy();
    });
});
