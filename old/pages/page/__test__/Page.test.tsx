import { shallow } from 'enzyme';
import Page from '../Page';
import React from 'react';
import LetterIcon from '../old/components/ikoner/LetterIcon';

describe('Page', () => {
    it('renders icon', () => {
        const wrapper = shallow(
            <Page className="page" pageTitle="pageTitle" title="title" icon={() => <LetterIcon />} />
        );
        const letterIcon = wrapper.find({ className: 'page__icon' });
        expect(letterIcon.length).toEqual(1);
    });
});
