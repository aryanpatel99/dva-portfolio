import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Abhayanth K - AI & Full-Stack Engineer',
  description: 'Portfolio of Abhayanth K. Building AI-native systems, multi-agent pipelines, and full-stack platforms.',
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
