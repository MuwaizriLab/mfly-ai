export interface WeightPolicy {
  airline: string;
  economy_allowed: number;
  economy_extra_per_kg: number;
  business_allowed: number;
  business_extra_per_kg: number;
  first_allowed: number;
  first_extra_per_kg: number;
}

// واجهة للملفات المحلية (للتوافق مع الكود القديم)
export interface LocalWeightPolicy {
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