import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dva-portfolio-beige.vercel.app'),
  title: 'Aryan Patel - Data Analyst & Full-Stack Developer',
  description: 'Portfolio of Aryan Patel. Building data-driven systems, AI-powered dashboards, and turning complex datasets into actionable insights using Next.js, TypeScript, Python, and Tableau.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
