// I have used ContextAPI to manage the state of medals data. in larger app and deppending on the state requirment, we can use state management libraries like Redux, Zustand, or Recoil.
"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { MedalsType, MedalApiResponse } from "@/app/types/medals";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";

interface MedalContextType {
  medals: MedalsType[];
  loading: boolean;
  error: Error | null;
}

const MedalContext = createContext<MedalContextType | undefined>(undefined);

export const MedalProvider = ({children} : { children: React.ReactNode }) => {
  const { data, error, isLoading } = useSWR<MedalApiResponse, Error>("/api/medals", fetcher);

  // memoizing medal context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      medals: data?.medals ?? [],
      loading: isLoading,
      error: error ?? null,
    }),
    [data, isLoading, error]
  );

  console.log("MedalProvider context value:", contextValue);

  return <MedalContext.Provider value={contextValue}>{children}</MedalContext.Provider>;
};

export const useMedalContext = () => {
  const context = useContext(MedalContext);
  if (context === undefined) {
    throw new Error("useMedalContext must be used within a MedalProvider");
  }
  return context;
};
