export interface LineConfig {
  id: number;
  Ydiff: number;
  thickness: number;
  centerColor: string;
  leftOpacity: number;
  centerOpacity: number;
  rightOpacity: number;
  cycleTime: number;
  amplitude: number;
  basePhase: number;
  pointPhases: number[];
  driftPhase: number;
  isGlow: boolean;
}
