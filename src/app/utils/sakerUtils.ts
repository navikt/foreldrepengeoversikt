import Sak from '../types/Sak';

export const datesByDescendingOrder = (a: Sak, b: Sak) => b.opprettet.localeCompare(a.opprettet);
