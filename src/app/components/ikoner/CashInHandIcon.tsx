import React, { SVGProps } from 'react';

type Props = SVGProps<any>;
const CashInHandIcon = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" {...props}>
        <g fill="none" fillRule="evenodd" stroke="#3E3832" strokeLinejoin="round" strokeWidth="1.034">
            <path d="M5.836 28.356H.663v-10.4h5.173z" />
            <path
                strokeLinecap="round"
                d="M5.835 26.362c13.578 4.526 9.052 4.526 24.57-3.233-1.375-1.373-2.46-1.698-3.88-1.293l-5.734 1.902"
            />
            <path
                strokeLinecap="round"
                d="M5.835 19.25h3.88c3.042 0 5.172 1.94 5.819 2.586h3.879c2.061 0 2.061 2.586 0 2.586h-7.112M18.766 5.026a3.88 3.88 0 1 0 7.759 0 3.88 3.88 0 0 0-7.759 0zM12.3 14.078a3.88 3.88 0 1 0 7.759 0 3.88 3.88 0 0 0-7.758 0zM16.18 12.784v2.587M22.646 3.733v2.586"
            />
        </g>
    </svg>
);
export default CashInHandIcon;
