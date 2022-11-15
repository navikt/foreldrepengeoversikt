import { Dekningsgrad } from './Dekningsgrad';
import { Periode } from './Periode';
import { Person } from './Person';
import { RettighetType } from './RettighetType';

export interface Sak {
    saksnummer: string;
    sakAvsluttet: boolean;
    sisteSøknadMottattDato: string;
    kanSøkeOmEndring: boolean;
    sakTilhørerMor: boolean;
    gjelderAdopsjon: boolean;
    morUføretrygd: boolean;
    harAnnenForelderTilsvarendeRettEØS: boolean;
    ønskerJustertUttakVedFødsel: boolean;
    rettighetType: RettighetType;
    annenPart: Person;
    familiehendelse: any;
    gjeldendeVedtak: {
        perioder: Periode[];
    };
    barn: Person[];
    dekningsgrad: Dekningsgrad;
}
