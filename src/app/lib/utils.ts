import { MedalsType, SortKey } from '@/app/types/medals';

export const calculateTotalMedals = (item: Omit<MedalsType, 'total'>): number => item.gold + item.silver + item.bronze;

export const createMedalSortFunction =
  (sortKey: SortKey) =>
  (a: MedalsType, b: MedalsType): number => {
    if (sortKey === 'code') {
      return a.code.localeCompare(b.code);
    }

    const valA = a[sortKey] as number;
    const valB = b[sortKey] as number;

    if (valA === valB) {
      switch (sortKey) {
        case 'total':
          return b.gold - a.gold;
        case 'gold':
          return b.silver - a.silver;
        case 'silver':
          return b.gold - a.gold;
        case 'bronze':
          return b.gold - a.gold;
        default:
          return 0;
      }
    } else {
      return valB - valA; // Always descending for medal counts
    }
  };
