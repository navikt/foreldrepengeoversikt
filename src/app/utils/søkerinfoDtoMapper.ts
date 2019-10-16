import uniqBy from 'lodash/uniqBy';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { SøkerinfoDTO, SøkerinfoDTOArbeidsforhold } from 'app/api/types/personinfo/SøkerinfoDto';
import Person, { RegistrertBarn } from 'app/types/Person';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { erMyndig } from './personUtils';

const getPerson = (søkerinfo: SøkerinfoDTO): Person => {
    const { barn, ...person } = søkerinfo.søker;
    return {
        ...person,
        fødselsdato: person.fødselsdato,
        ikkeNordiskEøsLand: person.ikkeNordiskEøsLand,
        erMyndig: erMyndig(person.fødselsdato)
    };
};

const getRegistrerteBarn = (søkerinfo: SøkerinfoDTO): RegistrertBarn[] => {
    const { barn } = søkerinfo.søker;
    return barn
        ? barn.map(
              ({ annenForelder, ...rest }): RegistrertBarn => ({
                  ...rest,
                  annenForelder: annenForelder
                      ? {
                            ...annenForelder,
                            fødselsdato: annenForelder.fødselsdato
                        }
                      : undefined
              })
          )
        : [];
};

const getArbeidsgiverId = (arbeidsforhold: SøkerinfoDTOArbeidsforhold): string => {
    return arbeidsforhold.arbeidsgiverId;
};

const getArbeidsforhold = ({ arbeidsforhold }: SøkerinfoDTO): Arbeidsforhold[] => {
    return arbeidsforhold
        ? uniqBy(arbeidsforhold, getArbeidsgiverId).map((a: SøkerinfoDTOArbeidsforhold) => ({
              ...a,
              fom: a.fom,
              tom: a.tom ? a.tom : undefined
          }))
        : [];
};

export const getSøkerinfoFromDTO = (søkerinfo: SøkerinfoDTO): Søkerinfo => {
    return {
        person: getPerson(søkerinfo),
        registrerteBarn: getRegistrerteBarn(søkerinfo),
        arbeidsforhold: getArbeidsforhold(søkerinfo)
    };
};
