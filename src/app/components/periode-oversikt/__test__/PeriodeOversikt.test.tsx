import * as React from 'react';
import PeriodeOversikt from '../PeriodeOversikt';
import { shallow } from 'enzyme';



describe('PeriodeOversikt', () => {
    it('Skal vise nåværende periode', () => {
        const wrapper = shallow(<PeriodeOversikt perioder={[]} />);
        expect(wrapper)        
    });
});
