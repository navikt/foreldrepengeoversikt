import * as React from 'react';

const CheckmarkIkon = (props: any) => (
    <svg viewBox="0 0 24 24" {...props}>
        <g fillRule="evenodd" clipRule="evenodd">
            <path d="M12 0c6.6 0 12 5.4 12 12s-5.4 12-12 12S0 18.6 0 12 5.4 0 12 0z" fill="#06893a" />
            <path
                d="M16.5 7.6c.4-.4 1.1-.4 1.5.1.4.4.4 1.1-.1 1.5l-7.8 7.3c-.4.4-1.1.4-1.4 0L6 13.8c-.4-.4-.4-1.1 0-1.5.4-.4 1.1-.4 1.5 0l1.9 1.9 7.1-6.6z"
                fill="#fff"
            />
        </g>
    </svg>
);

export default CheckmarkIkon;
