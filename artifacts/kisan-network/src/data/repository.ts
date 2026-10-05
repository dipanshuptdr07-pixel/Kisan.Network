import {
  consultations,
  crops,
  demoBuyers,
  demoCompanies,
  demoExperts,
  demoFarmer,
  demoUsers,
  experts,
  marketPrices,
  notifications,
  orders,
  quickActions,
} from './demo';
import type { Buyer, Company, Consultation, Crop, Expert, Farmer, MarketPrice, Notification, Order, User } from './types';

export interface DemoSnapshot {
  demoFarmer: Farmer;
  demoUsers: User[];
  demoBuyers: Buyer[];
  demoCompanies: Company[];
  demoExperts: Expert[];
  crops: Crop[];
  marketPrices: MarketPrice[];
  orders: Order[];
  notifications: Notification[];
  consultations: Consultation[];
  experts: { name: string; specialty: string; initials: string; next: string }[];
  quickActions: { label: string; href: string; kind: string }[];
}

export interface KisanRepository {
  loadSnapshot(): Promise<DemoSnapshot>;
}

export const demoSnapshot: DemoSnapshot = {
  demoFarmer,
  demoUsers,
  demoBuyers,
  demoCompanies,
  demoExperts,
  crops,
  marketPrices,
  orders,
  notifications,
  consultations,
  experts,
  quickActions,
};

export const demoRepository: KisanRepository = {
  async loadSnapshot() {
    return demoSnapshot;
  },
};
