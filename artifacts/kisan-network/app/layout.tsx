import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kisan Network — Smart Agriculture',
  description: 'One shared workspace for India’s agriculture community.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
