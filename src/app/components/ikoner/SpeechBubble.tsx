import React, { SVGProps } from 'react';

type Props = SVGProps<any>;
const SpeechBubble = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="99" height="76" viewBox="0 0 99 76">
        <g fill="none" fillRule="evenodd">
            <path
                fill="#C1B5D0"
                d="M82.799 30.19c0 16.54-18.388 29.956-41.076 29.956-5.065 0-9.912-.674-14.391-1.896L3.729 68.069l9.244-16.491C5.368 46.142.65 38.567.65 30.19.65 13.65 19.038.238 41.726.238S82.8 13.648 82.8 30.19z"
            />
            <path
                fill="#E0DAE7"
                stroke="#FFF"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M75.501 67.254l21.325 8.773-8.414-14.842C94.5 56.614 98 50.482 98 43.915c0-13.774-15.274-24.788-33.992-24.788-18.716 0-33.988 11.014-33.988 24.789 0 13.773 15.276 24.791 33.991 24.791 3.959 0 7.829-.496 11.49-1.453z"
            />
        </g>
    </svg>
);
export default SpeechBubble;
