import type { Metadata, Viewport } from 'next';
import { TaskProvider } from '@/components/providers/TaskProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { PWAProvider } from '@/components/PWAProvider';
import { CookieConsent } from '@/components/CookieConsent';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nudge-adhd.com'),
  title: {
    default: 'Nudge - ADHD-Friendly Productivity',
    template: '%s | Nudge',
  },
  description: "You're not broken. Your apps are. A shame-free productivity app designed for ADHD brains.",
  keywords: ['ADHD', 'productivity', 'tasks', 'focus', 'brain dump', 'timer', 'ADHD app', 'task management'],
  authors: [{ name: 'Nudge' }],
  creator: 'Nudge',
  publisher: 'Nudge',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Nudge',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nudge-adhd.com',
    siteName: 'Nudge',
    title: 'Nudge - ADHD-Friendly Productivity',
    description: "You're not broken. Your apps are. A shame-free productivity app designed for ADHD brains.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nudge - ADHD-Friendly Productivity App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nudge - ADHD-Friendly Productivity',
    description: "You're not broken. Your apps are. A shame-free productivity app designed for ADHD brains.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nudge',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web, iOS, Android',
    description: "A shame-free productivity app designed for ADHD brains.",
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '500',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <TaskProvider>
          <ToastProvider>
            <PWAProvider>
              {children}
              <CookieConsent />
            </PWAProvider>
          </ToastProvider>
        </TaskProvider>
      </body>
    </html>
  );
}
