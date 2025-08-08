import {AgeGate} from '@/components/AgeGate';
import {NavBar} from '@/components/NavBar';
import {ThemeShowcase} from '@/components/ThemeShowcase';

export default function ThemeTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <AgeGate />
      <NavBar />
      <main className="py-8">
        <ThemeShowcase />
      </main>
    </div>
  );
}
