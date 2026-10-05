import type { Buyer, Company, Crop, Expert, MarketPrice, Order, Notification, Consultation, Farmer, User } from './types';

export const demoFarmer: Farmer = { id: 'f-104', name: 'Arjun Patel', location: 'Nashik, Maharashtra', acreage: 6.5, crops: ['Onion', 'Tomato', 'Grapes'] };
export const demoUsers: User[] = [
  { id: 'u-1', name: 'Arjun Patel', phone: '+91 •••••• 4321', role: 'farmer', location: 'Nashik, Maharashtra' },
  { id: 'u-2', name: 'FreshRoute Foods', phone: '+91 •••••• 1148', role: 'buyer', location: 'Pune, Maharashtra' },
  { id: 'u-3', name: 'Sahyadri Agri', phone: '+91 •••••• 2076', role: 'company', location: 'Nashik, Maharashtra' },
  { id: 'u-4', name: 'Dr. Meera Kulkarni', phone: '+91 •••••• 9830', role: 'expert', location: 'Pune, Maharashtra' },
];
export const demoBuyers: Buyer[] = [
  { id: 'b-1', name: 'FreshRoute Foods', organization: 'FreshRoute Foods', location: 'Pune, Maharashtra' },
];
export const demoCompanies: Company[] = [
  { id: 'co-1', name: 'Sahyadri Agri', organization: 'Sahyadri Agri', location: 'Nashik, Maharashtra' },
];
export const demoExperts: Expert[] = [
  { id: 'e-1', name: 'Dr. Meera Kulkarni', specialty: 'Horticulture', location: 'Pune, Maharashtra' },
  { id: 'e-2', name: 'Sanjay Deshmukh', specialty: 'Soil health', location: 'Nashik, Maharashtra' },
  { id: 'e-3', name: 'Dr. Ritu Nair', specialty: 'Crop protection', location: 'Mumbai, Maharashtra' },
];
export const crops: Crop[] = [
  { id: 'c1', name: 'Onion', variety: 'N-53 Red', area: 2.5, stage: 'Ready in 12 days', harvest: '18 Jun' },
  { id: 'c2', name: 'Tomato', variety: 'Abhinav Hybrid', area: 1.5, stage: 'Flowering', harvest: '02 Jul' },
  { id: 'c3', name: 'Grapes', variety: 'Thompson Seedless', area: 2.5, stage: 'Fruit development', harvest: '24 Jul' },
];
export const marketPrices: MarketPrice[] = [
  { id: 'm1', crop: 'Onion', market: 'Lasalgaon APMC', price: 1840, change: 3.8, unit: 'quintal' },
  { id: 'm2', crop: 'Tomato', market: 'Nashik APMC', price: 2260, change: -1.2, unit: 'quintal' },
  { id: 'm3', crop: 'Grapes', market: 'Pimpalgaon', price: 3850, change: 5.4, unit: 'quintal' },
  { id: 'm4', crop: 'Soybean', market: 'Lasalgaon APMC', price: 4620, change: 1.6, unit: 'quintal' },
];
export const orders: Order[] = [
  { id: 'KN-2481', crop: 'Red Onion', quantity: '18 quintals', buyer: 'FreshRoute Foods', status: 'Ready for pickup', amount: '₹33,120' },
  { id: 'KN-2473', crop: 'Grapes', quantity: '8 quintals', buyer: 'Sahyadri Exports', status: 'In transit', amount: '₹30,800' },
  { id: 'KN-2468', crop: 'Tomato', quantity: '12 quintals', buyer: 'GreenBasket Co.', status: 'Completed', amount: '₹27,120' },
];
export const notifications: Notification[] = [
  { id: 'n1', title: 'A buyer is interested in your onions', detail: 'FreshRoute Foods · 18 quintals', time: '12 min ago', unread: true },
  { id: 'n2', title: 'Mandi price is up 3.8%', detail: 'Lasalgaon APMC · Red onion', time: '1 hr ago', unread: true },
  { id: 'n3', title: 'Your consultation is confirmed', detail: 'Dr. Meera Kulkarni · Tomorrow, 10:30', time: 'Yesterday', unread: false },
];
export const consultations: Consultation[] = [
  { id: 'q1', farmer: 'Arjun Patel', subject: 'Leaf curl on tomato seedlings', date: 'Today, 10:30', status: 'Upcoming' },
  { id: 'q2', farmer: 'Sunita Jadhav', subject: 'Soil nutrition for grapes', date: 'Today, 13:00', status: 'Upcoming' },
  { id: 'q3', farmer: 'Ramesh Pawar', subject: 'Onion storage after harvest', date: 'Yesterday', status: 'Answered' },
];
export const experts = [
  { name: 'Dr. Meera Kulkarni', specialty: 'Horticulture · 12 yrs', initials: 'MK', next: 'Available today' },
  { name: 'Sanjay Deshmukh', specialty: 'Soil health · 9 yrs', initials: 'SD', next: 'Tomorrow, 9:00' },
  { name: 'Dr. Ritu Nair', specialty: 'Crop protection · 15 yrs', initials: 'RN', next: 'Available now' },
];
export const quickActions = [
  { label: 'Sell produce', href: '/farmer/market', kind: 'sell' },
  { label: 'Add crop', href: '/farmer/add-crop', kind: 'crop' },
  { label: 'Ask expert', href: '/farmer/experts', kind: 'expert' },
  { label: 'Mandi rates', href: '/farmer/mandi', kind: 'market' },
  { label: 'Govt. schemes', href: '/farmer/schemes', kind: 'scheme' },
  { label: 'Yield calculator', href: '/farmer/yield-calculator', kind: 'yield' },
];
