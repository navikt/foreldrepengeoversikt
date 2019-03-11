import * as React from 'react';
import * as moment from 'moment';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import * as nn from 'react-intl/locale-data/nn';

import nbMessages from './nb_NO.json';

moment.locale('nb');

const areIntlLocalesSupported = require('intl-locales-supported');
const localesMyAppSupports = [
    'nb-NO'
];

if (global.Intl) {
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
        const IntlPolyfill    = require('intl');
        Intl.NumberFormat   = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    global.Intl = require('intl');
}

class IntlProvider extends React.Component {
    constructor(props: any) {
        super(props);
        addLocaleData([...nb, ...nn]);
    }

    render() {
        return (
            <Provider key="nb" locale="nb" messages={nbMessages}>
                {this.props.children}
            </Provider>
        );
    }
}

export default IntlProvider;
