import { Workspace } from '../../src/components/workspace';

const routes = [
  '/login','/verify','/onboarding','/farmer','/farmer/crops','/farmer/market','/farmer/orders','/farmer/mandi','/farmer/profile','/farmer/add-crop','/farmer/experts','/farmer/schemes','/farmer/yield-calculator',
  '/buyer','/buyer/marketplace','/buyer/requests','/buyer/orders','/buyer/suppliers','/buyer/analytics','/buyer/profile',
  '/company','/company/products','/company/farmers','/company/campaigns','/company/orders','/company/analytics','/company/profile',
  '/expert','/expert/questions','/expert/consultations','/expert/knowledge','/expert/profile','/admin',
];
export function generateStaticParams() {
  return routes.map((route) => ({ segments: route.slice(1).split('/') }));
}
export const dynamicParams = false;
export default function RoutedPage() { return <Workspace />; }
