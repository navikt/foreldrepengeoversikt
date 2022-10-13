import * as React from 'react';
import { shallow } from 'enzyme';
const moment = require('moment');
import SaksinformasjonPanel from '../SaksinformasjonPanel';
import SakerMock, { foreldrepengesoknadBehandlingMock } from '../../../../jest/__mocks__/Sak';
import { BehandlingResultatType } from 'app/api/types/sak/Behandling';
import { FagsakStatus } from 'app/api/types/sak/FagsakStatus';

describe('SaksinformasjonPanel', () => {
    it('Ettersendelse should be disabled if sak is from infotrygd and the 150 day deadline on ettersendelse has expired', () => {
        const opprettetDate = moment().subtract(151, 'days').format('YYYY-MM-DD');
        const wrapper = shallow(
            <SaksinformasjonPanel
                sak={{ ...SakerMock.infotrygd, opprettet: opprettetDate }}
                history={jest.fn() as any}
                historikkInnslagListe={[]}
                manglendeVedlegg={[]}
            />
        );
        const uploadButton = wrapper.find({ className: 'saksinformasjon-panel__ettersendelse-btn' });
        expect(uploadButton.props().disabled).toBeTruthy();
    });

    it('Ettersendelse should be enabled 150 days after the application is sent if sak is from infotrygd', () => {
        const opprettetDate = moment().subtract(149, 'days').format('YYYY-MM-DD');

        const wrapper = shallow(
            <SaksinformasjonPanel
                sak={{ ...SakerMock.infotrygd, opprettet: opprettetDate }}
                history={jest.fn() as any}
                historikkInnslagListe={[]}
                manglendeVedlegg={[]}
            />
        );
        const ettersendelseButton = wrapper.find({ className: 'saksinformasjon-panel__ettersendelse-btn' });
        expect(ettersendelseButton.props().disabled).toBeFalsy();
    });

    it('Ettersendelse skal should be enabled 7 weeks after last innvilget/avslått behandlig if saksstatus is avsluttet', () => {
        const wrapper = shallow(
            <SaksinformasjonPanel
                sak={{
                    ...SakerMock.fpsakFP,
                    status: FagsakStatus.AVSLUTTET,
                    behandlinger: [
                        {
                            ...foreldrepengesoknadBehandlingMock,
                            behandlingResultat: BehandlingResultatType.INNVILGET,
                            endretTidspunkt: moment().add(7, 'weeks').format(moment.HTML5_FMT.DATE),
                        },
                    ],
                }}
                history={jest.fn() as any}
                historikkInnslagListe={[]}
                manglendeVedlegg={[]}
            />
        );
        const ettersendelseButton = wrapper.find({ className: 'saksinformasjon-panel__ettersendelse-btn' });
        expect(ettersendelseButton.props().disabled).toBeFalsy();
    });
});
