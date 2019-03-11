import React from 'react';

const KonfoluttIkon = (props: any) => (
    <svg width={72} height={72} {...props}>
        <g fill="none" fillRule="evenodd">
            <circle cx={36} cy={36} r={36} fill="#A190B8" />
            <g transform="translate(14.163 23.684)">
                <rect width={43.579} height={24.632} x={0.047} fill="#E7E9E9" rx={2} />
                <path
                    fill="#FFF"
                    d="M2.095 0h39.483a2 2 0 0 1 .902 3.785L22.288 13.983a1 1 0 0 1-.902 0L1.194 3.785A2 2 0 0 1 2.095 0z"
                />
                <path
                    fill="#FFA733"
                    d="M33.837 15.65c4.227 0 7.667 3.439 7.667 7.666s-3.44 7.666-7.667 7.666c-4.228 0-7.667-3.439-7.667-7.666 0-4.228 3.44-7.667 7.667-7.667z"
                />
                <path
                    fill="#3E3832"
                    d="M34.504 26.747a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0zm-1-2.13v-5.101c0-.445.666-.445.666 0v5.101c0 .445-.666.445-.666 0z"
                />
            </g>
        </g>
    </svg>
);

export default KonfoluttIkon;
