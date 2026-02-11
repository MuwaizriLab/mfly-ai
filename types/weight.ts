export interface WeightPolicy {
  airline: string;
  economy: { allowed: number; extraPerKg: number };
  business: { allowed: number; extraPerKg: number };
  first: { allowed: number; extraPerKg: number };
}

export interface CalculationResult {
  airline: string;
  allowedWeight: number;
  extraWeight: number;
  extraCharge: number;
  totalCharge: number;
}