import React, { SVGProps } from 'react';

type Props = SVGProps<any>;
const CashIcon = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" {...props}>
        <g fill="none" fillRule="evenodd">
            <path
                stroke="#3E3832"
                strokeLinejoin="round"
                strokeWidth="1.034"
                d="M29.672 15.397c0 7.885-6.39 14.275-14.275 14.275-7.884 0-14.276-6.39-14.276-14.275C1.12 7.514 7.513 1.12 15.397 1.12c7.885 0 14.275 6.393 14.275 14.276z"
            />
            <path
                fill="#3E3832"
                d="M9.81 20.983V9.81h1.318v7.564h.049l3.368-4.017h1.48l-2.652 3.06 3.01 4.566H14.92l-2.31-3.672-1.48 1.663v2.009H9.81zm8.054 0v-7.626h1.106l.114 1.38h.049c.537-.957 1.35-1.569 2.245-1.569.342 0 .586.047.846.157l-.26 1.13a2.286 2.286 0 0 0-.765-.125c-.667 0-1.464.47-2.001 1.757v4.896h-1.334z"
            />
        </g>
    </svg>
);
export default CashIcon;
