export type Unit = 'metric' | 'imperial';
export type Tool = 'select' | 'bed' | 'plant' | 'water';

export interface Bed {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  pattern: number;
}

export interface Plant {
  id: string;
  bedId: string;
  name: string;
  variety: string;
  x: number;
  y: number;
  status: 'active' | 'finished';
}

export interface WaterLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface CareNote {
  id: string;
  plantId: string;
  date: string;
  action: string;
  note: string;
  photo?: string;
}

export interface SeasonArchive {
  id: string;
  name: string;
  createdAt: string;
  counts: { beds: number; plants: number; notes: number };
  snapshot: {
    unit: Unit;
    beds: Bed[];
    plants: Plant[];
    waterLines: WaterLine[];
    notes: CareNote[];
  };
}

export interface GardenData {
  name: string;
  unit: Unit;
  beds: Bed[];
  plants: Plant[];
  waterLines: WaterLine[];
  notes: CareNote[];
  archives: SeasonArchive[];
  updatedAt: string;
}
