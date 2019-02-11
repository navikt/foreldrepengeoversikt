import { behandlingMock } from '../../../../../jest/__mocks__/Sak';
import { fjernBehandlingerMedLikOpprettetOgEndretDato, oversettResultat, utledHendelser } from '../util';
import { BehandlingStatus } from '../../../types/Behandling';
import { Hendelse } from '../HistorikkElement';

describe('historikk', () => {
    it('Fjerner behandlinger med samme opprettet tidsstempel fra hendelse historikk', () => {
        const behanlding1 = { ...behandlingMock };
        const behanlding2 = { ...behandlingMock };
        expect([behanlding1, behanlding2].filter(fjernBehandlingerMedLikOpprettetOgEndretDato).length).toEqual(1);
    });

    it('Første behandling skal uansett føre til en brukerinitiert søknad sendt hendelse', () => {
        const behanlding1 = { ...behandlingMock, årsak: null };
        expect(utledHendelser([behanlding1])[0].beskrivelse).toEqual('Søknad Sendt');
    });

    it('Første behandling skal føre til en innteksmelding mottatt hendelse hvis behandlingen har referanse til inntektsmelding', () => {
        const behanlding1 = { ...behandlingMock, årsak: null, inntektsmeldinger: ['1234'] };
        expect(utledHendelser([behanlding1]).length).toEqual(2);
        expect(utledHendelser([behanlding1])[1].beskrivelse).toEqual('Inntektsmelding mottatt');
        expect(utledHendelser([behanlding1])[0].beskrivelse).toEqual('Søknad Sendt');
    });

    it('En avsluttet behandling skal ha behandlnigens resultat som egen hendelse', () => {
        const behanlding1 = { ...behandlingMock, status: BehandlingStatus.AVSLUTTET, årsak: null };
        const hendelser: Hendelse[] = utledHendelser([behanlding1]);
        expect(hendelser.length).toEqual(2);
        expect(
            hendelser.some((h: Hendelse) => h.beskrivelse === oversettResultat(behanlding1.behandlingResultat))
        ).toBeTruthy();
    });

    it('Hendelser skal være sortert i synkende rekkefølge etter dato', () => {
        const behanlding1 = {
            ...behandlingMock,
            opprettetTidspunkt: '2018-01-21T12:10:00.33',
            endretTidspunkt: '2018-01-21T12:10:00.33'
        };
        const behanlding2 = {
            ...behandlingMock,
            opprettetTidspunkt: '2019-01-21T12:10:00.33',
            endretTidspunkt: '2019-01-21T12:10:00.33'
        };
        const behanlding3 = {
            ...behandlingMock,
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
});
