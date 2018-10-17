import React, { SVGProps } from 'react';

type Props = SVGProps<any>;
const FileIcon: React.StatelessComponent<Props> = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24">
        <path
            fill="none"
            fillRule="evenodd"
            stroke="#111"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.5 23.5H.5V.5h11l6 6v17zm-6-23v6h6l-6-6zm-7 7H9 4.5zm0 3h9-9zm0 3h9-9zm0 3h9-9zm0 3h9-9z"
        />
    </svg>
);
export default FileIcon;
