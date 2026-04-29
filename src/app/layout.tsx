import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Abhayanth K - Full-Stack Developer & Data Visualization Analyst',
  description: 'Portfolio of Abhayanth K. Building AI-powered dashboards, data-driven systems, and turning complex datasets into actionable insights using Next.js, TypeScript, Python, and Tableau.',
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
