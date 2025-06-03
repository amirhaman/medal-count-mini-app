export interface MedalsType {
  code: string;
  gold: number;
  silver: number;
  bronze: number;
  total?: number;
}

export interface MedalApiResponse {
  medals: MedalsType[];
}

export type SortKey = 'code' | 'gold' | 'silver' | 'bronze' | 'total';
