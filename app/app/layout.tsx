import { Navigation } from '@/components/app/Navigation';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-warm-50 dark:bg-gray-900 pb-24">
      <main className="max-w-2xl mx-auto px-4 py-8">
        {children}
      </main>
      <Navigation />
    </div>
  );
}
