// import { Kjønn } from '@navikt/fp-common';

// export const getForeldreparIkonProps = (className: string, width: number, height: number) => ({
//     focusable: 'false',
//     role: 'presentation',
//     viewBox: '0 0 68 96',
//     className,
//     width,
//     height,
// });

// export const getForeldreparIkon = (
//     kjønnPåSøker: Kjønn,
//     erAnnenForelder: boolean,
//     className: string,
//     width: number,
//     height: number
// ): any => {
//     if (kjønnPåSøker === 'M' && !erAnnenForelder) {
//         return <Far1 {...getForeldreparIkonProps(className, width, height)} />;
//     }
//     if (kjønnPåSøker === 'M' && erAnnenForelder) {
//         return <Far2 {...getForeldreparIkonProps(className, width, height)} />;
//     }
//     if (kjønnPåSøker === 'K' && erAnnenForelder) {
//         return <Medmor1 {...getForeldreparIkonProps(className, width, height)} />;
//     }
//     if (kjønnPåSøker === 'K' && !erAnnenForelder) {
//         return <Mor1 {...getForeldreparIkonProps(className, width, height)} />;
//     }
// };
