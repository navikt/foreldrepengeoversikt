import * as React from 'react';

const CalendarIkon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
        <g fill="none" fillRule="evenodd">
            <circle cx="50" cy="50" r="50" fill="#C1B5D0" />
            <path fill="#FFF" d="M80 68.75a7.5 7.5 0 0 1-7.5 7.5h-45a7.5 7.5 0 0 1-7.5-7.5V32.5h60v36.25z" />
            <path
                fill="#BA3A26"
                d="M27.5 23.75h45a7.5 7.5 0 0 1 7.5 7.5v5H20v-5a7.5 7.5 0 0 1 7.5-7.5zm36.875 8.75a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75zm-28.75 0a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75z"
            />
            <g transform="translate(28.75 43.75)">
                <rect width="42.5" height="2.5" fill="#C6C2BF" rx="1.25" />
                <rect width="9.375" height="2.5" x="33.125" y="7.5" fill="#C6C2BF" rx="1.25" />
                <rect width="20.625" height="2.5" y="7.5" fill="#C6C2BF" rx="1.25" />
                <rect width="42.5" height="2.5" y="15" fill="#C6C2BF" rx="1.25" />
                <rect width="42.5" height="2.5" y="22.5" fill="#C6C2BF" rx="1.25" />
                <circle cx="26.875" cy="8.75" r="3.75" fill="#FFA733" />
            </g>
        </g>
    </svg>
);

export default CalendarIkon;
