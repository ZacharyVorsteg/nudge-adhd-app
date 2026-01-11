import type { Metadata, Viewport } from 'next';
import { TaskProvider } from '@/components/providers/TaskProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { PWAProvider } from '@/components/PWAProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nudge - ADHD-Friendly Productivity',
  description: 'You\'re not broken. Your apps are. A shame-free productivity app designed for ADHD brains.',
  keywords: ['ADHD', 'productivity', 'tasks', 'focus', 'brain dump', 'timer'],
  authors: [{ name: 'Nudge' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Nudge',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdfcfb' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
      </head>
      <body className="antialiased">
        <TaskProvider>
          <ToastProvider>
            <PWAProvider>{children}</PWAProvider>
          </ToastProvider>
        </TaskProvider>
      </body>
    </html>
  );
}
