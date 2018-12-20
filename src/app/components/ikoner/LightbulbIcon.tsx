import React, { SVGProps } from 'react';

type Props = SVGProps<any>;
const LightbulbIcon = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="64" viewBox="0 0 42 64" {...props}>
        <g fill="none" fillRule="evenodd">
            <path
                fill="#FFFA99"
                d="M21 42.353C9.474 42.353.13 32.872.13 21.176.13 9.481 9.474 0 21 0c11.526 0 20.87 9.481 20.87 21.176 0 11.696-9.344 21.177-20.87 21.177z"
            />
            <path
                fill="#FFFA99"
                d="M28.042 45.176H13.958c-1.49 0-2.697-1.243-2.697-2.778V23.955c0-1.534 1.208-2.779 2.697-2.779h14.084c1.49 0 2.697 1.245 2.697 2.779v18.443c0 1.535-1.207 2.778-2.697 2.778"
            />
            <path
                fill="#595B5C"
                d="M28.32 52.235H13.68c-1.336 0-2.42-1.264-2.42-2.823 0-1.56 1.084-2.824 2.42-2.824h14.64c1.337 0 2.42 1.265 2.42 2.824s-1.083 2.823-2.42 2.823M28.32 59.294H13.68c-1.336 0-2.42-1.264-2.42-2.823s1.084-2.824 2.42-2.824h14.64c1.337 0 2.42 1.265 2.42 2.824s-1.083 2.823-2.42 2.823M24.159 60.706h-6.317c-.953 0-1.385 1.103-.633 1.636A6.534 6.534 0 0 0 21 63.529a6.535 6.535 0 0 0 3.792-1.187c.75-.533.319-1.636-.633-1.636"
            />
        </g>
    </svg>
);
export default LightbulbIcon;
