import { backgroundColorAtom } from 'app/atoms/backgroundColorAtom';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export const useSetBackgroundColor = (color: 'blue' | 'white') => {
    const setBackgroundColor = useSetAtom(backgroundColorAtom);

    useEffect(() => {
        setBackgroundColor(color);
    }, [setBackgroundColor, color]);
};
