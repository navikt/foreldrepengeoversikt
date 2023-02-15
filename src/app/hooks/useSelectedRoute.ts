import { selectedRouteAtom } from 'app/atoms/selectedRouteAtom';
import SelectedRoute from 'app/types/SelectedRoute';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

export const useGetSelectedRoute = () => {
    const selectedRoute = useAtomValue(selectedRouteAtom);
    return selectedRoute;
};

export const useSetSelectedRoute = (route: SelectedRoute) => {
    const setSelectedRoute = useSetAtom(selectedRouteAtom);

    useEffect(() => {
        setSelectedRoute(route);
    }, [setSelectedRoute, route]);
};
