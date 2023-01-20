import { backgroundColorAtom } from 'app/atoms/backgroundColorAtom';
import { useAtomValue } from 'jotai';

export const useGetBackgroundColor = () => {
    const backgroundColor = useAtomValue(backgroundColorAtom);
    return backgroundColor;
};
