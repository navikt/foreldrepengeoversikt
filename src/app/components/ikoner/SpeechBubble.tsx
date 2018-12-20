import React, { SVGProps } from 'react';

type Props = SVGProps<any>;
const SpeechBubble = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="78" height="73" viewBox="0 0 78 73" {...props}>
        <path
            fill="none"
            fillRule="evenodd"
            stroke="#0067C5"
            strokeLinejoin="round"
            d="M77.333 32.382c0 17.192-17.16 31.138-38.333 31.138-4.727 0-9.25-.7-13.43-1.971L3.543 71.756l8.627-17.142C5.073 48.964.67 41.089.67 32.382c0-17.195 17.16-31.134 38.333-31.134 21.174 0 38.33 13.94 38.33 31.134z"
        />
    </svg>
);
export default SpeechBubble;
