import { backgroundColorAtom } from 'app/atoms/backgroundColorAtom';
import { useSetAtom } from 'jotai';

export const useSetBackgroundColor = (color: 'blue' | 'white') => {
    const setBackgroundColor = useSetAtom(backgroundColorAtom);
    setBackgroundColor(color);
};
