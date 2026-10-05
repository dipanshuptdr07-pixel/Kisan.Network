export const publicRoles = ['farmer', 'buyer', 'company', 'expert'] as const;
export type Role = (typeof publicRoles)[number];
export type AdminSection = 'overview' | 'users' | 'farmers' | 'buyers' | 'companies' | 'experts' | 'marketplace' | 'reports' | 'analytics' | 'settings';

export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && publicRoles.includes(value as Role);
}

export function isAdminSection(value: unknown): value is AdminSection {
  return typeof value === 'string' && ['overview', 'users', 'farmers', 'buyers', 'companies', 'experts', 'marketplace', 'reports', 'analytics', 'settings'].includes(value);
}

export interface User { id: string; name: string; phone: string; role?: Role; location: string; }
export interface Farmer { id: string; name: string; location: string; acreage: number; crops: string[]; }
export interface Buyer { id: string; name: string; organization: string; location: string; }
export interface Company { id: string; name: string; organization: string; location: string; }
export interface Expert { id: string; name: string; specialty: string; location: string; }
export interface Crop { id: string; name: string; variety: string; area: number; stage: string; harvest: string; }
export interface Order { id: string; crop: string; quantity: string; buyer: string; status: string; amount: string; }
export interface MarketPrice { id: string; crop: string; market: string; price: number; change: number; unit: string; }
export interface Notification { id: string; title: string; detail: string; time: string; unread: boolean; }
export interface Consultation { id: string; farmer: string; subject: string; date: string; status: string; }
