import { getHeaderTitleIntlKey } from '../util';
import SakerMock from '../../../../../jest/__mocks__/Sak';

describe('header', () => {
    it('should render correct title', () => {
        expect(getHeaderTitleIntlKey([])).toEqual('header.title.default');
        expect(getHeaderTitleIntlKey([SakerMock.fpsakFP])).toEqual('header.title.FP');
        expect(getHeaderTitleIntlKey([SakerMock.fpsakES])).toEqual('header.title.ES');
        expect(getHeaderTitleIntlKey([SakerMock.fpsakSVP])).toEqual('header.title.SVP');
        expect(getHeaderTitleIntlKey([SakerMock.fpsakFP, SakerMock.fpsakES])).toEqual('header.title.ES.FP');
        expect(getHeaderTitleIntlKey([SakerMock.fpsakFP, SakerMock.fpsakSVP])).toEqual('header.title.FP.SVP');
        expect(getHeaderTitleIntlKey([SakerMock.fpsakES, SakerMock.fpsakSVP])).toEqual('header.title.ES.SVP');
        expect(getHeaderTitleIntlKey([SakerMock.fpsakES, SakerMock.fpsakFP, SakerMock.fpsakSVP])).toEqual(
            'header.title.ES.FP.SVP'
        );
    });
});
