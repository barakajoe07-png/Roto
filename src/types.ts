export type CategoryId = 
  | 'vertical'
  | 'horizontal'
  | 'underground-septic'
  | 'chemical'
  | 'loft'
  | 'agricultural'
  | 'environmental'
  | 'road-safety'
  | 'custom-moulding';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: CategoryId;
  capacityLiters: number;
  capacityGallons: number;
  priceKsh: number;
  priceMaxKsh?: number;
  dimensions: {
    diameterMm?: number;
    heightMm?: number;
    lengthMm?: number;
    widthMm?: number;
    manholeDiameterMm: number;
    wallThicknessMm: number;
  };
  material: string;
  warrantyYears: number;
  colorOptions: string[];
  features: string[];
  applications: string[];
  image: string;
  badge?: string;
  inStock: boolean;
  fittingSizes: string[];
}

export interface RFQItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  customFittingNotes?: string;
}

export interface DealerLocation {
  id: string;
  name: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  isHeadquarters?: boolean;
  stockCategories: CategoryId[];
}

export interface TankAdvisorInput {
  applicationType: 'residential' | 'commercial' | 'agricultural' | 'industrial' | 'rainwater';
  occupants: number;
  roofAreaM2: number;
  livestockCount: number;
  chemicalType: string;
  locationRegion: string;
  additionalNotes: string;
}

export interface AdvisorRecommendation {
  recommendedCapacityLiters: number;
  recommendedModels: {
    name: string;
    sku: string;
    dimensions: string;
    priceKsh: number;
    highlights: string;
  }[];
  harvestingPotentialLitersPerYear: number;
  advisorSummary: string;
  tips: string[];
}

export interface DnsRecord {
  type: string;
  name: string;
  value: string;
  status: 'VERIFIED' | 'PENDING' | 'ACTION_REQUIRED';
  ttl: number;
}

export interface DomainMigrationData {
  domain: string;
  migrationStatus: 'ACTIVE_MIGRATION' | 'DNS_PROPAGATING' | 'COMPLETED';
  currentPrimaryDomain: string;
  suggestedNewDomains: string[];
  dnsRecordsRequired: DnsRecord[];
  sslStatus: string;
  adminCredentialTransfer: {
    accessLockoutRecovered: boolean;
    masterAdminEmail: string;
    recoveryTokenGenerated: boolean;
    lastBackupTimestamp: string;
  };
}
