// I have used ContextAPI to manage the state of medals data. in larger app and deppending on the state requirment, we can use state management libraries like Redux, Zustand, or Recoil.
'use client';

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import type { MedalsType, MedalApiResponse, SortKey } from '@/app/types/medals';
import useSWR from 'swr';
import { fetcher } from '@/app/lib/fetcher';
import { calculateTotalMedals, createMedalSortFunction } from '@/app/lib/utils';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface MedalContextType {
  medals: MedalsType[];
  loading: boolean;
  error: Error | null;
  currentSortKey: SortKey;
  setSort: (key: SortKey) => void;
}

const MedalContext = createContext<MedalContextType | undefined>(undefined);

export const MedalProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialSortParam = searchParams.get('sort');

  const isValidSortKey = (key: string | null): key is SortKey => {
    return key === 'code' || key === 'gold' || key === 'silver' || key === 'bronze' || key === 'total';
  };

  const [currentSortKey, setCurrentSortKey] = useState<SortKey>(() => {
    if (initialSortParam && isValidSortKey(initialSortParam)) {
      return initialSortParam;
    }
    return 'gold';
  });

  const { data, error, isLoading } = useSWR<MedalApiResponse, Error>('/api/medals', fetcher);

  // memoizing medal context value to avoid unnecessary re-renders
  const processedMedals: MedalsType[] = useMemo(() => {
    if (!data?.medals) return [];
    return data.medals.map((medal) => ({
      ...medal,
      total: calculateTotalMedals(medal),
    }));
  }, [data]);

  const sortedMedals = useMemo(() => {
    if (processedMedals.length === 0) return [];
    return [...processedMedals].sort(createMedalSortFunction(currentSortKey));
  }, [processedMedals, currentSortKey]);

  const setSort = useCallback(
    (key: SortKey) => {
      setCurrentSortKey(key);
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('sort', key);

      router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const contextValue = useMemo(
    () => ({
      medals: sortedMedals,
      loading: isLoading,
      error: error ?? null,
      currentSortKey,
      setSort,
    }),
    [sortedMedals, isLoading, error, currentSortKey, setSort]
  );

  return <MedalContext.Provider value={contextValue}>{children}</MedalContext.Provider>;
};

export const useMedalContext = () => {
  const context = useContext(MedalContext);
  if (context === undefined) {
    throw new Error('useMedalContext must be used within a MedalProvider');
  }
  return context;
};
